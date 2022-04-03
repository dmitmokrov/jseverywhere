import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";

export default function Pages() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Layout>
  );
}
