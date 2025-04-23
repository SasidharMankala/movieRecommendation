import React from "react";
import { Button } from "flowbite-react";
import { BiReset } from "react-icons/bi";
import { auth } from "@/components/authentication/firebase";
import { useEffect } from "react";
import { Spinner, Toast, ToastToggle } from "flowbite-react";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";
import { deleteCookie } from "cookies-next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/components/authentication/firebase";
import { useRouter } from "next/navigation";

interface Movie {
  movieId: number;
  movieTitle: string;
  moviePoster: string;
}

const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = React.useState(false);
  const [watechedMovies, setWatchedMovies] = React.useState([]);
  const [movieLoading, setMovieLoading] = React.useState(true);

  const fetchWatchedMovie = async (movieIDS: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/alreadywatched/${movieIDS}`
    );
    const data = await res.json();
    // console.log(data);
    setWatchedMovies(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    setMovieLoading(true);
    const user = auth.currentUser;
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "userData"));
      querySnapshot.forEach((doc) => {
        if (doc.id == user?.uid) {
          const movieIDS = doc.data()["movieID"].toString();
          fetchWatchedMovie(movieIDS);
          console.log(movieIDS);
          setMovieLoading(false);
        }
        setMovieLoading(false);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (user !== null) {
      const displayName = user.displayName;
      setDisplayName(displayName || "");
      const email = user.email;
      setEmail(email || "");
      const photoURL = user.photoURL;
      setPhotoURL(photoURL || "");
      setLoading(false);
    }
  }, [user]);

  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/platform?movieID=${id}`);
  };

  const handleResetPreferences = () => {
    // Clear cookies or local storage here
    deleteCookie("selected_genres");
    deleteCookie("selected_actors");
    // Optionally, you can also reset the state or perform any other actions
    console.log("Preferences reset");
    setShowToast(true);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="max-w-4xl mx-auto px-10 py-16">
            {/* Profile Section */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 text-gray-500">
                {photoURL == "" ? (
                  <MdAccountCircle className="w-full h-full" />
                ) : (
                  <Image
                    src={photoURL}
                    alt="User Profile"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl text-gray-500 dark:text-gray-400 font-bold">
                  {displayName}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{email}</p>
              </div>
            </div>

            {/* Recently Watched Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-500 dark:text-gray-400">
                Recently Watched
              </h2>
              {movieLoading ? (
                <div className="flex text-center">
                  <Spinner />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {watechedMovies.map((movie: Movie) => (
                    <div
                      key={movie.movieId}
                      className="flex flex-col cursor-pointer"
                      onClick={() => {
                        handleClick(Number(movie.movieId));
                        dispatch(selection("movie"));
                      }}
                    >
                      <div
                        key={movie.movieId}
                        className="flex flex-col items-center"
                      >
                        <div className="relative w-full h-80 overflow-hidden rounded-lg mb-2 bg-gray-200">
                          {/* Empty image placeholder */}
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            <Image
                              src={movie.moviePoster}
                              alt="Movie Poster"
                              width={200}
                              height={300}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <h3 className="text-center font-medium text-gray-500 dark:text-gray-400">
                          {movie.movieTitle}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center py-8">
              <Button
                className="flex items-center justify-center gap-4 bg-[#646AE8] dark:bg-[#646AE8] hover:bg-indigo-700"
                onClick={handleResetPreferences}
              >
                <span className="flex items-center ml-2">
                  <BiReset />
                </span>
                <span>Reset Preferences</span>
              </Button>
            </div>
          </div>
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
              <div className="ml-3 text-sm font-normal">
                Preferences were Reset
              </div>
              <ToastToggle onDismiss={() => setShowToast(false)} />
            </Toast>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
