"use client";
import Heading from "@/app/(global_components)/Heading";
import { BellDot } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function GettingJoinRequests() {
  const { organization } = useSelector((state: any) => state.validator);
  const [loading, setLoading] = useState(true);

    async function GetJoinReqs() {
      
    }

  return (
    <div className="border border-gray-300 p-5 border-b-4 border-b-violet-600 rounded-xl space-y-3">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <BellDot color="#7c3aed" />
          <Heading text="Xabarlar" />
        </div>
        <Heading text={`(${0})`} />
      </div>
    </div>
  );
}
