"use client";

import { Spinner } from "@/components/ui/spinner";
import organizationService from "@/app/api/services/organizationService";
import LoadingOrganizationSkeleton from "@/app/components/LoadingOrganizationSkeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, Check, RefreshCw, Search, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ResultType {
  name: string;
  unique_name: string;
  description: string;
  logo: string | null | undefined;
  banner: {
    original: string;
    thumbnail: string;
  } | null | undefined;
}

interface ApiError {
  response?: { data?: { message?: string } };
}

export default function RequestForm() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [searchError, setSearchError] = useState("");
  const [postError, setPostError] = useState("");
  const [role, setRole] = useState<"receptionist" | "doctor" | "">("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (searchName: string): Promise<ResultType> => {
      setSuccess(false);
      setResult(null);
      setSearchError("");
      const data = await organizationService.findOrganizations(searchName);
      return data as unknown as ResultType;
    },

    onSuccess: (data: ResultType) => {
      setResult(data);
    },

    onError: (err: ApiError) => {
      setSearchError(err?.response?.data?.message || "Nimadir xato ketti.");
    },
  });

  const postMutation = useMutation({
    mutationFn: async (selectedRole: "receptionist" | "doctor") => {
      if (!result) throw new Error("Tashkilot tanlanmagan.");
      return await organizationService.joinOrganizationRequest(
        result.unique_name,
        selectedRole,
      );
    },

    onSuccess: () => {
      setSuccess(true);
      setPostError("");
    },

    onError: (err: ApiError) => {
      setPostError(err?.response?.data?.message || "Nimadir xato ketti.");
    },
  });

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutation.mutate(name);
  };

  const handleSendRequest = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!result || !role) return;
    postMutation.mutate(role as "receptionist" | "doctor");
  };

  const hasBanner = !!result?.banner?.original;

  return (
    <div className="space-y-4">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-gray-300 p-5 rounded-xl space-y-3"
      >
        <p className="text-xl text_color font-medium">
          Tashkilot takrorlanmas nomi
        </p>

        <div className="flex items-center gap-3">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tashkilot nomini kiriting..."
            className="flex-1 global_input"
            type="text"
          />

          <button
            type="submit"
            disabled={mutation.isPending || name.length < 3}
            className="px-5 h-10.5 flex items-center gap-2 justify-center bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            {mutation.isPending ? (
              <Spinner />
            ) : (
              <>
                <Search className="w-4 h-4" />
                Qidirish
              </>
            )}
          </button>
        </div>
      </form>

      {/* Search Error */}
      {mutation.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Xato</AlertTitle>
          <AlertDescription className="flex items-center justify-between flex-wrap gap-2">
            <span>{searchError}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => mutation.mutate(name)}
              disabled={mutation.isPending}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Qayta urish
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Loading Skeleton */}
      {mutation.isPending && <LoadingOrganizationSkeleton />}

      {/* Result Card */}
      {mutation.isSuccess && result && (
        <div className="w-full rounded-xl overflow-hidden border border-gray-300 bg-white">
          {/* Banner / Header */}
          <div
            className={`relative overflow-hidden group ${
              hasBanner
                ? "h-48"
                : "h-24 bg-linear-to-r from-violet-50 to-violet-100"
            }`}
          >
            {hasBanner && result.banner?.original && (
              <>
                <Image
                  src={result.banner.original}
                  alt={result.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </>
            )}

            <div
              className={`absolute bottom-0 left-0 right-0 p-4 flex items-end gap-3 ${
                hasBanner ? "text-white" : "text-gray-800"
              }`}
            >
              {result.logo && (
                <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border-2 border-white/40 bg-white shadow-sm">
                  <Image
                    src={result.logo}
                    alt={`${result.name} logo`}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold leading-tight">
                  {result.name}
                </h2>
                <p
                  className={`text-sm ${
                    hasBanner ? "text-gray-200" : "text-gray-500"
                  }`}
                >
                  @{result.unique_name}
                </p>
              </div>
            </div>
          </div>

          {/* Join Request Form */}
          <form
            onSubmit={handleSendRequest}
            className="p-5 space-y-4 border-t border-gray-200"
          >
            <p className="font-medium text_color">So'rov jonatish</p>

            <Select value={role} onValueChange={(v) => setRole(v as "receptionist" | "doctor")} disabled={success}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ro'lni tanlang" />
              </SelectTrigger>
              <SelectContent className="w-(--radix-select-trigger-width)">
                <SelectGroup>
                  <SelectLabel>Ro'llar</SelectLabel>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {postError && (
              <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Xato</AlertTitle>
                <AlertDescription>{postError}</AlertDescription>
              </Alert>
            )}

            {success ? (
              <Alert className="border-green-300 text-green-700">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-700">Muvaffaqiyat</AlertTitle>
                <AlertDescription className="text-green-600/80">
                  So'rovingiz muvaffaqiyatli jo'natildi!
                </AlertDescription>
              </Alert>
            ) : (
              <button
                type="submit"
                disabled={postMutation.isPending || !role}
                className="px-6 h-10.5 flex items-center gap-2 justify-center bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition disabled:opacity-50 cursor-pointer"
              >
                {postMutation.isPending ? <Spinner /> : "Jo'natish"}
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
