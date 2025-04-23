"use client";

import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/components/authentication/firebase";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";
import { MdAccountCircle } from "react-icons/md";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User is signed in:", user);
        setIsLoggedIn(true);
        const displayName = user.displayName;
        setDisplayName(displayName || "");
        const email = user.email;
        setEmail(email || "Account");
        const photoURL = user.photoURL;
        setPhotoURL(photoURL || "");
      }
    });
  });

  const router = useRouter();
  return (
    <section className="bg-white dark:bg-gray-900">
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Falcon
          </span>
        </Navbar.Brand>
        <div className="flex gap-2 md:order-2">
          {isLoggedIn ? (
            <a
              className="cursor-pointer flex gap-4 items-center text-sm text-gray-900 dark:text-white"
              onClick={() => {
                router.replace("/platform");
                dispatch(selection("profile"));
              }}
            >
              <p className="text-lg text-gray-900 dark:text-white">
                {displayName ? displayName : email}
              </p>
              {photoURL ? (
                <Image
                  src={photoURL}
                  alt="Profile Picture"
                  width={30}
                  height={30}
                  className="rounded-full mr-2"
                />
              ) : (
                <MdAccountCircle size={30}/>
              )}
            </a>
          ) : (
            <>
              <Button
                color="gray"
                onClick={() => {
                  router.push("/authScreens/login");
                }}
              >
                Login
              </Button>
              <Button
                className="bg-[#646AE8] dark:bg-[#646AE8] rounded-md"
                onClick={() => {
                  router.push("/authScreens/signup");
                }}
              >
                Signup
              </Button>
              <DarkThemeToggle />
              <Navbar.Toggle />
            </>
          )}
        </div>
      </Navbar>
    </section>
  );
};

export default NavBar;
