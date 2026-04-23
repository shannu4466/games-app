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
                                🎮 {selectedGame?.name} – How to Play
                            </Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
                                    <CloseIcon />
                                </Button>
                            </Box>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {selectedGame?.description}
                        </Typography>

                        <Typography variant="subtitle2">🧭 Game Modes</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Easy:</strong> {selectedGame?.instructions?.gameModes?.Easy}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Medium:</strong> {selectedGame?.instructions?.gameModes?.Medium}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                            <strong>Hard:</strong> {selectedGame?.instructions?.gameModes?.Hard}
                        </Typography>

                        <Typography variant="subtitle2">🚀 How to Play</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {selectedGame?.instructions?.howToPlay}
                        </Typography>

                        <Typography variant="subtitle2">🏆 Scoring</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {selectedGame?.instructions?.scoringDetails}
                        </Typography>

                        <Typography variant="subtitle2">💡 Tips</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {selectedGame?.instructions?.tips}
                        </Typography>
                    </CardContent>
                    <Box sx={{ textAlign: "end" }}>
                        <Button variant="contained" color="secondary"
                            onClick={() => {
                                setId(selectedGame?.id)
                                setOpen(false)
                                setMedium(true)
                            }}>I understood</Button>
                    </Box>
                </Card>
            </Box>
        </Modal>
    );
};

export default InstructionsCard;