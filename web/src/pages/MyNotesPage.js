import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_NOTES } from "../gql/query";
import NoteFeed from "../components/NoteFeed";

const MyNotesPage = () => {
  useEffect(() => {
    document.title = "My Notes — Notedly";
  });

  const { loading, error, data } = useQuery(GET_MY_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data.me.notes.length) return <NoteFeed notes={data.me.notes} />;
  return <p>No notes yet</p>;
};

export default MyNotesPage;
