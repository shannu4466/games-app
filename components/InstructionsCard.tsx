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

const InstructionsCard = () => {
    const open = useHomePageStore((state) => state.open)
    const setOpen = useHomePageStore((state) => state.setOpen)
    const setMedium = useHomePageStore((state) => state.setMedium)

    return (
        <Modal open={open}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    minWidth: 300,
                    width:"auto",
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
                                🎮 Math Blaster – How to Play
                            </Typography>
                            <Box sx={{ textAlign: "center" }}>
                                <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
                                    <CloseIcon />
                                </Button>
                            </Box>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Get ready to solve fun math problems and test your skills!
                        </Typography>

                        <Typography variant="subtitle2">🧭 Game Modes</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Easy:</strong> Simple addition & subtraction, more time.
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Medium:</strong> Includes multiplication & division, moderate time.
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                            <strong>Hard:</strong> Mixed operations, tricky questions, less time.
                        </Typography>

                        <Typography variant="subtitle2">🚀 How to Play</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Choose a mode, solve the math question before time runs out, and earn points for correct answers.
                        </Typography>

                        <Typography variant="subtitle2">🏆 Scoring</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Easy has lesser time with more negative points, Medium gives slightly more time, and Hard has highest time among all. Faster answers may earn bonus points.
                            (For more information, check the next page)
                        </Typography>

                        <Typography variant="subtitle2">💡 Tips</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Start with Easy mode, focus on accuracy, and challenge yourself with harder modes.
                        </Typography>
                    </CardContent>
                    <Box sx={{ textAlign: "end" }}>
                        <Button variant="contained" color="secondary"
                            onClick={() => {
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