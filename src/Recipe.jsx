import {Link} from "react-router-dom";

export default function Recipe(props) {
  return (
    <>
      <Link onClick={props.something} className="link" to={props.linkPage}>
        <div className="card recipe-container">
          <img src={props.image} alt="food image" className="food-img" />
          <h4 className="food-title">{props.title}</h4>
          <div className="cat-cou">
            <h5 className="country">{props.country}</h5>
            <h5 className="category">{props.category}</h5>
          </div>
        </div>
      </Link>
    </>
  );
}
