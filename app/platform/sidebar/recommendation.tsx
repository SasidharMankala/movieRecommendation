import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";
import { useRouter } from "next/navigation";

const Recommendation = () => {
  interface Movie {
    movieId: string;
    movieTitle: string;
    moviePoster: string;
  }

  const [preferredList, setPreferredList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadmoreCount, setLoadMoreCount] = useState(2);
  const [loadMoreError, setLoadMoreError] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/platform?movieID=${id}`);
  };

  useEffect(() => {
    setLoading(true);
    const selected_genres = getCookie("selected_genres");
    const selected_actors = getCookie("selected_actors");
    const selected = {
      selected_genres: (selected_genres ?? "").toString(),
      selected_actors: (selected_actors ?? "").toString(),
    };
    const prefMovieList = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/moviePreferences`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selected),
          }
        );
        const data = await response.json();
        setPreferredList(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    prefMovieList();
  }, []);

  const handleLoadMore = async () => {
    setLoadMoreCount((prev) => prev + 1);
    const selected_genres = getCookie("selected_genres");
    const selected_actors = getCookie("selected_actors");
    const selected = {
      selected_genres: (selected_genres ?? "").toString(),
      selected_actors: (selected_actors ?? "").toString(),
    };
    console.log(loadmoreCount);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/loadmorePref?page=${loadmoreCount}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      }
    );
    const data = await res.json();
    if (data.length === 0) {
      alert("No more movies to load");
      setLoadMoreError("No more movies to load");
      return;
    }
    setPreferredList((prev) => [...prev, ...data]);
  };

  return (
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen w-screen">
            <Spinner />
          </div>
        ) : (
          preferredList.map((movie: Movie) => (
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
        {loadMoreError !== "" ? (
          <Button
            disabled
            className="justify-self-center bg-[#646AE8] dark:bg-[#646AE8] rounded-md col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 w-1/6"
          ></Button>
        ) : (
          <Button
            onClick={handleLoadMore}
            className="justify-self-center bg-[#646AE8] dark:bg-[#646AE8] rounded-md col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 w-1/6"
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
