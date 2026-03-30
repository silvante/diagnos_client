"use client";
import Heading from "@/app/(global_components)/Heading";
import Community from "@/app/(root)/(sections)/Community";
import { useSelector } from "react-redux";

export default function CommunityPanelPage() {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <div className="space-y-8">
      <div className="w-full overflow-hidden">
        <Heading text={`👋 Salom ${currentUser?.name}`} />
      </div>
      <Community />
      <div className="space-y-2">
        <Heading text="# Yaratuvchidan" />
        <p className="text_color">
          Yuqoridagi ijtimoiy media kanallarimizni kuzatib borish juda tavsiya etiladi, chunki ular bevosita yaratuvchi tomonidan boshqariladi va juda faol. Siz real vaqt rejimida qo'llab-quvvatlash, darsliklar va yangilanishlarga osonlik bilan kirishingiz mumkin. Bundan tashqari, Diagnos Uz kompaniyasining bosh direktoriga bevosita murojaat qilib, tushunchalar, fikr-mulohazalar va muhim e'lonlarni olishingiz mumkin. Ushbu kanallar orqali bog'lanish har doim bizning hamjamiyatimizdagi eng so'nggi xususiyatlar, yaxshilanishlar va imkoniyatlardan xabardor bo'lishingizni ta'minlaydi.
        </p>
      </div>
    </div>
  );
}
