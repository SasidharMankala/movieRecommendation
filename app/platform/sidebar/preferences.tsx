"use client";

import { JSX, useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { getCookie, setCookie } from "cookies-next/client";
import { useDispatch } from "react-redux";
import { selection } from "@/lib/features/dashBoardScreen";

interface Item {
  id: number;
  name: string;
}
interface Actor {
  id: number;
  name: string;
  gender: number;
}

export default function Preferences(): JSX.Element | null {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedDirectors, setSelectedDirectors] = useState<number[]>([]);
  const [selectedActors, setSelectedActors] = useState<number[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const genres: Item[] = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  useEffect(() => {
    const selected_genres = getCookie("selected_genres");
    const selected_actors = getCookie("selected_actors");
    if (selected_genres || selected_actors) {
      dispatch(selection("recommendation"));
    }
  });

  useEffect(() => {
    setLoading(true);
    const fetchRoadmaps = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/actors`);
      const data = await res.json();
      setActors(data);
      setLoading(false);
    };
    fetchRoadmaps().catch((error) => {
      console.error("Failed to fetch actors:", error);
      setLoading(false);
    });
  }, []);

  const directors: Item[] = [
    { id: 1, name: "Christopher Nolan" },
    { id: 2, name: "Hayao Miyazaki" },
    { id: 3, name: "Quentin Tarantino" },
    { id: 4, name: "James Cameron" },
    { id: 5, name: "Alfred Hitchcock" },
    { id: 6, name: "Ridley Scott" },
    { id: 7, name: "David Lynch" },
    { id: 8, name: "Stanley Kubrick" },
  ];

  const toggleGenre = (id: number): void => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const toggleDirector = (id: number): void => {
    if (selectedDirectors.includes(id)) {
      setSelectedDirectors(
        selectedDirectors.filter((directorId) => directorId !== id)
      );
    } else {
      setSelectedDirectors([...selectedDirectors, id]);
    }
  };

  const toggleActor = (id: number): void => {
    if (selectedActors.includes(id)) {
      setSelectedActors(selectedActors.filter((actorId) => actorId !== id));
    } else {
      setSelectedActors([...selectedActors, id]);
    }
  };

  const isFormValid =
    selectedGenres.length > 0 &&
    selectedDirectors.length > 0 &&
    selectedActors.length > 0;

  const handleContinue = async (): Promise<void> => {
    if (!isFormValid) {
      setError(
        "Please select at least one Genre, one Director, and one Actor."
      );
      return;
    }
    setError("");
    console.log({
      selectedGenres: genres
        .filter((g) => selectedGenres.includes(g.id))
        .map((g) => g.name),
      selectedDirectors: directors
        .filter((d) => selectedDirectors.includes(d.id))
        .map((d) => d.name),
      selectedActors: actors
        .filter((a) => selectedActors.includes(a.id))
        .map((a) => a.name),
    });

    console.log(selectedActors, selectedGenres);
    const selected = {
      selected_genres: selectedGenres.toString(),
      selected_actors: selectedActors.toString(),
    };
    setCookie("selected_genres", selectedGenres.toString());
    setCookie("selected_actors", selectedActors.toString());
    console.log(selected);
    dispatch(selection("recommendation"));
  };

  return (
    <div className="container px-10 py-16">
      <h1 className="text-gray-500 dark:text-gray-400 text-2xl font-bold mb-6">
        Help us to personalize your experience better by providing your
        preferences!
      </h1>

      <div className="mb-8">
        <h2 className=" mb-4 text-gray-500 dark:text-gray-400">
          Select genres that you are interested.
        </h2>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`px-4 py-2 rounded-lg border ${
                selectedGenres.includes(genre.id)
                  ? "bg-indigo-100 border-indigo-400 text-indigo-700"
                  : "border-gray-300 text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-700"
              }`}
              onClick={() => toggleGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className=" mb-4 text-gray-500 dark:text-gray-400">
          Select directors you like.
        </h2>
        <div className="flex flex-wrap gap-2">
          {loading ? (
            <Spinner />
          ) : (
            directors.map((director) => (
              <button
                key={director.id}
                className={`px-4 py-2 rounded-lg border ${
                  selectedDirectors.includes(director.id)
                    ? "bg-indigo-100 border-indigo-400 text-indigo-700"
                    : "border-gray-300 text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-700"
                }`}
                onClick={() => toggleDirector(director.id)}
              >
                {director.name}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className=" mb-4 text-gray-500 dark:text-gray-400">
          Select actors you like.
        </h2>
        <div className="flex flex-wrap gap-2">
          {loading ? (
            <Spinner />
          ) : (
            actors.map((actor: Actor) => (
              <button
                key={actor.id}
                className={`px-4 py-2 rounded-lg border ${
                  selectedActors.includes(actor.id)
                    ? "bg-indigo-100 border-indigo-400 text-indigo-700"
                    : "border-gray-300 text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-700"
                }`}
                onClick={() => toggleActor(actor.id)}
              >
                {actor.name}
              </button>
            ))
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex justify-end">
        <Button
          className="text-white rounded-lg bg-[#646AE8] dark:bg-[#646AE8] hover:bg-indigo-700 flex items-center"
          onClick={handleContinue}
        >
          Continue
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
