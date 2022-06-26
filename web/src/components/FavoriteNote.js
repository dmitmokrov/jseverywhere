import { useState } from "react";
import { useMutation } from "@apollo/client";
import { TOGGLE_FAVORITE } from "../gql/mutation";
import { GET_MY_FAVORITES } from "../gql/query";
import ButtonAsLink from "./ButtonAsLink";

const FavoriteNote = ({ me, noteId, favoriteCount }) => {
  const [count, setCount] = useState(favoriteCount);
  const [favorited, setFavorited] = useState(
    me.favorites.filter((note) => note.id === noteId).length > 0
  );

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: noteId,
    },
    refetchQueries: [{ query: GET_MY_FAVORITES }],
  });

  return (
    <div>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
        >
          Remove Favorite
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
        >
          Add Favorite
        </ButtonAsLink>
      )}
      : {count}
    </div>
  );
};

export default FavoriteNote;
