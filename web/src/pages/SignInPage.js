import { useApolloClient, useMutation, gql } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { IS_LOGGED_IN } from "../gql/query";

const SINGIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignInPage = () => {
  useEffect(() => {
    document.title = "Sign In - Notedly";
  });

  let navigate = useNavigate();
  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SINGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      navigate('/');
    }
  });

  return (
    <>
      <UserForm formType="signin" action={signIn} />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </>
  );
};

export default SignInPage;
