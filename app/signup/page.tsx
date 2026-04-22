import { Metadata } from "next";
import SignupClient from './SignupClient'

export const metadata: Metadata = {
    title: 'GameSphere-Create account',
}

export default function Login() {
    return (
        <div suppressHydrationWarning>
            <SignupClient />
        </div>
    )
}