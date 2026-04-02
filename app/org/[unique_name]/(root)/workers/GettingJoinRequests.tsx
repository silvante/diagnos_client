"use client";
import Heading from "@/app/(global_components)/Heading";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function GettingJoinRequests() {
  const { organization } = useSelector((state: any) => state.validator);
  const [loading, setLoading] = useState(true);

  //   async function (params:type) {

  //   }

  return (
    <div className="border border-gray-300 p-5 border-b-4 border-b-violet-600 rounded-xl space-y-3">
      <Heading text="Umumiy" />
    </div>
  );
}
