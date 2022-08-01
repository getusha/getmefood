import "./App.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Details(props) {
  let ingArr = [];
  let amnArr = [];
  const [mealDetail, setMealDetail] = useState("");
  const [ingridentList, setIngridents] = useState([]);
  const [ytVideo, setYtVideo] = useState("");

  const location = useLocation();
  const currentLocation = location.pathname;
  ///recipe/98787
  const mealID = currentLocation.slice(8, currentLocation.length);
  console.log(mealID);

  useEffect(() => {
    axios
      .get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then((result) => {
        setMealDetail((prev) => {
          console.log(result.data.meals);
          return result.data.meals[0];
        });
      });
  }, []);

  function ingridents() {
    const n = 1;
    const n1 = `${`strIngredient`}${1}`;
    for (let i = 1; i < 20; i++) {
      console.log(mealDetail[`${`strIngredient`}${i}`]);
      ingArr.push(mealDetail[`${`strIngredient`}${i}`]);
      amnArr.push(mealDetail[`${`strMeasure`}${i}`]);
    }

    // setIngridents((prev)=>{
    //     return ingArr;
    // })
  }
  ingridents();


  setTimeout(() => {
    console.log(mealDetail.strYoutube);
    setYtVideo(mealDetail.strYoutube.replace("watch?v=", "embed/"))
  }, 3000);

  return (
    <>
      <div className="d-container-all">
        <div className="recipe-d">
          <div className="card recipe-inside">
            {console.log(mealDetail)}

            <h1 className="d-title">{mealDetail.strMeal}</h1>
            <span className="s-title">Ingridents</span>

            <ul>
              {ingArr.map((element, index) => {
                return (
                  <>
                    {element != "" && (
                      <>
                        <div className="ing-cont">
                          <li>{element}</li>
                          <span className="ing-amount">{amnArr[index]}</span>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
            </ul>

            <span className="s-title">Instruction</span>
            <p className="instruction">{mealDetail.strInstructions}</p>
          </div>
        </div>

        <div className="v-contents">
          <div className="card v-inside">
            <img className="i-img" src={mealDetail.strMealThumb} alt="" />
            <h2>Video Instruction</h2>
            <div className="holdit">
              <div className="video-container">
                <iframe
                  src={ytVideo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
