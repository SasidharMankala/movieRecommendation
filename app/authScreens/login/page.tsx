/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/components/authentication/firebase";

import { Button, Spinner, Toast, ToastToggle } from "flowbite-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const login = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("User signed in:", result.user);
        // console.log("User signed in:", user.providerData[0]);
        router.push("/platform");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error signing in:", error);
        setShowToast(true);
        setLoading(false);
      });
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : null;
        const user = result.user;
        console.log("User signed in:", user);
        router.push("/platform");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error signing in:", credential);
      });
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential ? credential.accessToken : null;
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.error("Error signing in:", credential);
        setLoading(false);
      });
  };

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log("User is signed in:", user);
          setError("User Already signed in Redirecting to the platform");
          setShowToast(true);
          router.push("/platform");
        } else {
          console.log("No user is signed in.");
        }
      });
    });

  const router = useRouter();
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <p className="text-center text-gray-900 dark:text-white">
              Log in to discover your next favorite movie
            </p>
            <form className="space-y-4 md:space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium  hover:underline text-gray-500 dark:text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="button"
                className="w-full text-white px-5 py-2.5 bg-[#646AE8] dark:bg-[#646AE8] rounded-md"
                onClick={login}
              >
                {loading ? <Spinner /> : "Login"}
              </button>
              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 flex-shrink text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <Button
                type="submit"
                onClick={handleGoogleLogin}
                className="w-full text-white px-2 py-1 bg-[#FDF2F2] hover:bg-red-200 dark:hover:bg-red-200 dark:bg-[#FDF2F2] rounded-md"
              >
                <p className="text-red-500">
                  {loading ? <Spinner /> : "Coninue with Google"}
                </p>
              </Button>
              <Button
                type="submit"
                onClick={handleFacebookLogin}
                className="w-full text-white px-2 py-1 hover:bg-blue-200 dark:hover:bg-blue-200 bg-[#F2F8FD] dark:bg-[#F2F8FD] rounded-md"
              >
                <p className="text-blue-400">{loading ? <Spinner /> : "Continue with Facebook"}</p>
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={() => {
                    router.push("/authScreens/signup");
                  }}
                >
                  Sign up
                </a>
              </p>
            </form>
            {showToast && (
              <Toast className="fixed bottom-4 right-4">
                <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                  </svg>
                  <span className="sr-only">Warning icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">{error}</div>
                <ToastToggle onDismiss={() => setShowToast(false)} />
              </Toast>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
