import CloseIcon from '@mui/icons-material/Close';
import {
    Modal,
    Box,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

import { useHomePageStore } from '@/app/store';

import { games } from '@/data/games';

const InstructionsCard = () => {
    const id = useHomePageStore((state) => state.id)
    const setId = useHomePageStore((state) => state.setId)
    const open = useHomePageStore((state) => state.open)
    const setOpen = useHomePageStore((state) => state.setOpen)
    const setMedium = useHomePageStore((state) => state.setMedium)

    const selectedGame = games.find((game) => game.id === id)

    if (!selectedGame) return null

    return (
        <Modal open={open}>
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
                                gap: 1,
                                flexWrap: "wrap",
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
                                🎮 {selectedGame?.name} – How to Play
                            </Typography>

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setOpen(false)}
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
                            sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                        >
                            {selectedGame?.description}
                        </Typography>

                        <Typography variant="subtitle2">🧭 Game Modes</Typography>

                        <Typography
                            variant="body2"
                            sx={{ mb: 1, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                        >
                            <strong>Easy:</strong> {selectedGame?.instructions?.gameModes?.Easy}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ mb: 1, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                        >
                            <strong>Medium:</strong> {selectedGame?.instructions?.gameModes?.Medium}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                        >
                            <strong>Hard:</strong> {selectedGame?.instructions?.gameModes?.Hard}
                        </Typography>

                        <Typography variant="subtitle2">🚀 How to Play</Typography>

                        <Typography
                            variant="body2"
                            sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                        >
                            {selectedGame?.instructions?.howToPlay}
                        </Typography>

                        <Typography variant="subtitle2">🏆 Scoring</Typography>

                        <Typography
                            variant="body2"
                            sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                        >
                            {selectedGame?.instructions?.scoringDetails}
                        </Typography>

                        <Typography variant="subtitle2">💡 Tips</Typography>

                        <Typography
                            variant="body2"
                            sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                        >
                            {selectedGame?.instructions?.tips}
                        </Typography>
                    </CardContent>

                    <Box sx={{ textAlign: "end", px: 2, pb: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setId(selectedGame?.id)
                                setOpen(false)
                                setMedium(true)
                            }}
                            sx={{
                                width: { xs: "100%", sm: "auto" }
                            }}
                        >
                            I understood
                        </Button>
                    </Box>
                </Card>
            </Box>
        </Modal>
    )
};

export default InstructionsCard;