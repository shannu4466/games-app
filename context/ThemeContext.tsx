"use client";

import { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeContextType = {
    toggleTheme: () => void;
    mode: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextType>({
    toggleTheme: () => { },
    mode: "light",
});

export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">("dark");

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
                primary: {
                    main: mode === "light" ? "#2563eb" : "#60a5fa",
                },
                secondary: {
                    main: "#8F3DBF",
                },
                background: {
                    default: mode === "light" ? "#f8fafc" : "#0f172a",
                    paper: mode === "light" ? "#ffffff" : "#1e293b",
                },
            },
        }),
        [mode]);

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}