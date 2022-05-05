import styled from "styled-components";
import { Link } from "react-router-dom";

import Note from "./Note";

const NoteList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const NoteWrapper = styled.li`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

const NoteFeed = ({ notes }) => {
  return (
    <NoteList>
      {notes.map((note) => (
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <Link to={`note/${note.id}`}>Permalink</Link>
        </NoteWrapper>
      ))}
    </NoteList>
  );
};

export default NoteFeed;
