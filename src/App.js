import * as React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import DetailsPage from "./features/detailsPage.js";
import Home from "./features/home.js";
import ListPage from "./features/listPage.js";
import PageNotFound from "./common/PageNotFound";

function App() {
  return (
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<ListPage />} />
        </Route>
        <Route path="home" element={<Home/>}></Route>
        <Route path="details-page/:movieID" element={<DetailsPage />}>

        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
