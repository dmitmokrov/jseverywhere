import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import HomePage from "./HomePage";
import MyNotesPage from "./MyNotesPage";
import FavoritesPage from "./FavoritesPage";
import NotePage from "./NotePage";

export default function Pages() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/mynotes" element={<MyNotesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </Layout>
  );
}
