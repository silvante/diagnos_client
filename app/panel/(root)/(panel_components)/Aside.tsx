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

// "use client"
// import Diagnos from "@/app/(global_components)/Diagnos";
// import AsideLink from "./aside-link"
// import {
//   CircleUser,
//   FileUser,
//   GitFork,
//   HandHeart,
//   House,
//   Settings,
//   WorkflowIcon,
// } from "lucide-react"

// export default function Aside() {
//   return (
//     <aside className="p-4 sticky top-0 left-0 h-screen bg-white backdrop-blur-xl border-r border-sidebar-border z-10 w-64 hidden lg:flex flex-col">
//       {/* Logo */}
//       <div className="mb-2">
//         <Diagnos link="/panel" />
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 flex flex-col gap-1">
//         <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
//           Menu
//         </p>

//         <AsideLink href="/panel" icon={<House className="w-4 h-4" />}>
//           Boshqaruv paneli
//         </AsideLink>

//         <AsideLink href="/panel/organizations" icon={<GitFork className="w-4 h-4" />}>
//           Tashkilotlar
//         </AsideLink>

//         <AsideLink href="/panel/vacancies" icon={<FileUser className="w-4 h-4" />}>
//           Vakansiyalar
//         </AsideLink>

//         <AsideLink href="/panel/jobs" icon={<WorkflowIcon className="w-4 h-4" />}>
//           Ishlar
//         </AsideLink>

//         <div className="my-4 h-px bg-sidebar-border" />

//         <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
//           Hisob
//         </p>

//         <AsideLink href="/panel/profile" icon={<CircleUser className="w-4 h-4" />}>
//           Profil
//         </AsideLink>

//         <AsideLink href="/panel/community" icon={<HandHeart className="w-4 h-4" />}>
//           Hamjamiyat va yordam
//         </AsideLink>

//         <AsideLink href="/panel/profile/settings" icon={<Settings className="w-4 h-4" />}>
//           Sozlamalar
//         </AsideLink>
//       </nav>
//     </aside>
//   )
// }
