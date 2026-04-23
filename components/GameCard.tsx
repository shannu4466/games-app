import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import TimerIcon from '@mui/icons-material/Timer'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Modal,
    Paper,
    Stack,
    TextField,
    Typography,
    useTheme,
    Zoom
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import { useHomePageStore } from '@/app/store'
import { useAuth } from '@/context/AuthContext'

type Question = {
    q: string
    answer: number
}

const GameCard = () => {
    const theme = useTheme()

    const gameStarted = useHomePageStore((state) => state.gameStarted)
    const setGameStarted = useHomePageStore((state) => state.setGameStarted)

    const [gameState, setGameState] = useState<'IDLE' | 'COUNTDOWN' | 'PLAYING' | 'FINISHED'>('IDLE')
    const [countdown, setCountdown] = useState(3)
    const [timeLeft, setTimeLeft] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [questions, setQuestions] = useState<Question[]>([])
    const [userAnswer, setUserAnswer] = useState('')
    const [error, setError] = useState<string>("");
    const [score, setScore] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    const [wrongCount, setWrongCount] = useState(0)
    const [mode, setMode] = useState('')
    const [confirmCloseOpen, setConfirmCloseOpen] = useState(false)

    const gameName = useHomePageStore((state) => state.gameName)

    const { user } = useAuth()
    const userEmail = user?.email || 'undefinedUser@gmail.com'

    const saveResultToStorage = useCallback(
        (finalScore: number, finalCorrect: number, finalWrong: number) => {
            const gameResult = {
                userEmail,
                gameName,
                score: finalScore,
                rightQuestions: finalCorrect,
                wrongQuestions: finalWrong,
                mode,
                Date: new Date().toLocaleString()
            }

            try {
                const existingScores = JSON.parse(localStorage.getItem('userScores') || '[]')
                localStorage.setItem('userScores', JSON.stringify([...existingScores, gameResult]))
            } catch (error) {
                console.error('Failed to save game result:', error)
                // Optionally show user notification that results couldn't be saved
            }
        },
        [userEmail, gameName, mode]
    )

    const finishGame = useCallback(
        (finalScore = score, finalCorrect = correctCount, finalWrong = wrongCount) => {
            setGameState(prev => {
                if (prev === 'FINISHED') return prev
                return 'FINISHED'
            })

            saveResultToStorage(finalScore, finalCorrect, finalWrong)
        },
        [score, correctCount, wrongCount, saveResultToStorage]
    )

    const initGame = useCallback(() => {
        const storedMode = sessionStorage.getItem('userMode') || 'easy'
        const storedTime = sessionStorage.getItem('timeInSeconds')

        setMode(storedMode.toUpperCase())
        setTimeLeft(storedTime ? Number(storedTime) : 180)

        const newQuestions: Question[] = Array.from({ length: 10 }, () => {
            const a = Math.floor(Math.random() * 12) + 1
            const b = Math.floor(Math.random() * 12) + 1

            if (storedMode === 'easy') {
                if (Math.random() > 0.5) {
                    return { q: `${a} + ${b}`, answer: a + b }
                }

                const max = Math.max(a, b)
                const min = Math.min(a, b)

                return { q: `${max} - ${min}`, answer: max - min }
            }

            if (storedMode === 'medium') {
                const op = Math.floor(Math.random() * 4)

                if (op === 0) return { q: `${a + 10} + ${b + 10}`, answer: a + 10 + b + 10 }
                if (op === 1) return { q: `${a + 20} - ${b}`, answer: a + 20 - b }

                if (op === 2) {
                    const multiplier = Math.floor(Math.random() * 5) + 2
                    return { q: `${a} * ${multiplier}`, answer: a * multiplier }
                }

                const divisor = Math.floor(Math.random() * 5) + 2
                const dividend = divisor * (Math.floor(Math.random() * 10) + 1)

                return { q: `${dividend} / ${divisor}`, answer: dividend / divisor }
            }

            const hardOp = Math.floor(Math.random() * 6)
            const val = Math.floor(Math.random() * 15) + 2

            if (hardOp < 2) {
                const extra = Math.floor(Math.random() * 10) + 1
                return { q: `(${a} * ${b}) + ${extra}`, answer: a * b + extra }
            }

            if (hardOp === 2 || hardOp === 3) {
                return { q: `${val}²`, answer: Math.pow(val, 2) }
            }

            const cubeVal = Math.floor(Math.random() * 10) + 2
            return { q: `${cubeVal}³`, answer: Math.pow(cubeVal, 3) }
        })

        setQuestions(newQuestions)
        setCurrentQuestionIndex(0)
        setScore(0)
        setCorrectCount(0)
        setWrongCount(0)
        setUserAnswer('')
        setCountdown(3)
        setGameState('COUNTDOWN')
    }, [])

    useEffect(() => {
        if (gameState !== 'COUNTDOWN') return

        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1)
            }, 1000)

            return () => clearTimeout(timer)
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGameState('PLAYING')
    }, [gameState, countdown])

    useEffect(() => {
        if (gameState !== 'PLAYING') return

        if (timeLeft <= 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            finishGame()
            return
        }

        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [gameState, timeLeft, finishGame])

    const handleAnswerSubmit = () => {
        if (userAnswer.trim() === '') {
            setError("*Value Required")
            return
        }

        const currentQ = questions[currentQuestionIndex]
        if (!currentQ) return

        const isCorrect = Number(userAnswer) === currentQ.answer
        const penalty = mode === 'EASY' ? 5 : mode === 'MEDIUM' ? 3 : 2

        const nextScore = isCorrect ? score + 10 : score - penalty
        const nextCorrect = isCorrect ? correctCount + 1 : correctCount
        const nextWrong = isCorrect ? wrongCount : wrongCount + 1

        setScore(nextScore)
        setCorrectCount(nextCorrect)
        setWrongCount(nextWrong)
        setUserAnswer('')

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
            return
        }

        finishGame(nextScore, nextCorrect, nextWrong)
    }

    const resetAndClose = () => {
        setGameState('IDLE')
        setGameStarted(false)
        setConfirmCloseOpen(false)
        sessionStorage.removeItem('userMode')
        sessionStorage.removeItem('timeInSeconds')
    }

    const handleCloseClick = () => {
        if (gameState === 'PLAYING' || gameState === 'COUNTDOWN') {
            setConfirmCloseOpen(true)
            return
        }

        resetAndClose()
    }

    return (
        <>
            <Modal open={gameStarted} sx={{ m: 0, p: 0 }}>
                <Box
                    sx={{
                        width: '100vw',
                        height: '100vh',
                        bgcolor: 'background.default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        color: 'text.primary'
                    }}
                >
                    <IconButton
                        onClick={handleCloseClick}
                        sx={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            color: 'text.primary'
                        }}
                    >
                        <CloseIcon fontSize='large' />
                    </IconButton>

                    {gameState === 'IDLE' && (
                        <Button
                            variant='contained'
                            color='secondary'
                            size='large'
                            onClick={initGame}
                            sx={{ px: 6, py: 2, fontSize: '1.5rem' }}
                        >
                            Start Game
                        </Button>
                    )}

                    {gameState === 'COUNTDOWN' && (
                        <Zoom in key={countdown}>
                            <Typography
                                variant='h1'
                                sx={{
                                    fontSize: { xs: '8rem', md: '15rem' },
                                    fontWeight: 'bold'
                                }}
                            >
                                {countdown === 0 ? 'GO!' : countdown}
                            </Typography>
                        </Zoom>
                    )}

                    {gameState === 'PLAYING' && (
                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                maxWidth: 800,
                                p: { xs: 2, md: 6 },
                                textAlign: 'center',
                                background: 'transparent',
                                color: 'text.primary'
                            }}
                        >
                            <Stack
                                direction='row'
                                sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 6
                                }}
                            >
                                <Typography variant='h5'>
                                    Question {currentQuestionIndex + 1}/{questions.length}
                                </Typography>

                                <Typography variant='h5'>
                                    Mode: {mode}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color:
                                            timeLeft < 15
                                                ? theme.palette.error.main
                                                : theme.palette.secondary.main
                                    }}
                                >
                                    <TimerIcon sx={{ mr: 1, fontSize: 32 }} />

                                    <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                                        {Math.floor(timeLeft / 60)}:
                                        {String(timeLeft % 60).padStart(2, '0')}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Typography
                                variant='h1'
                                sx={{
                                    mb: 6,
                                    fontWeight: 'bold',
                                    fontSize: { xs: '4rem', md: '6rem' }
                                }}
                            >
                                {questions[currentQuestionIndex]?.q}
                            </Typography>
                            {error && (
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#d32f2f",
                                            fontSize: "0.95rem",
                                            fontWeight: 600,
                                            letterSpacing: 0.2
                                        }}
                                    >
                                        {error}
                                    </Typography>
                                </Box>
                            )}

                            <TextField
                                fullWidth
                                variant='standard'
                                type="number"
                                value={userAnswer}
                                autoFocus
                                onChange={e => {
                                    setUserAnswer(e.target.value)
                                    if (e.target.value.trim() !== "") {
                                        setError("");
                                    }
                                }}
                                onKeyDown={e => e.key === 'Enter' && handleAnswerSubmit()}
                                slotProps={{
                                    input: {
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '3rem',
                                            color: theme.palette.text.primary
                                        }
                                    }
                                }}
                                sx={{
                                    mb: 4,
                                    '& .MuiInput-underline:before': {
                                        borderBottomColor: theme.palette.divider
                                    },
                                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                        WebkitAppearance: 'none',
                                        margin: 0
                                    },
                                }}
                            />
                            <Button
                                fullWidth
                                variant='contained'
                                color='secondary'
                                size='large'
                                onClick={handleAnswerSubmit}
                                sx={{ height: 60, fontSize: '1.2rem' }}
                            >
                                Submit Answer
                            </Button>
                        </Paper>
                    )}

                    {gameState === 'FINISHED' && (
                        <Box
                            sx={{
                                textAlign: 'center',
                                width: '100%',
                                maxWidth: 400,
                                p: 3
                            }}
                        >
                            <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 2 }}>
                                Results
                            </Typography>

                            <Paper
                                sx={{
                                    p: 4,
                                    bgcolor: theme.palette.action.hover,
                                    borderRadius: 4,
                                    color: 'text.primary',
                                    mb: 4
                                }}
                            >
                                <Stack spacing={2}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                                            <CheckCircleIcon color='success' />
                                            <Typography variant='h6'>Correct</Typography>
                                        </Stack>

                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'success.main'
                                            }}
                                        >
                                            {correctCount}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                                            <CancelIcon color='error' />
                                            <Typography variant='h6'>Wrong</Typography>
                                        </Stack>

                                        <Typography
                                            variant='h6'
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'error.main'
                                            }}
                                        >
                                            {wrongCount}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ bgcolor: theme.palette.divider }} />

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            pt: 1
                                        }}
                                    >
                                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                            Final Score
                                        </Typography>

                                        <Typography
                                            variant='h4'
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'secondary.main'
                                            }}
                                        >
                                            {score}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Button
                                variant='contained'
                                color='secondary'
                                size='large'
                                fullWidth
                                onClick={resetAndClose}
                                sx={{ py: 1.5, fontSize: '1.1rem' }}
                            >
                                Back to Menu
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>

            <Dialog open={confirmCloseOpen} onClose={() => setConfirmCloseOpen(false)}>
                <DialogTitle>Quit Game?</DialogTitle>

                <DialogContent>
                    <Typography>
                        Are you sure you want to close this game? Your progress will be lost.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setConfirmCloseOpen(false)} color='primary'>
                        Cancel
                    </Button>

                    <Button onClick={resetAndClose} color='error' variant='contained'>
                        Quit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default GameCard