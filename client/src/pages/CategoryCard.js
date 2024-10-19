// CategoryCard.js
import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ image, title, description, link }) => {
  return (
    <div className="col-md-3 menudiv">
      <img className="icons" src={image} alt={title} />
      <h4 className="mt-10">{title}</h4>
      <p>{description}</p>
      <Link to={link} className="rdmore2">
        Explore More
      </Link>
    </div>
  );
};

export default CategoryCard;
