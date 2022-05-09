import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import Layout from "../components/Layout";
import HomePage from "./HomePage";
import MyNotesPage from "./MyNotesPage";
import FavoritesPage from "./FavoritesPage";
import NotePage from "./NotePage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";

const IS_LOGGED_IN_LOCAL = gql`
  {
    isLoggedIn @client
  }
`;

const PrivateRoute = () => {
  let location = useLocation();
  const { loading, error, data } = useQuery(IS_LOGGED_IN_LOCAL);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data.isLoggedIn) return <Outlet />;

  return <Navigate to="/signin" state={{ from: location }} replace={true} />;
};

const Pages = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/mynotes" element={<PrivateRoute />}>
          <Route element={<MyNotesPage />} />
        </Route>
        <Route path="/favorites" element={<PrivateRoute />}>
          <Route element={<FavoritesPage />} />
        </Route>
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Layout>
  );
};

export default Pages;
