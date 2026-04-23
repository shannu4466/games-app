"use client"

import { Modal, Box, Card, Typography, CardContent, Button, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import { useState } from "react";

const time: Record<string, number> = {
    easy: 1,
    medium: 2,
    hard: 3
}

import { useHomePageStore } from '@/app/store';

import { games } from "@/data/games";

const MediumCard = () => {
    const id = useHomePageStore((state) => state.id)
    const [mode, setMode] = useState<string>("easy")

    const medium = useHomePageStore((state) => state.medium)
    const setMedium = useHomePageStore((state) => state.setMedium)
    const setOpen = useHomePageStore((state) => state.setOpen)
    const setGameStarted = useHomePageStore((state) => state.setGameStarted)

    const selectedGame = games.find((game) => game.id === id)

    const handleGameStart = () => {
        setMode("easy")
        setGameStarted(true)
        setMedium(false)
        sessionStorage.setItem("userMode", mode)
        const selectedTime = time[mode]
        sessionStorage.setItem("timeInSeconds", (selectedTime * 60).toString())
    }

    return (
        <Modal open={medium}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    minWidth: 300,
                    width: "auto",
                    maxWidth: 800,
                    maxHeight: "100vh",
                    overflowY: "auto",
                    borderRadius: "20px",
                }}
            >
                <Card sx={{ p: 2 }}>
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Select medium
                            </Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Button variant="contained" color="secondary" onClick={() => { setMedium(false); setOpen(false) }}>
                                    <CloseIcon />
                                </Button>
                            </Box>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {selectedGame?.mediumInstructions?.intro}
                        </Typography>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Select Mode</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="easy"
                                name="radio-buttons-group"
                                onChange={(e) => setMode(e.target.value)}
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        md: "row",
                                    },
                                    justifyContent: "space-between",
                                }}
                            >
                                <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                            </RadioGroup>
                        </FormControl>

                        <Typography component="div" sx={{ mb: 2 }}>
                            {mode === "easy" && (
                                <Box>
                                    <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 1 }} variant="h1">EASY</Typography>
                                    <Typography>{selectedGame?.mediumInstructions?.easy}</Typography>
                                </Box>
                            )}
                            {mode === "medium" && (
                                <Box>
                                    <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 1 }} variant="h1">MEDIUM</Typography>
                                    <Typography>{selectedGame?.mediumInstructions?.medium}</Typography>
                                </Box>
                            )}
                            {mode === "hard" && (
                                <Box>
                                    <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 1 }} variant="h1">HARD</Typography>
                                    <Typography>{selectedGame?.mediumInstructions?.hard}</Typography>
                                </Box>
                            )}
                        </Typography>

                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Button variant="contained"
                            color="secondary"
                            onClick={() => {
                                setMedium(false)
                                setOpen(true)
                            }}
                        >
                            Previous
                        </Button>
                        <Button variant="contained"
                            color="secondary"
                            onClick={handleGameStart}
                        >
                            Ready to play
                        </Button>
                    </Box>
                </Card>
            </Box>
        </Modal>
    )
}

export default MediumCard