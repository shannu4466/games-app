"use client"

import Navbar from "@/components/Navbar"
import { Box, Grid, Paper, Stack, Typography } from "@mui/material"
import { useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

type ScoreItem = {
    userEmail: string
    score: number
    rightQuestions: number
    wrongQuestions: number
    mode: string
    Date: string
}

type User = {
    userEmail: string
}

const colors = ["#1976d2", "#2e7d32", "#ed6c02", "#d32f2f"]

function Card({ title, value }: { title: string, value: string | number }) {
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {value}
            </Typography>
        </Paper>
    )
}

export default function Dashboard() {
    const { user } = useAuth()

    const [data] = useState<ScoreItem[]>(() => {
        if (typeof window !== "undefined") {
            const savedScores = localStorage.getItem("userScores")
            const parsedScores: ScoreItem[] = savedScores ? JSON.parse(savedScores) : []
            const currentUser = parsedScores.filter((each: ScoreItem) => (
                each.userEmail === user?.email
            ))
            if (currentUser.length > 0) {
                return currentUser
            }
        }
        return []
    })

    const chartData = data.map((item, index) => ({
        ...item,
        name: `Game ${index + 1}`,
        accuracy:
            (item.rightQuestions /
                (item.rightQuestions + item.wrongQuestions)) *
            100
    }))

    const totalGames = data.length
    const avgScore = totalGames > 0 ?
        (
            data.reduce((sum, item) => sum + item.score, 0) /
            totalGames
        ).toFixed(1)
        : 0

    const bestScore = totalGames > 0 ? Math.max(...data.map(item => item.score)) : 0

    const avgAccuracy = totalGames > 0
        ? (
            data.reduce(
                (sum, item) =>
                    sum +
                    (item.rightQuestions /
                        (item.rightQuestions + item.wrongQuestions)) *
                    100,
                0
            ) / totalGames
        ).toFixed(1)
        : 0

    const modeCount = Object.entries(
        data.reduce((acc: Record<string, number>, item) => {
            acc[item.mode] = (acc[item.mode] || 0) + 1
            return acc
        }, {})
    ).map(([name, value]) => ({
        name,
        value
    }))

    const performanceByMode = Object.entries(
        data.reduce((acc: Record<string, { total: number; count: number }>, item) => {
            if (!acc[item.mode]) {
                acc[item.mode] = {
                    total: 0,
                    count: 0
                }
            }
            acc[item.mode].total += item.score
            acc[item.mode].count += 1
            return acc
        }, {})
    ).map(([mode, val]) => ({
        mode,
        score: Number((val.total / val.count).toFixed(1))
    }))

    return (
        <Box>
            <Navbar />
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                    Performance Dashboard
                </Typography>
                {totalGames === 0 && (
                    <Typography sx={{ mb: 2, mt: -2, color: "red", display: "block" }}>
                        You haven&apos;t played any games till now. Start play now...
                        <Link href="/">
                            <Typography component="span" sx={{ color: "blue" }}>Click here</Typography>
                        </Link>
                    </Typography>
                )}

                <Grid container spacing={3} sx={{ mb: 2 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card title="Total Games" value={totalGames} />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card title="Average Score" value={avgScore} />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card title="Best Score" value={bestScore} />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card title="Accuracy %" value={avgAccuracy} />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>
                                Score Progress
                            </Typography>

                            <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#1976d2"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>
                                Game Modes
                            </Typography>

                            <ResponsiveContainer width="100%" height={320}>
                                <PieChart>
                                    <Pie
                                        data={modeCount}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={110}
                                        label
                                    >
                                        {modeCount.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={colors[index % colors.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>
                                Right vs Wrong Answers
                            </Typography>

                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="rightQuestions"
                                        fill="#2e7d32"
                                    />
                                    <Bar
                                        dataKey="wrongQuestions"
                                        fill="#d32f2f"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>
                                Average Score By Mode
                            </Typography>

                            <ResponsiveContainer width="100%" height={320}>
                                <RadarChart data={performanceByMode}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="mode" />
                                    <PolarRadiusAxis />
                                    <Radar
                                        dataKey="score"
                                        stroke="#1976d2"
                                        fill="#1976d2"
                                        fillOpacity={0.6}
                                    />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
                    <Typography sx={{ fontWeight: 700, mb: 2 }}>
                        Insights
                    </Typography>

                    <Stack spacing={1}>
                        <Typography>
                            • Your best score is {bestScore}
                        </Typography>

                        <Typography>
                            • Average score across games is {avgScore}
                        </Typography>

                        <Typography>
                            • Accuracy rate is {avgAccuracy}%
                        </Typography>

                        <Typography>
                            • You perform best in{" "}
                            {performanceByMode.sort(
                                (a, b) => b.score - a.score
                            )[0]?.mode || "-"}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    )
}