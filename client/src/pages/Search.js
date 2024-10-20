import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import "../styles/Search.css";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container mt-2 Search">
        <div className="text-center">
          <h1></h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                  <h5 className="card-title ">{p.name}</h5>
                  <p className="card-text price"> $ {p.price}</p>
                  </div>
                  <p className="card-text para">
                    {p.description.substring(0, 70)}...
                  </p>
                  
                  <div className="card-name-price">
                  <button class="btn btn-danger ms-1 adddetails">More Details</button>
                  <button class="btn btn-dark ms-1 addtocart">ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
