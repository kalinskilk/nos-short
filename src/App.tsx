/*  */
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./layout/Layout";
import HomePage from "./pages/Home/HomePage";
import ListLinksPage from "./pages/ListLinks/ListLinksPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="list-links" element={<ListLinksPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
