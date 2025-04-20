"use client";

import { DarkThemeToggle } from "flowbite-react";
import { Button, Navbar, NavbarToggle } from "flowbite-react";
import { MdOutlineLogout } from "react-icons/md";
import { auth } from "@/components/authentication/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const PlatformNavBar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    signOut(auth).then(() => {
      router.push("/");
    }).catch((error: unknown) => {
      console.error("Error signing out: ", error);
    });
    
  };
  return (
    <Navbar fluid rounded className="justify-end">
      <div className="flex items-center ml-auto gap-2">
        <Button
          className="flex items-center justify-center gap-4 bg-[#646AE8] dark:bg-[#646AE8] hover:bg-indigo-700"
          onClick={handleLogout}
        >
          <span className="flex items-center">
            <MdOutlineLogout />
          </span>
          <span>Log out</span>
        </Button>
        <NavbarToggle />
        <DarkThemeToggle />
      </div>
    </Navbar>
  );
};

export default PlatformNavBar;
