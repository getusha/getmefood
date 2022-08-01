import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { Routes, Route, useLocation } from "react-router-dom";
import Details from "./Details";
import Home from "./Home";

function App() {
  const [feedFoods, setFeedFoods] = useState([]);

  useEffect(() => {
    function getAllFeed() {
      axios
        .get(`https://themealdb.com/api/json/v1/1/search.php?s=${" "}`)
        .then((result) => {
          console.log(result);
          setFeedFoods((prev) => {
            return result.data.meals;
          });
        });
    }
    getAllFeed();
  }, []);

  function handleSearch(event) {
    let searchTerm = event.target.value;
    axios
      .get(`https://themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((result) => {
        if (result.data.meals !== null) {
          setFeedFoods((prev) => {
            return result.data.meals;
          });
        }
      });
  }

  return (
    <Routes>
      <Route path="/recipe/:id" element={<Details />} />
      <Route
        path="/"
        element={<Home feedFoods={feedFoods} handleSearch={handleSearch} />}
      />
    </Routes>
  );
}

export default App;
