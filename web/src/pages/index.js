import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Layout from "../components/Layout";
import HomePage from "./HomePage";
import MyNotesPage from "./MyNotesPage";
import FavoritesPage from "./FavoritesPage";
import NotePage from "./NotePage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import NewNotePage from "./NewNotePage";
import { IS_LOGGED_IN_LOCAL } from "../gql/query";

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
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/mynotes" element={<MyNotesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/new" element={<NewNotePage />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default Pages;
