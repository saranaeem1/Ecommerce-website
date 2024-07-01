import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import "../../styles/userOrder.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 mt-5">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mt-5">All Orders</h1>
            {orders?.map((o, i) => (
              <div className="border shadow mt-5" key={i}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, j) => (
                    <div className="row mb-2 p-3 card flex-row" key={j}>
                      <div className="col-md-5">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{
                            width: "240px",
                            height: "auto",
                            marginBottom: "10px",
                          }}
                        />
                      </div>
                      <div className="col-md-12">
                        <p style={{ color: "black" }}>{p.name}</p>
                        <p style={{ color: "black", fontSize: "18px" }}>
                          {p.description.substring(0, 60)}...
                        </p>
                        <p style={{ color: "black" }}>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
