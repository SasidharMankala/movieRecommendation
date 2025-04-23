"use client";

import React, { useEffect } from "react";
import { Button, Spinner, Tooltip } from "flowbite-react";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";
import { HiOutlineArrowDown } from "react-icons/hi";
import RecommendedMovies from "./recommendedMovie";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/components/authentication/firebase";
import { auth } from "@/components/authentication/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Rating, RatingStar } from "flowbite-react";

interface Movie {
  cast: string;
  director: string;
  movieDescription: string;
  movieID: number;
  moviePoster: string;
  movieTitle: string;
  rating: number;
  releaseYear: number;
  trailer: string;
}

const MovieDetails = () => {
  const [hasWatched, setHasWatched] = useState(false);
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isAlreadyWatched = async (movieID: string) => {
    setHasWatched(false);
    const user = auth.currentUser;
    const querySnapshot = await getDocs(collection(db, "userData"));
    querySnapshot.forEach((doc) => {
      if (doc.id == user?.uid) {
        const movieIDS = doc.data()["movieID"];
        if (movieIDS.includes(movieID)) {
          setHasWatched(true);
        }
        // console.log(movieIDS);
      }
    });
  };

  useEffect(() => {
    // guard against no‐ID
    const movieID = searchParams.get("movieID");
    if (!movieID) return;
    isAlreadyWatched(movieID);
    // clear out the old movie so you never flash the previous one
    setMovies(null);
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/movieDetails/${movieID}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        // console.log(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchParams]);

  const handleScroll = () => {
    const targetElement = document.getElementById("recommended");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAlreadyWatched = async () => {
    setHasWatched(true);
    const movie_ID = searchParams.get("movieID");
    const user = auth.currentUser;
    try {
      if (user) {
        const userDocRef = doc(db, "userData", user.uid);
        await setDoc(
          userDocRef,
          { movieID: arrayUnion(movie_ID) },
          { merge: true }
        );
        console.log("Document written with ID: ", user.uid);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto p-8 font-sans">
          <Button
            className={`px-4 py-1 m-2 flex items-center justify-center bg-[#646AE8] dark:bg-[#646AE8] hover:bg-indigo-700`}
            onClick={() => {
              router.replace(pathname);
              dispatch(selection("trending"));
              setHasWatched(false);
            }}
          >
            <div className="flex items-center">
              <IoMdArrowBack className="mr-2" />
              <p>Back</p>
            </div>
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Column - 5 rows */}
            <div className="flex flex-col gap-6">
              {/* Row 1: Movie Poster */}
              <div className="w-full">
                <div className="relative w-full h-[600px]">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Image
                      width={500}
                      height={500}
                      src={
                        movies?.moviePoster || "/images/placeholder-image.jpg"
                      }
                      alt="Movie Poster"
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Buttons */}
              <div className="flex gap-4">
                <Button
                  disabled={hasWatched}
                  className="px-4 py-1 flex items-center justify-cente bg-[#646AE8] dark:bg-[#646AE8] hover:bg-indigo-700"
                  onClick={() => handleAlreadyWatched()}
                >
                  {hasWatched
                    ? "You already Watched this movie"
                    : "Already Watched?"}
                </Button>
                <Button
                  className="px-4 py-1 rounded-lg border border-[#646AE8] bg-transparent"
                  color="light"
                  href={movies?.trailer}
                  target="_blank"
                >
                  Watch Trailer
                </Button>
              </div>

              {/* Row 3: Rating stars */}
              <div className="flex">
                <Rating>
                  {[...Array(5)].map((_, index) => (
                    <RatingStar
                      key={index}
                      filled={index < Math.round(movies?.rating || 0)}
                    />
                  ))}
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {movies?.rating || "Loading..."} out of 5
                  </p>
                </Rating>
              </div>

              {/* Row 4: Director */}
              <div id="director">
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  Director: {movies?.director?.toString() || "Loading..."}
                </h2>
              </div>

              {/* Row 5: Cast */}
              <div>
                <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Cast: {movies?.cast?.toString() || "Loading..."}
                </h2>
              </div>
            </div>

            {/* Second Column - 3 rows */}
            <div className="flex flex-col gap-6">
              {/* Row 1: Movie Title */}
              <div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                  {movies?.movieTitle || "Loading..."}
                </h1>
              </div>

              {/* Row 2: Release Date & Rating */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">
                  Release Year: {movies?.releaseYear || "Loading..."}
                </span>
                <span className="text-gray-700 dark:text-gray-300">|</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Rating:
                </span>
                <div className="flex">
                  <Rating>
                    {[...Array(5)].map((_, index) => (
                      <RatingStar
                        key={index}
                        filled={index < Math.round(movies?.rating || 0)}
                      />
                    ))}
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {movies?.rating || "Loading..."} out of 5
                    </p>
                  </Rating>
                </div>
              </div>

              {/* Row 3: Movie Description */}
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {movies?.movieDescription || "Loading..."}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Movies */}
          <h2
            className="text-xl pt-4 font-bold text-lime-300 dark:text-lime-500"
            id="recommended"
          >
            Recommended Movies based on this current movie
          </h2>
          <RecommendedMovies />

          <div className="fixed bottom-4 right-4">
            <Tooltip content="Scroll to Recommended Movies">
              <Button onClick={handleScroll} outline pill>
                <HiOutlineArrowDown className="h-6 w-6" />
              </Button>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
