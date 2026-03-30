"use client"
import Spinner from "@/app/(global_components)/Spinner";
import { Menu } from "lucide-react"
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileButton() {
    const { currentUser, loading } = useSelector((state: any) => state.user);

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="flex gap-2 rounded-full border border-gray-400 justify-center items-center p-1 pr-3 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex justify-center items-center text-gray-500">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={currentUser?.avatar} />
                    <AvatarFallback>
                        {currentUser?.name.split("")[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
            <Menu />
        </div>
    )
}