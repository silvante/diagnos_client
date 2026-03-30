"use client"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import authService from "../api/services/authService";
import { updateUser } from "../store/slices/userSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoImage from "@/public/icons/logo.svg";

export default function StoreUser() {
    // redux 
    const dispatch = useDispatch();

    // states 
    const router = useRouter();

    const token = typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                return await authService.getProfile();
            } catch {
                const reset_token = localStorage.getItem("reset_token");

                if (!reset_token) {
                    throw new Error("Unauthorized");
                }

                const newToken: any = await authService.resetToken(reset_token);
                localStorage.setItem("access_token", newToken);

                return await authService.getProfile();
            }
        },
        retry: false,
        enabled: !!token,
    });

    useEffect(() => {
        if (data) {
            dispatch(updateUser(data));
        }
    }, [data, dispatch]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-5">
                <span />
                <Image src={LogoImage} alt="logo" width={140} height={38} />
                <p className="text-violet-900 text-sm">Ilova yuklanmoqda...</p>
            </div>
        );
    }

    return null;
}