import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import UserForm from "../components/UserForm";
import { IS_LOGGED_IN } from "../gql/query";

const SINGUP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up - Notedly";
  });

  let navigate = useNavigate();
  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SINGUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signUp);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      navigate("/");
    },
  });

  return (
    <>
      <UserForm formType="signup" action={signUp} />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </>
  );
};

export default SignUpPage;
