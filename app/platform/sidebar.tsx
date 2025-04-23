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
import { auth } from "@/components/authentication/firebase";
import { useState, useEffect } from "react";
import Image from "next/image";

const Side = () => {
  const sidebarWidth = "w-64"; // You can adjust this width as needed
  const dispatch = useDispatch();
  const screen = useAppSelector((state) => state.selections.value);
  const router = useRouter();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    // setLoading(true);
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      setDisplayName(displayName || "");
      const email = user.email;
      setEmail(email || "Account");
      const photoURL = user.photoURL;
      setPhotoURL(photoURL || "");
    }
  }, [user]);

  return (
    <div className={`${sidebarWidth} flex-shrink-0`}>
      <Sidebar className="h-full flex flex-col">
        <SidebarItems className="flex flex-col justify-between h-full">
          <SidebarItemGroup>
            <p
              className="text-center whitespace-nowrap font-semibold text-xl text-gray-900 pb-4 dark:text-white cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              Falcon
            </p>

            <SidebarItem
              href="#"
              icon={FaFire}
              onClick={() => {
                router.replace("/platform");
                dispatch(selection("trending"));
              }}
              active={screen === "trending"}
            >
              Trending
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={IoMdVideocam}
              onClick={() => {
                router.replace("/platform");
                dispatch(selection("preference"));
              }}
              active={screen === "recommendation" || screen === "preference"}
            >
              Recommendations
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={FaBookmark}
              onClick={() => {
                router.replace("/platform");
                dispatch(selection("profile"));
              }}
              active={screen === "profile"}
            >
              Profile
            </SidebarItem>
          </SidebarItemGroup>
          <SidebarItemGroup>
            <SidebarItem
              icon={photoURL == "" ? MdAccountCircle : ""}
              href="#"
              onClick={() => {
                router.replace("/platform");
                dispatch(selection("profile"));
              }}
            >
              <div className="flex items-center">
                {photoURL && (
                  <Image
                    src={photoURL}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                )}
                <div>
                  {displayName !== "" ? displayName : email}
                  <p className="text-sm">View Profile</p>
                </div>
              </div>
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
};

export default Side;
