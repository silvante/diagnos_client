import Diagnos from "@/app/(global_components)/Diagnos";
import AsideLink from "./(meta-components)/AsideLink";
import {
  CircleUser,
  FileUser,
  GitFork,
  HandHeart,
  House,
  Settings,
  WorkflowIcon,
} from "lucide-react";

export default function Aside() {
  return (
    <aside className="p-5 sticky top-0 left-0 h-screen bg-white border-r border-gray-300 z-10 max-w-72 w-full hidden lg:flex flex-col gap-5">
      <Diagnos link="/panel" />
      <div>
        <AsideLink href="/panel">
          <House /> Boshqaruv paneli
        </AsideLink>
        <AsideLink href="/panel/organizations">
          <GitFork /> Tashkilotlar
        </AsideLink>
        <AsideLink href="/panel/vacancies">
          <FileUser /> Vakansiyalar
        </AsideLink>
        <AsideLink href="/panel/jobs">
          <WorkflowIcon /> Ishlar
        </AsideLink>
        <AsideLink href="/panel/profile">
          <CircleUser /> Profil
        </AsideLink>
        <AsideLink href="/panel/community">
          <HandHeart /> Hamjamiyat va yordam
        </AsideLink>
        <AsideLink href="/panel/profile/settings">
          <Settings /> Sozlamalar
        </AsideLink>
      </div>
    </aside>
  );
}
