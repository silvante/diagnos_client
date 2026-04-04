"use client";
import workerService from "@/app/api/services/workerService";
import { deleteWorker } from "@/app/store/slices/workerSlice";
import { Worker } from "@/app/types/User";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  worker: Worker;
  children: React.ReactNode;
};

export default function DeleteWorkerDialog({ worker, children }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { organization } = useSelector((state: any) => state.validator);
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  async function HandleDelete() {
    setIsLoading(true);
    try {
      const res: any = await workerService.delete(organization.id, worker.id);
      if (res.deleted === true) {
        dispatch(deleteWorker(worker));
      }
      setIsLoading(false);
      router.push(`/org/${organization.unique_name}/workers`);
    } catch (error: any) {
      if (!error.response) {
        setError("Ichki server xatosi, iltimos keyinroq qayta urining");
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Ishchini o'chirish</DialogTitle>
          <DialogDescription>
            Ishchini o'chirish uchun uning foydalanuvchi nomini kiritishingiz
            kerak{" "}
            <span className="font-semibold">{worker.worker.username}</span>{" "}
            xavfsizlik sabablarga ko'ra.
          </DialogDescription>
        </DialogHeader>
        {error !== "" && (
          <Alert variant="destructive">
            <ShieldAlert />
            <AlertTitle>Ogohlantirish</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4">
          <div className="grid gap-3">
            <label htmlFor="username">Foydalanuvchi nomi</label>
            <Input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Bekor qilish</Button>
          </DialogClose>
          <Button
            className="cursor-pointer"
            disabled={username !== worker.worker.username}
            onClick={HandleDelete}
          >
            {isLoading ? "Yuborilmoqda..." : "Ishdan bo'shatish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
