import { Metadata } from "next";
import ProfileClient from './ProfileClient'

export const metadata: Metadata = {
    title: 'GameSphere Profile',
}

export default function Login() {
    return (
        <div suppressHydrationWarning>
            <ProfileClient />
        </div>
    )
}