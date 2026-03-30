"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

export default function OrgProfile() {
  const { currentUser } = useSelector((state: any) => state.user);
  if (!currentUser) {
    return "Loading...";
  }
  
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={currentUser?.avatar} />
      <AvatarFallback>
        {currentUser?.name.split("")[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
