import React from "react";
import { Button } from "flowbite-react";
import { MdStar, MdStarBorder } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { auth } from "@/components/authentication/firebase";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";


const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      setDisplayName(displayName || "");
      const email = user.email;
      setEmail(email || "");
      const photoURL = user.photoURL;
      setPhotoURL(photoURL || "");

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      // const uid = user.uid;
      setLoading(false);
    }
  }, []);

  const movies = [
    { id: 1, title: "Bridget Jones", rating: 4, poster: "/placeholder.jpg" },
    { id: 2, title: "La Dolce Villa", rating: 5, poster: "/placeholder.jpg" },
    { id: 3, title: "Spider Man", rating: 3, poster: "/placeholder.jpg" },
    { id: 4, title: "Avenger", rating: 4, poster: "/placeholder.jpg" },
    { id: 5, title: "Interstellar", rating: 5, poster: "/placeholder.jpg" },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<MdStar key={i} className="text-yellow-300" />);
      } else {
        stars.push(<MdStarBorder key={i} className="text-yellow-300" />);
      }
    }
    return stars;
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
                {
                  photoURL=="" ?
                <MdAccountCircle className="w-full h-full" />

                :
                <Image
                  src={photoURL}
                  alt="User Profile"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
                }

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
                Recently Watched & Rated
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <div key={movie.id} className="flex flex-col cursor-pointer" onClick={() => dispatch(selection("movie"))} >
                    <div key={movie.id} className="flex flex-col items-center">
                      <div className="relative w-full h-80 overflow-hidden rounded-lg mb-2 bg-gray-200">
                        {/* Empty image placeholder */}
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
                      <h3 className="text-center font-medium text-gray-500 dark:text-gray-400">
                        {movie.title}
                      </h3>
                    </div>
                    <div className="flex justify-center mt-1">
                      {renderStars(movie.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center py-8">
              <Button className="flex items-center justify-center gap-4 bg-[#646AE8] dark:bg-[#646AE8] hover:bg-indigo-700">
                <span className="flex items-center ml-2">
                  <BiReset />
                </span>
                <span>Reset Preferences</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
