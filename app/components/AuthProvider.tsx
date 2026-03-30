"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { updateUser } from "../store/slices/userSlice";
import authService from "../api/services/authService";
import Image from "next/image";
import LogoImage from "@/public/icons/logo.svg";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    const [token, setToken] = useState<string | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const t = localStorage.getItem("access_token");
        setToken(t);
        setInitialized(true);
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            try {
                return await authService.getProfile();
            } catch {
                const reset_token = localStorage.getItem("reset_token");

                if (!reset_token) throw new Error("Unauthorized");

                const newToken: any = await authService.resetToken(reset_token);
                localStorage.setItem("access_token", newToken);

                return await authService.getProfile();
            }
        },
        enabled: !!token,
        retry: false,
    });

    useEffect(() => {
        if (data) {
            dispatch(updateUser(data));
        }
    }, [data, dispatch]);


    if (!initialized) {
        return <FullScreenLoader />;
    }

    if (token && isLoading) {
        return <FullScreenLoader />;
    }

    return <>{children}</>;
}

function FullScreenLoader() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-5">
            <span />
            <Image src={LogoImage} alt="logo" width={140} height={38} />
            <p className="text-violet-900 text-sm">Ilova yuklanmoqda...</p>
        </div>
    );
}