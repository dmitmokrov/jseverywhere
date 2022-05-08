import { useQuery, gql } from "@apollo/client";
import NoteFeed from "../components/NoteFeed";
import Button from "../components/Button";

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

const HomePage = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor,
              },
            });
          }}
        >
          Load more
        </Button>
      )}
    </>
  );
};

export default HomePage;
