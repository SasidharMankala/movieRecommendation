import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";


const Trending = () => {
  interface Movie {
    movieId: string;
    movieTitle: string;
    moviePoster: string;
  }


  const [trendingList, setTrendingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // setLoading(true);
    const fetchTrendingList = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/trending`
      );
      const data = await res.json();
      console.log(data);
      setTrendingList(data);
      setLoading(false);
    };
    fetchTrendingList();
  }, []);

  return (
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-screen">
            <Spinner />
          </div>
        ) : ( 
          trendingList.map((movie: Movie) => (
            <a key={movie.movieId} className="flex flex-col items-center cursor-pointer" onClick={() => dispatch(selection("movie"))}>
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
        <Button className="justify-self-center bg-[#646AE8] dark:bg-[#646AE8] rounded-md col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 w-1/6">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Trending;
