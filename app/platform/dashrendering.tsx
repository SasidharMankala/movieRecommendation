"use client";

import { useAppSelector } from "@/lib/hooks";
import Trending from "./sidebar/trending";
import Recommendation from "./sidebar/recommendation";
import Profile from "./sidebar/profile";
import Preferences from "./sidebar/preferences";
import MovieDetails from "./sidebar/movieDetails";

const DashRendering = () => {
  const screen = useAppSelector((state) => state.selections.value);
  
  const renderComponent = () => {
    switch (screen) {
      case "trending":
        return <Trending />;
      case "recommendation":
        return <Recommendation />;
      case "profile":
        return <Profile />;
      case "preference":
        return <Preferences />;
      case "movie":
        return <MovieDetails />;

      default:
        return <Trending />;
    }
  };

  return <>{renderComponent()}</>;
};

export default DashRendering;
