import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_FAVORITES } from "../gql/query";
import NoteFeed from "../components/NoteFeed";

const FavoritesPage = () => {
  useEffect(() => {
    document.title = "Favorites - Notedly";
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data.me.favorites.length) return <NoteFeed notes={data.me.favorites} />;
  return <p>No favorites yet</p>;
}

export default FavoritesPage;
