"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { FaFire, FaBookmark } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";


const Side = () => {
  const sidebarWidth = "w-64"; // You can adjust this width as needed
  const dispatch = useDispatch();
  const screen = useAppSelector((state) => state.selections.value);
  const router = useRouter();

  return (
    <div className={`${sidebarWidth} flex-shrink-0`}>
      <Sidebar className="h-full flex flex-col">
        <SidebarItems className="flex flex-col justify-between h-full">
          <SidebarItemGroup>
            <p className="text-center whitespace-nowrap font-semibold text-xl text-gray-900 pb-4 dark:text-white cursor-pointer"
            onClick={()=>{router.push("/")}}
            >
              Falcon
            </p>

            <SidebarItem
              href="#"
              icon={FaFire}
              onClick={() => dispatch(selection("trending"))}
              active={screen === "trending"}
            >
              Trending
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={IoMdVideocam}
              onClick={() => dispatch(selection("preference"))}
              active={screen === "recommendation" || screen === "preference"}
            >
              Recommendations
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={FaBookmark}
              onClick={() => dispatch(selection("profile"))}
              active={screen === "profile"}
            >
              Profile
            </SidebarItem>
          </SidebarItemGroup>
          <SidebarItemGroup>
            <SidebarItem icon={MdAccountCircle}>
              Account
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
};

export default Side;
