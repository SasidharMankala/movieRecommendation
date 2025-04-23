import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


const RecommendedMovies = () => {
  interface Movie {
    movieId: string;
    movieTitle: string;
    moviePoster: string;
  }

  const [recommendedList, setRecommendedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (id: number) => {
    router.push(`/platform?movieID=${id}`);
  };


  useEffect(() => {
    // setLoading(true);
    const movieID = searchParams.get("movieID");
    const fetchRecommendedList = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/recommend/${movieID}`
      );
      const data = await res.json();
      console.log(data);
      setRecommendedList(data);
      setLoading(false);
    };
    fetchRecommendedList();
  }, []);

  return (
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-screen">
            <Spinner />
          </div>
        ) : (
          recommendedList.map((movie: Movie) => (
            <a
              key={movie.movieId}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                handleClick(Number(movie.movieId));
                dispatch(selection("movie"));
              }}
            >
              <Card
                className="max-w-sm p-0 bg-cover bg-center h-72 w-full"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                style={{ backgroundImage: `url(${movie.moviePoster})` }}
              />

              <h3 className="text-center font-medium text-gray-500 dark:text-gray-400">
                {movie.movieTitle}
              </h3>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedMovies;
