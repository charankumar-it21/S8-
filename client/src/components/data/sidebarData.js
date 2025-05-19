import { LayoutDashboard, BadgeHelp } from "lucide-react";
import { SiCoursera } from "react-icons/si";
import { HiOutlineHome } from "react-icons/hi2";
import { RiStackLine } from "react-icons/ri";
import { SiCompilerexplorer } from "react-icons/si";
import { SiTask } from "react-icons/si";
import { FaRegEdit } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";
import { MdOutlineApproval } from "react-icons/md";

export const sidebarData = [
  {
    section: "Home",
    items: [
      {
        icon: LayoutDashboard,
        label: "Home Page",
        route: "/home",
        roles: ["1"],
      },
      {
        icon: FaRegEdit,
        label: "Add Details",
        route: "/add-details",
        roles: ["1"],
      },
      {
        icon: HiOutlineHome,
        label: "Student Home Page",
        route: "/student-home",
        roles: ["3"],
      },
      {
        icon: HiOutlineHome,
        label: "Home Page",
        route: "/home",
        roles: ["2"],
      },
      {
        icon: SiCoursera,
        label: "Academic Details",
        route: "/academic-details",
        roles: ["3"],
      },
      {
        icon: RiStackLine,
        label: "Achievements Details",
        route: "/achievements-details",
        roles: ["3"],
      },
      {
        icon:MdOutlineApproval ,
        label: "Approve Achievements",
        route: "/approve-achievements",
        roles: ["1", "2", "3"],
      },
      {
        icon: GrAchievement,
        label: "Achievements ",
        route: "/students-achievements-details",
        roles: ["1", "2"],
      },
      {
        icon: SiCompilerexplorer,
        label: "Academic Performance",
        route: "/academic-performance",
        roles: ["1", "2"],
      },
    ],
  },

  {
    section: "Settings",
    items: [
      {
        icon: BadgeHelp,
        label: "Profile",
        route: "/profile",
      },
    ],
    roles: ["1", "2", "3"],
  },
];
