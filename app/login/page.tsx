import { Metadata } from "next";
import AuthClient from "./AuthClient";

export const metadata: Metadata = {
    title: 'GameSphere-Login',
}

import Image from "next/image";
import Logo from "../../public/Logo.png"

export default function Login() {
    return (
        <div suppressHydrationWarning className="flex flex-row justify-between">
            <div className="w-full flex justify-center items-center bg-stone-950">
                <Image src={Logo} alt="logo" width={1500} height={1500} />
            </div>
            <AuthClient />
        </div>
    )
}