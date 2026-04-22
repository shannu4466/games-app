import { create } from "zustand";

type GameResult = {
    userEmail: string;
    score: number;
    rightQuestions: number;
    wrongQuestions: number;
    mode: string;
    Date: string;
};

type HomePageStore = {
    open: boolean;
    medium: boolean;
    gameStarted: boolean;
    history: GameResult[];
    searchGame: string;

    setOpen: (value: boolean) => void;
    setMedium: (value: boolean) => void;
    setGameStarted: (value: boolean) => void;
    setHistory: (data: GameResult[]) => void;
    setSearchGame: (data: string) => void;
};

export const useHomePageStore = create<HomePageStore>((set) => ({
    open: false,
    medium: false,
    gameStarted: false,
    history: [],
    searchGame: "",

    setOpen: (value) => set({ open: value }),
    setMedium: (value) => set({ medium: value, }),
    setGameStarted: (value) => set({ gameStarted: value, }),
    setHistory: (data) => set({ history: data, }),
    setSearchGame: (data) => set({ searchGame: data, }),
}));

type LoginPageStore = {
    showPassword: boolean;
    userInvalid: string;
    savedCred: {
        email: string;
        password: string;
        rememberMe: boolean;
    } | null;
    setShowPassword: (value: boolean) => void;
    setUserInvalid: (value: string) => void;
    setSavedCred: (data: { email: string; password: string; rememberMe: boolean } | null) => void;
}

export const useLoginPageStore = create<LoginPageStore>((set) => ({
    showPassword: false,
    userInvalid: "",
    savedCred: null,
    setShowPassword: (value) => set({ showPassword: value }),
    setUserInvalid: (value) => set({ userInvalid: value }),
    setSavedCred: (data) => set({ savedCred: data }),
}))