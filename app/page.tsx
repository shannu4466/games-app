"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  Stack,
  Divider,
  Chip,
  TextField,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import calcgame from "../public/calcgame.jpg";
import InstructionsCard from "@/components/InstructionsCard";
import MediumCard from "@/components/MediumCard";
import GameCard from "@/components/GameCard";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import { useHomePageStore } from "./store";

// List of games
const games = [
  {
    id: 1,
    imageUrl: calcgame,
    name: "Math Blaster",
    description:
      "solve math probelms and be expert in speed calculation. It contains different modes from easy to hard.",
  },
];

type GameResult = {
  userEmail: string;
  score: number;
  rightQuestions: number;
  wrongQuestions: number;
  mode: string;
  Date: string;
};

export default function Home() {
  // const [open, setOpen] = useState<boolean>(false)
  // const [medium, setMedium] = useState<boolean>(false)
  // const [gameStarted, setGameStarted] = useState<boolean>(false)
  // const [history, setHistory] = useState<GameResult[]>([])

  const gameStarted = useHomePageStore((state) => state.gameStarted);
  const history = useHomePageStore((state) => state.history);

  const setOpen = useHomePageStore((state) => state.setOpen);
  const setHistory = useHomePageStore((state) => state.setHistory);
  const setSearchGame = useHomePageStore((state) => state.setSearchGame);
  const searchGame = useHomePageStore((state) => state.searchGame);

  const { user } = useAuth();
  const currentUserEmail = user?.email || "undefinedUser@gmail.com";

  useEffect(() => {
    const fetchHistory = () => {
      const storedScores = JSON.parse(
        localStorage.getItem("userScores") || "[]",
      );
      const userHistory = storedScores.filter(
        (item: GameResult) => item.userEmail === currentUserEmail,
      );
      setHistory(userHistory.reverse());
    };

    fetchHistory();
    if (!gameStarted) {
      fetchHistory();
    }
  }, [gameStarted, currentUserEmail, setHistory]);

  const filteredGames = games.filter((each) => {
    return each.name.toLowerCase().includes(searchGame.toLowerCase());
  });

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Navbar />
      <Box
        sx={{
          p: { xs: 2, md: 5 },
          pr: { md: "420px" },
          transition: "padding 0.3s",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <TextField
            id="outlined-search"
            label="Search game"
            type="search"
            sx={{ width: "500px" }}
            onChange={(e) => setSearchGame(e.target.value)}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "22px", md: "30px" },
            fontWeight: "bold",
            mb: 3,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Available Games
        </Typography>

        {filteredGames.length > 0 ? (
          filteredGames.map((eachGame) => (
            <Grid
              container
              spacing={3}
              key={eachGame.id}
              sx={{ display: "flex", m: 2 }}
            >
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <Image
                      src={eachGame.imageUrl}
                      alt="game-image"
                      width={250}
                      height={300}
                      style={{ borderRadius: "10px", objectFit: "cover" }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                      {eachGame.name}
                    </Typography>
                    <Box sx={{ textAlign: "end" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpen(true)}
                      >
                        Play Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 5, color: "text.secondary" }}
          >
            No games found.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          right: 20,
          top: 100,
          bottom: 20,
          width: "380px",
          zIndex: 10,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              spacing: 1,
              alignItems: "center",
            }}
          >
            <HistoryIcon color="secondary" />
            <Typography variant="h5" sx={{ fontWeight: "bold", ml: 2 }}>
              My History
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
            {history.length > 0 ? (
              <Stack spacing={2}>
                {history.map((item, index) => (
                  <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Stack
                        sx={{
                          mb: 1,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "start",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {item.Date}
                        </Typography>
                        <Chip
                          label={item.mode}
                          size="small"
                          color={
                            item.mode === "HARD"
                              ? "error"
                              : item.mode === "MEDIUM"
                                ? "warning"
                                : "success"
                          }
                          variant="outlined"
                        />
                      </Stack>
                      <Stack
                        sx={{
                          mb: 1,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "start",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: "success.main", fontWeight: "bold" }}
                          >
                            Correct: {item.rightQuestions}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "error.main", fontWeight: "bold" }}
                          >
                            Wrong: {item.wrongQuestions}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            color: "black",
                            backgroundColor: "secondary.main",
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          {item.score}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Box sx={{ textAlign: "center", mt: 10 }}>
                <Typography color="text.secondary">
                  No games played yet.
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" }, p: 2 }}>
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          My History
        </Typography>

        <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {history.length > 0 ? (
            <Stack spacing={2}>
              {history.map((item, index) => (
                <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Stack
                      sx={{
                        mb: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "start",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {item.Date}
                      </Typography>
                      <Chip
                        label={item.mode}
                        size="small"
                        color={
                          item.mode === "HARD"
                            ? "error"
                            : item.mode === "MEDIUM"
                              ? "warning"
                              : "success"
                        }
                        variant="outlined"
                      />
                    </Stack>
                    <Stack
                      sx={{
                        mb: 1,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "start",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: "success.main", fontWeight: "bold" }}
                        >
                          Correct: {item.rightQuestions}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "error.main", fontWeight: "bold" }}
                        >
                          Wrong: {item.wrongQuestions}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                          backgroundColor: "secondary.main",
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        {item.score}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <Typography color="text.secondary">
                No games played yet.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <InstructionsCard />
      <MediumCard />
      <GameCard />
    </Box>
  );
}
