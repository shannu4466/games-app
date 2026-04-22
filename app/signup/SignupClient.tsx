"use client"

import CryptoJS from "crypto-js";
const secretKey = "qwertyuiopasdfghjklzxcvbnm"

import { Box, Typography, TextField, Button, Paper } from "@mui/material"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import Logo from "../../public/Logo.png"
import Link from "next/link"
import { useState } from "react"
import { User } from "@/context/AuthContext"

type LoginFormData = {
    email: string
    password: string
    confirmPassword: string
}
export default function SignupClient() {
    const [userExists, setUserExists] = useState<string>("")

    const router = useRouter()

    const encryptPassword = (password: string) => {
        const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
        return encrypted;
    }

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<LoginFormData>()
    const onSubmit = (data: LoginFormData) => {
        const existingUsers = JSON.parse(localStorage.getItem("gameSphere_Users") || "[]")
        const exists = existingUsers.some(
            (user: User) => user.email === data.email
        )
        if (exists) {
            setUserExists("User already exists with this email")
            return;
        }
        const newUser = {
            email: data.email,
            password: encryptPassword(data.password)
        }
        existingUsers.push(newUser)
        localStorage.setItem("gameSphere_Users", JSON.stringify(existingUsers))
        setUserExists("")
        reset()
        router.push("/login")
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                background: "#0f0f0f",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                    px: 5,
                    py: 5,
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 4,
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "blueviolet",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        letterSpacing: "-0.5px",
                    }}
                    variant="h1"
                >
                    <Image src={Logo} alt="logo" width={60} height={40} className="-mr-5" />
                    GameSphere
                </Typography>
                <Box sx={{ width: "100%", textAlign: "center", mb: 1 }}>
                    <Typography sx={{ color: "#e0e0e0", fontSize: "20px", fontWeight: 600 }}>
                        Great to see you here
                    </Typography>
                    <Typography sx={{ color: "#6b6b6b", fontSize: "13px", mt: 0.5 }}>
                        Create your account and start having fun
                    </Typography>
                </Box>
                {userExists && (
                    <Typography sx={{ color: "red", fontSize: "13px" }}>
                        {userExists}
                    </Typography>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5, width: "100%" }}
                >
                    <Box>
                        <TextField
                            fullWidth
                            placeholder="Email address"
                            slotProps={{ htmlInput: { "aria-label": "Email address" } }}
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
                                },
                            })}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#e0e0e0",
                                    borderRadius: 2,
                                    background: "#242424",
                                    "& fieldset": { borderColor: "#2e2e2e" },
                                    "&:hover fieldset": { borderColor: "#3e3e3e" },
                                    "&.Mui-focused fieldset": { borderColor: "blueviolet" },
                                },
                                "& .MuiInputBase-input::placeholder": { color: "#4a4a4a" },
                                "& .MuiFormHelperText-root": { color: "#f48fb1", mx: 0 },
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            placeholder="Password"
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#e0e0e0",
                                    borderRadius: 2,
                                    background: "#242424",
                                    "& fieldset": { borderColor: "#2e2e2e" },
                                    "&:hover fieldset": { borderColor: "#3e3e3e" },
                                    "&.Mui-focused fieldset": { borderColor: "blueviolet" },
                                },
                                "& .MuiInputBase-input::placeholder": { color: "#4a4a4a" },
                                "& .MuiFormHelperText-root": { color: "#f48fb1", mx: 0 },
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            placeholder="Confirm your password"
                            type="password"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) => value === getValues("password") || "Passwords do not match"
                            })}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#e0e0e0",
                                    borderRadius: 2,
                                    background: "#242424",
                                    "& fieldset": { borderColor: "#2e2e2e" },
                                    "&:hover fieldset": { borderColor: "#3e3e3e" },
                                    "&.Mui-focused fieldset": { borderColor: "blueviolet" },
                                },
                                "& .MuiInputBase-input::placeholder": { color: "#4a4a4a" },
                                "& .MuiFormHelperText-root": { color: "#f48fb1", mx: 0 },
                            }}
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 0.5,
                            py: 1.4,
                            borderRadius: 2,
                            fontSize: "15px",
                            fontWeight: 600,
                            textTransform: "none",
                            background: "blueviolet",
                            boxShadow: "none",
                            "&:hover": {
                                background: "#7b2fbe",
                                boxShadow: "none",
                            },
                        }}
                    >
                        Create Account
                    </Button>
                </Box>
                <Typography sx={{ color: "#4a4a4a", fontSize: "13px", mt: 1 }}>
                    Already have an account?{" "}
                    <Link href="/login">
                        <Box
                            component="span"
                            sx={{ color: "blueviolet", cursor: "pointer", "&:hover": { color: "#9b59b6" } }}
                        >
                            Login
                        </Box>
                    </Link>
                </Typography>
            </Paper>
        </Box>
    )
}