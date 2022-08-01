import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Details from "./Details";

export default function Home(props) {
  const [passFood, setPassFood] = useState();

  function clickPassData(id) {
    axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result)=>{
        setPassFood(result.data.meals)
        console.log(result.data.meals)
        return <Details title={result.data.meals.idMeal} />
    })
  }

  useEffect(()=>{
    const splash = document.getElementById("splash");
    const mincont = document.getElementById("mid");
    splash.style.transition = "linear 0.5s";
    setTimeout(() => {
      splash.style.display = "none";
      mincont.style.display = "flex";
    }, 2500);
  },[])

  return (
    <>
    <div className="splash" id="splash">
      <div className="fsp">
      <img className="sp-img" src="https://i.pinimg.com/originals/a8/91/61/a891619e066925b716da50cab4c3e3e0.gif" alt="" />
    <p className="load">Loading...</p>
    <p className="myname">Made by Getu</p>
      </div>

    </div>
      <div className="App">
        <div className="top-container">
          <h1 className="main-title">Search Any Food You need</h1>
          <img className="in-img" src="https://cdn-icons-png.flaticon.com/512/5141/5141534.png" alt="" />
          <input
            onChange={props.handleSearch}
            className="main-input"
            type={"text"}
            placeholder={"food...recipes"}
          />
        </div>
        <div className="mid-container d-hidden" id="mid">
          {props.feedFoods !== null &&
            props.feedFoods.map((element, index) => {
              return (
                <>
                  <Recipe
                    something={() => clickPassData(element.idMeal)}
                    linkPage={"/recipe/"+element.idMeal}
                    key={element.idMeal}
                    title={element.strMeal}
                    image={element.strMealThumb+"/preview"}
                    country={element.strArea}
                    category={element.strCategory}
                  />
                </>
              );
            })}
        </div>
      </div>

      <div className="me-cont">
        <p className="me">Made by Getu</p>
      </div>
    </>
  );

}
