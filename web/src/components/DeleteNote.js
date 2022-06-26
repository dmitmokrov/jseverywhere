import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";
import ButtonAsLink from "./ButtonAsLink";

const DeleteNote = ({ noteId }) => {
  let navigate = useNavigate();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: noteId,
    },
    refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
    onCompleted: () => {
      navigate("/mynotes");
    },
  });
  return <ButtonAsLink onClick={deleteNote}>Delete note</ButtonAsLink>;
};

export default DeleteNote;
