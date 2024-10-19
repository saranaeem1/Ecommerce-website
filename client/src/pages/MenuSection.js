import React from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";

const MenuSection = () => {
  return (
    <>
      <div className="menudivs">
        <h1>Our Menu</h1>
      </div>
      <div className="menudivs">
        <div className="col-md-3 menudiv">
          <img className="icons" src="/images/pasta.jpg" />
          <br />
          <br />
          <h4 className="mt-10">Exquisite Pasta Creations</h4>
          <p>
            Indulge in the timeless flavors of Italy with our handcrafted pasta
            delicacies, meticulously prepared using the finest ingredients.
          </p>
          <Link to="/category/pasta" className="rdmore2">
            Explore More
          </Link>
        </div>

        <div className="col-md-3 menudiv">
          <img className="icons" src="/images/sandwiches.jpg" />
          <br />
          <br />
          <h4>Sandwiches</h4>
          <p>
            Experience the flavour of our perfect sandwiches, delivering a burst
            of flavor in every bite.
          </p>
          <br />
          <Link to="/category/sandwiches" className="rdmore2">
            Explore More
          </Link>
        </div>
      </div>

      <div className="menudivs">
        <div className="col-md-3 menudiv">
          <img className="icons" src="/images/chowmein.jfif" />
          <br />
          <br />
          <h4>Irresistible Chowmein</h4>
          <p>
            Delight your senses with our savory chowmein, expertly crafted with
            a medley of aromatic spices and fresh ingredients.
          </p>
          <Link to="/category/chowmein" className="rdmore2">
            Explore More
          </Link>
        </div>

        <div className="col-md-3 menudiv">
          <img className="icons" src="/images/soups.jpg" />
          <br />
          <br />
          <h4>Soups</h4>
          <p>
            Explore our diverse selection of soups crafted that span a world of
            culinary traditions and ingredients.
          </p>
          <Link to="/category/soups" className="rdmore2">
            Explore More
          </Link>
        </div>
      </div>

      <div className="menudivs">
        <div className="col-md-3 menudiv">
          <img className="icons" src="/images/desserts.jfif" />
          <br />
          <br />
          <h4>Desserts</h4>
          <p>
            Explore our delectable assortment of desserts crafted with passion
            and precision to satisfy your sweet tooth.
          </p>
          <Link to="/category/desserts" className="rdmore2">
            Explore More
          </Link>
        </div>

        <div className="col-md-3 menudiv">
          <img className="icons" src="/images/beverages.jfif" />
          <br />
          <br />
          <h4>Refreshing Beverages</h4>
          <p>
            Quench your thirst with our refreshing selection of beverages,
            ranging from energizing juices to soothing teas.
          </p>
          <Link to="/category/drinks" className="rdmore2">
            Explore More
          </Link>
        </div>
      </div>

      <div className="menudivs container-fluid">
        <button className="explorebtn container-fluid">
          <Link to="/categories" className="btnlink">
            Explore more
          </Link>
        </button>
        <br /> <br />
      </div>
    </>
  );
};

export default MenuSection;
