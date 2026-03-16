"use client";
import vacancyService from "@/app/api/services/vacancyService";
import { deleteVacancy } from "@/app/store/slices/vacancySlice";
import { Vacancy } from "@/app/types/User";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  vacancy: Vacancy;
  children: React.ReactNode;
};

export default function DeleteVacancyModule({ vacancy, children }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  async function HandleDelete() {
    setIsLoading(true);
    try {
      const res: any = await vacancyService.delete(vacancy.id);
      if (res.deleted === true) {
        dispatch(deleteVacancy(vacancy));
      }
      setIsLoading(false);
      router.push("/panel/vacancies");
    } catch (error: any) {
      if (!error.response) {
        setError("Ichki server xatosi, iltimos keyinroq qayta urinib ko'ring");
      } else {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Haqiqatan ham ishonchingiz komilmi?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu amalni qaytarib bo'lmaydi. Bu sizning vakansiyangizni butunlay o'chirib tashlaydi
            ({vacancy.name}) va ma'lumotlaringizni serverlarimizdan olib tashlaydi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!isLoading && <AlertDialogCancel>Bekor qilish</AlertDialogCancel>}
          <AlertDialogAction onClick={HandleDelete}>
            {isLoading ? "o'chirilmoqda..." : "Davom etish va o'chirish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
