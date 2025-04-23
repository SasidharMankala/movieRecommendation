/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/components/authentication/firebase";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { Toast, ToastToggle, Button } from "flowbite-react";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [conpassError, setConPassError] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setPassError("Password must be at least 8 characters long.");
      return false;
    }
    if (!hasUppercase) {
      setPassError("Password must include at least one uppercase letter.");
      return false;
    }
    if (!hasLowercase) {
      setPassError("Password must include at least one lowercase letter.");
      return false;
    }
    if (!hasDigit) {
      setPassError("Password must include at least one digit.");
      return false;
    }
    if (!hasSpecialChar) {
      setPassError("Password must include at least one special character.");
      return false;
    }

    setPassError("");
    return true;
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

  const validateConfirmPassword = (confirmPassword: string): boolean => {
    if (confirmPassword !== password) {
      setConPassError("Passwords do not match.");
      return false;
    }

    setConPassError("");
    return true;
  };

  const SignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      router.replace("/platform");
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.message;
      const codeWithParentheses = errorMessage.match(/\(([^)]+)\)/);
      if (!codeWithParentheses) return error.message; // Return original message if format is unexpected
      const errorCode = codeWithParentheses[1];

      // Step 2: Split the code at the slash
      const parts = errorCode.split("/");

      // Step 3: Process the specific error part
      if (parts.length !== 2) return error.message; // Return original message if format is unexpected
      const specificError = parts[1];

      // Remove hyphens, split into words, and capitalize the first letter of each word
      const formattedError = specificError
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      // console.log(formattedError);
      setError(formattedError);
      setLoading(false);
      setShowToast(true);
    }
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

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Account
            </h1>
            <p className="text-center text-gray-900 dark:text-white">
              Join us to get personalized recommendations
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="Conpassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value);
                  }}
                />
              </div>
              {conpassError && <p className="text-red-500">{conpassError}</p>}
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium  hover:underline text-gray-500 dark:text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
              {passError && <p className="text-red-500">{passError}</p>}
              <button
                type="button"
                className="w-full text-white px-5 py-2.5 bg-[#646AE8] dark:bg-[#646AE8] rounded-md"
                onClick={SignUp}
              >
                {loading ? <Spinner /> : "Sign up"}
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
                className="w-full text-white px-2 py-1 hover:bg-blue-200 dark:hover:bg-blue-200 bg-[#F2F8FD] dark:bg-[#F2F8FD] rounded-md"
              >
                <p className="text-blue-400"><p className="text-blue-400">{loading ? <Spinner /> : "Continue with Facebook"}</p></p>
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already registered?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={() => {
                    router.push("/authScreens/login");
                  }}
                >
                  Login
                </a>
              </p>
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
