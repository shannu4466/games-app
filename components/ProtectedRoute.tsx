"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const publicRoutes = ["/login", "/signup"];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isPublic = publicRoutes.includes(pathname);

    useEffect(() => {
        if (!loading && !user && !isPublic) {
            router.replace(`/login`);
        }
        if (!loading && user && isPublic) {
            router.replace("/")
        }
    }, [user, loading, pathname, router, isPublic]);

    if (user && isPublic) return null;

    if (loading)
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-6 h-6 border-2 border-white border-t-black rounded-full animate-spin" />
            </div>
        )


    if (!user && !isPublic) return null;

    return <>{children}</>;
}