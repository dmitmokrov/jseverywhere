import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import NoteForm from "../components/NoteForm";
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";

const EditNotePage = () => {
  useEffect(() => {
    document.title = "Edit Note — Notedly";
  });

  let { id } = useParams();
  let navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_NOTE, {
    variables: { id },
  });
  const { data: userData } = useQuery(GET_ME);
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      navigate(`/note/${id}`);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Note not found</p>;
  if (userData?.me?.id !== data?.note?.author?.id)
    return <p>You do not have access to edit this note</p>;
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNotePage;
