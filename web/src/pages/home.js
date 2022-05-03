import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

import NoteFeed from "../components/NoteFeed";

const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      hasNextPage
      cursor
      notes {
        id
        content
        createdAt
        favoriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <div>
      <NoteFeed notes={data.noteFeed.notes} />
    </div>
  );
};

export default Home;
