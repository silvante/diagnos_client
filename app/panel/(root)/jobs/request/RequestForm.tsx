"use client";

import { Spinner } from "@/components/ui/spinner"
import organizationService from "@/app/api/services/organizationService";
import LoadingOrganizationSkeleton from "@/app/components/LoadingOrganizationSkeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ResultType {
    name: string;
    unique_name: string;
    description: string;
    logo: string;
    banner: {
        id: string;
        original: string;
        thumbnail: string;
        organization_id: string;
    };
};

export default function RequestForm() {
    const [name, setName] = useState("");
    const [result, setResult] = useState<ResultType>([]);
    const [error, setError] = useState("");
    const [role, setRole] = useState("");
    const [success, setSuccess] = useState(false)

    const mutation = useMutation({
        mutationFn: async (searchName: string) => {
            setSuccess(false)
            return await organizationService.findOrganizations(searchName);
        },

        onSuccess: (data) => {
            setResult(data || []);
        },

        onError: (error: any) => {
            setError(error?.response?.data?.message || "Nimadir xato ketti.")
        },
    });

    const postMutation = useMutation({
        mutationFn: async (role: any) => {
            return await organizationService.joinOrganizationRequest(result.unique_name, role);
        },

        onSuccess: (data) => {
            setSuccess(true);
        },

        onError: (error: any) => {
            // setError(error?.response?.data?.message || "Nimadir xato ketti.")
            console.log(error)
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) return;

        mutation.mutate(name);
    };

    const handleSendRequest = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) return;

        postMutation.mutate(name);
    };

    return (
        <div className="space-y-4">
            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="w-full bg-white border border-gray-300 p-5 rounded-xl space-y-3"
            >
                <p className="text-xl">Tashkilot takrorlanmas nomi</p>

                <div className="flex items-center gap-3">
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tashkilot nomi..."
                        className="flex-1 global_input"
                        type="text"
                    />

                    <button
                        type="submit"
                        disabled={mutation.isPending || name.length < 3}
                        className="w-30 h-10.5 flex items-center justify-center bg-violet-600 text-white  rounded-xl hover:bg-violet-700 transition disabled:opacity-50"
                    >
                        {mutation.isPending ? <Spinner /> : "Qidirish"}
                    </button>
                </div>
            </form>

            {mutation.data && (
                <div className="w-full mx-auto">
                    <div className="relative h-48 rounded-t-2xl overflow-hidden border border-gray-200 group">

                        <Image
                            src={result.banner.original}
                            alt={result.name}
                            fill
                            className="object-cover group-hover:scale-101 transition-transform duration-300"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h2 className="text-2xl font-semibold leading-tight">
                                {result.name}
                            </h2>
                            <p className="text-sm text-gray-200">
                                @{result.unique_name}
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSendRequest}
                        className="w-full bg-white border-x border-b border-gray-300 p-5 rounded-b-xl space-y-3"
                    >
                        <p className="text-md">So'rov jonatish</p>

                        <div className="flex flex-col gap-3">
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Ro'lni tanlang" />
                                </SelectTrigger>

                                <SelectContent className="w-[var(--radix-select-trigger-width)]">
                                    <SelectGroup>
                                        <SelectLabel>Ro'llar</SelectLabel>
                                        <SelectItem value="receptionist">Receptionist</SelectItem>
                                        <SelectItem value="doctor">Doctor</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {success && 
                                <p className="text-green-700">Your request successfully send.</p>
                            }
                            <button
                                type="submit"
                                disabled={mutation.isPending || !role || success}
                                className="w-40 h-10.5 flex items-center justify-center bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition disabled:opacity-50 cursor-pointer"
                            >
                                {postMutation.isPending ? <Spinner /> : "Jo'natish"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {mutation.isError && (
                <div className="flex flex-col items-center text-center space-y-3 pt-2 animate-in fade-in-50">

                    <AlertCircle className="w-6 h-6 text-red-500" />

                    <p className="text-md text-gray-600">
                        {error}
                    </p>

                    <Button
                        onClick={() => mutation.mutate(name)}
                        disabled={mutation.isPending}
                        className="flex items-center justify-center gap-2 rounded-xl cursor-pointer"
                        variant="destructive"
                    >

                        <RefreshCw className="h-4" />
                        Qayta urnish

                    </Button>
                </div>
            )}

            {mutation.isPending &&
                <LoadingOrganizationSkeleton />
            }
        </div>
    );
}