import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import Note from "../components/Note";

const GET_NOTE = gql`
  query Note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        id
        username
        avatar
      }
    }
  }
`;

const NotePage = () => {
  let { id } = useParams();
  const { data, loading, error } = useQuery(GET_NOTE, {
    variables: { id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error! Note not found</p>;
  }
  return <Note note={data.note} />;
};

export default NotePage;
