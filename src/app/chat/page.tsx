'use client';

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatHomePage() {
    const router = useRouter();
    useEffect(() => {
        // Redirect to the chat home page
        if (typeof window !== "undefined") {
            router.replace("/chat/home");
        }
    }, [router]);
    return <>Redirecting</>;
}
