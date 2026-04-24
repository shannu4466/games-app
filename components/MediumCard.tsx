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
                    width: {
                        xs: "95%",
                        sm: "90%",
                        md: "75%",
                        lg: "60%"
                    },
                    maxWidth: 800,
                    maxHeight: "95vh",
                    overflowY: "auto",
                    borderRadius: 3,
                    outline: "none"
                }}
            >
                <Card sx={{ p: { xs: 1, sm: 2 } }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 2
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: {
                                        xs: "1rem",
                                        sm: "1.2rem",
                                        md: "1.4rem"
                                    },
                                    flex: 1
                                }}
                            >
                                Select medium
                            </Typography>

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setMedium(false)
                                    setOpen(false)
                                }}
                                sx={{
                                    minWidth: "auto",
                                    px: 1.5
                                }}
                            >
                                <CloseIcon />
                            </Button>
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                mb: 2,
                                fontSize: { xs: "0.85rem", sm: "0.95rem" }
                            }}
                        >
                            {selectedGame?.mediumInstructions?.intro}
                        </Typography>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <FormLabel>Select Mode</FormLabel>

                            <RadioGroup
                                defaultValue="easy"
                                name="radio-buttons-group"
                                onChange={(e) => setMode(e.target.value)}
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row"
                                    },
                                    gap: 1
                                }}
                            >
                                <FormControlLabel
                                    value="easy"
                                    control={<Radio />}
                                    label="Easy"
                                />

                                <FormControlLabel
                                    value="medium"
                                    control={<Radio />}
                                    label="Medium"
                                />

                                <FormControlLabel
                                    value="hard"
                                    control={<Radio />}
                                    label="Hard"
                                />
                            </RadioGroup>
                        </FormControl>

                        <Typography component="div" sx={{ mb: 2 }}>
                            {mode === "easy" && (
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: "1rem",
                                                sm: "1.2rem"
                                            },
                                            fontWeight: "bold",
                                            mb: 1
                                        }}
                                    >
                                        EASY
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: "0.85rem",
                                                sm: "0.95rem"
                                            }
                                        }}
                                    >
                                        {selectedGame?.mediumInstructions?.easy}
                                    </Typography>
                                </Box>
                            )}

                            {mode === "medium" && (
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: "1rem",
                                                sm: "1.2rem"
                                            },
                                            fontWeight: "bold",
                                            mb: 1
                                        }}
                                    >
                                        MEDIUM
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: "0.85rem",
                                                sm: "0.95rem"
                                            }
                                        }}
                                    >
                                        {selectedGame?.mediumInstructions?.medium}
                                    </Typography>
                                </Box>
                            )}

                            {mode === "hard" && (
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: "1rem",
                                                sm: "1.2rem"
                                            },
                                            fontWeight: "bold",
                                            mb: 1
                                        }}
                                    >
                                        HARD
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: {
                                                xs: "0.85rem",
                                                sm: "0.95rem"
                                            }
                                        }}
                                    >
                                        {selectedGame?.mediumInstructions?.hard}
                                    </Typography>
                                </Box>
                            )}
                        </Typography>
                    </CardContent>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                sm: "row"
                            },
                            gap: 2,
                            justifyContent: "space-between",
                            px: 2,
                            pb: 2
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setMedium(false)
                                setOpen(true)
                            }}
                        >
                            Previous
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
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