import styled from "styled-components";
import { useState } from "react";

import Button from "./Button";

const NoteForm = ({ content = "", action }) => {
  const [values, setValues] = useState({ content });
  const onSubmit = (event) => {
    event.preventDefault();
    action({
      variables: {
        ...values,
      },
    });
  };
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <TextArea
          value={values.content}
          type="text"
          name="content"
          placeholder="Note content"
          required
          onChange={onChange}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`;

export default NoteForm;
