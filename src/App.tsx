/*  */
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Layout from "./layout/Layout";
import HomePage from "./pages/Home/HomePage";
import ListLinksPage from "./pages/ListLinks/ListLinksPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="list-links" element={<ListLinksPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
