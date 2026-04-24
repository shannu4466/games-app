import { create } from "zustand";

type GameResult = {
    bonusScore: string;
    gameName: string;
    userEmail: string;
    score: number;
    rightQuestions: number;
    wrongQuestions: number;
    mode: string;
    Date: string;
};

type HomePageStore = {
    id: number,
    open: boolean;
    medium: boolean;
    gameStarted: boolean;
    history: GameResult[];
    searchGame: string;
    gameName: string;

    setId: (value: number) => void;
    setOpen: (value: boolean) => void;
    setMedium: (value: boolean) => void;
    setGameStarted: (value: boolean) => void;
    setHistory: (data: GameResult[]) => void;
    setSearchGame: (data: string) => void;
    setGameName: (data: string) => void;
};

export const useHomePageStore = create<HomePageStore>((set) => ({
    id: 0,
    open: false,
    medium: false,
    gameStarted: false,
    history: [],
    searchGame: "",
    gameName: "",

    setId: (value) => set({ id: value }),
    setOpen: (value) => set({ open: value }),
    setMedium: (value) => set({ medium: value, }),
    setGameStarted: (value) => set({ gameStarted: value, }),
    setHistory: (data) => set({ history: data, }),
    setSearchGame: (data) => set({ searchGame: data, }),
    setGameName: (data) => set({ gameName: data, }),
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