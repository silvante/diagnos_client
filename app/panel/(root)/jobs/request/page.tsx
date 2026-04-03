import Heading from "@/app/(global_components)/Heading";
import RequestForm from "./RequestForm";
import BackBtn from "@/app/(global_components)/BackBtn";

export default function page() {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Heading text="Sizning ishingiz" />
                <BackBtn href="http://localhost:3000/panel/jobs" />
            </div>
            <RequestForm />
        </div>
    )
}