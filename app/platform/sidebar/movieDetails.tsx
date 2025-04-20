"use client";

import React from "react";
import { Button } from "flowbite-react";
import { useState } from "react";

const MovieDetails = () => {
  const [hasWatched, setHasWatched] = useState(true);

  return (
    <div className="max-w-5xl mx-auto p-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column - 5 rows */}
        <div className="flex flex-col gap-6">
          {/* Row 1: Movie Poster */}
          <div className="w-full">
            <div className="relative w-full h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Row 2: Buttons */}
          <div className="flex gap-4">
            <Button
              className={`px-4 py-2 flex items-center justify-center ${
                hasWatched
                  ? "bg-[#646AE8] dark:bg-[#646AE8] hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setHasWatched(true)}
            >
              Already Watched
            </Button>
            <Button className="px-4 py-2 rounded-lg border bg-transparent text-[#646AE8] border-[#646AE8] hover:bg-[#646AE8] hover:text-white">
              Watch Trailer
            </Button>
          </div>
          
          {/* Row 3: Rating stars */}
          <div className="flex">
            {[1, 2, 3, 4].map((star) => (
              <svg
                key={star}
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg
              className="w-6 h-6 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          
          {/* Row 4: Director */}
          <div>
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
              Director: John Woo
            </h2>
          </div>
          
          {/* Row 5: Cast */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Cast: Tom Cruise, Thandiwe Newton, Dougray Scott, Richard
              Roxburgh, Ving Rhames, William Mapother
            </h2>
          </div>
        </div>

        {/* Second Column - 3 rows */}
        <div className="flex flex-col gap-6">
          {/* Row 1: Movie Title */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              Mission Impossible
            </h1>
          </div>
          
          {/* Row 2: Release Date & Rating */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700 dark:text-gray-300">
              Release Year: 2000
            </span>
            <span className="text-gray-700 dark:text-gray-300">|</span>
            <span className="text-gray-700 dark:text-gray-300">Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg
                className="w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          
          {/* Row 3: Movie Description */}
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              IMF agent Ethan Hunt is sent to Sydney to find and destroy a
              genetically modified disease called &quot;Chimera&quot;.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;