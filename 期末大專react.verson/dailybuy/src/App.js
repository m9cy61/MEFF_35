import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Productinfo from "./views/product_info.jsx";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Header from './views/header.js'
import Agreement from "./views/agreement";

function App() {
  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
  });
  return (
    <>
<Header/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Productinfo />} exact/>
        <Route path="/Agreement" element={<Agreement />} exact/>
      </Routes>
    </BrowserRouter>
    </>
  );
}
function Home() {
  return <h1>Welcome to the homepage</h1>;
}
export default App;
