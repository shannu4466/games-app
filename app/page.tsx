"use client";

import GameCard from "@/components/GameCard";
import InstructionsCard from "@/components/InstructionsCard";
import MediumCard from "@/components/MediumCard";
import Navbar from "@/components/Navbar";
import HistoryIcon from "@mui/icons-material/History";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

import { useHomePageStore } from "./store";

import { games } from '../data/games';

type GameResult = {
  userEmail: string;
  gameName: string;
  score: number;
  rightQuestions: number;
  wrongQuestions: number;
  bonusScore: number;
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

  const setId = useHomePageStore((state) => state.setId);
  const setOpen = useHomePageStore((state) => state.setOpen);
  const setHistory = useHomePageStore((state) => state.setHistory);
  const setSearchGame = useHomePageStore((state) => state.setSearchGame);
  const searchGame = useHomePageStore((state) => state.searchGame);
  const setGameName = useHomePageStore((state) => state.setGameName);

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
              sx={{ display: "inline-flex", flexDirection: "row", m: 2 }}
            >
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card
                  sx={{
                    width: 280,
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 250,
                        height: 160,
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "10px",
                      }}
                    >
                      <Image
                        src={eachGame.imageUrl}
                        alt="game-image"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ mb: 1, fontWeight: "bold", fontSize: "20px" }}>
                      {eachGame.name}
                    </Typography>
                    <Box sx={{ textAlign: "end" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setId(eachGame.id)
                          setOpen(true)
                          setGameName(eachGame.name)
                        }}
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
              My History tab
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
                          {item.gameName || "Game name not found"}
                        </Typography>
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
                          <Typography
                            variant="body2"
                            sx={{ color: "warning.main", fontWeight: "bold" }}
                          >
                            Bonus: {item.bonusScore || "No bonus"}
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
                <Image src="https://github.githubassets.com/assets/inbox-zero-dark-377cc25a227f.svg" alt="empty" width={300} height={300} />
                <Typography color="text.secondary" sx={{ mt: 4 }}>
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
                        {item.gameName || "Game name not found"}
                      </Typography>
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
                        <Typography
                          variant="body2"
                          sx={{ color: "warning.main", fontWeight: "bold" }}
                        >
                          Bonus: {item.bonusScore || "No bonus"}
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
    </Box >
  );
}
