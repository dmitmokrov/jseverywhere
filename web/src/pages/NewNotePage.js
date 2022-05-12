import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";
import { GET_NOTES, GET_MY_NOTES } from "../gql/query";

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        id
        username
      }
    }
  }
`;

const NewNotePage = () => {
  useEffect(() => {
    document.title = "New Note - Notedly";
  });

  let navigate = useNavigate();
  const [createNewNote, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
    onCompleted: (data) => {
      navigate(`/note/${data.newNote.id}`);
    },
  });

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={createNewNote} />
    </>
  );
};

export default NewNotePage;
