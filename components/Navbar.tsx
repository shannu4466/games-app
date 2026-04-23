"use client";

import { Box, Button, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useState } from "react";
import { usePathname } from "next/navigation";

import SunnyIcon from '@mui/icons-material/Sunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Logo from "../public/Logo.png"
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [confirmCloseOpen, setConfirmCloseOpen] = useState(false)

    const { user, logout } = useAuth();
    const { toggleTheme, mode } = useThemeContext();

    const path = usePathname()

    const handleLogout = () => {
        setConfirmCloseOpen(true)
    };

    const userEmail = user?.email;
    const userName = userEmail ? userEmail.split("@")[0].charAt(0).toUpperCase() + userEmail.split("@")[0].slice(1) : "";

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 1, sm: 1.5 },
                borderBottom: "1px solid",
                borderColor: "divider",
                position: "sticky",
                top: 0,
                zIndex: 1100,
                backdropFilter: "blur(10px)",
                backgroundColor: mode === "light"
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(18,18,18,0.85)",
                boxShadow: "0 1px 12px rgba(0,0,0,0.08)",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 0.5, sm: 1 },
                    textDecoration: "none",
                }}
                component="a"
                href="/"
            >
                <Image src={Logo} width={60} height={60} alt="logo" />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                        letterSpacing: "-0.5px",
                        display: { xs: "none", sm: "block" }, // hide on very small screens
                        color: "text.primary",
                    }}
                >
                    Game Sphere
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
                <Box sx={{ display: "flex", alignItems: "center", mr: 10 }}>
                    <AccountCircleIcon />
                    <Typography sx={{ ml: 0.5 }}>{userName}</Typography>
                    <Link href={path === "/profile" ? "/" : "/profile"}>
                        <Typography sx={{ ml: 3 }}>{path === '/profile' ? "Go to home" : "View profile"}</Typography>
                    </Link>
                    <Link href="/dashboard">
                        <Typography sx={{ ml: 3 }}>Dashboard</Typography>
                    </Link>
                </Box>
                <IconButton
                    onClick={toggleTheme}
                    size="small"
                    sx={{
                        borderRadius: "10px",
                        p: "8px",
                        color: "text.secondary",
                        "&:hover": {
                            backgroundColor: "action.hover",
                            color: "text.primary",
                        },
                        transition: "all 0.2s ease",
                    }}
                    aria-label="Toggle theme"
                >
                    {mode === "light" ? <BedtimeIcon fontSize="small" /> : <SunnyIcon fontSize="small" />}
                </IconButton>

                <Button
                    onClick={handleLogout}
                    size="small"
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        px: { xs: 1.5, sm: 2 },
                        py: 0.75,
                        color: "text.primary",
                        transition: "all 0.2s ease",
                    }}
                >
                    <LogoutIcon />
                </Button>
            </Box>
            <Dialog open={confirmCloseOpen} onClose={() => setConfirmCloseOpen(false)}>
                <DialogTitle>Logout?</DialogTitle>

                <DialogContent>
                    <Typography>
                        Are you sure you want to logout from this app?
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setConfirmCloseOpen(false)} color='primary'>
                        Cancel
                    </Button>

                    <Button
                        onClick={() => {
                            setConfirmCloseOpen(false);
                            logout();
                        }}
                        color='error'
                        variant='contained'
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}