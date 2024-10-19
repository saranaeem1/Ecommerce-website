import React, { useState, useEffect, useMemo } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price using useMemo for performance optimization
  const totalPrice = useMemo(() => {
    try {
      return cart
        .reduce((total, item) => total + item.price, 0)
        .toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    } catch (error) {
      toast.error("Error calculating total price.");
      return 0; // Fallback to 0 if an error occurs
    }
  }, [cart]);

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = cart.filter((item) => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      toast.error("Error removing item from cart.");
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      toast.error("Error fetching payment gateway token.");
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully!");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="container">
          <div className="row container-fluid">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="card" key={p._id}>
                  <div className="col-md-6 d-flex flex-wrap container-fluid">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img"
                      alt={p.name}
                      width="100%"
                    />
                  </div>
                  <div className="col-md-7 container-fluid">
                    <p>{p.name}</p>
                    <p>Price: ${p.price}</p>
                  </div>
                  <button
                    style={{ marginLeft: "70px", width: "150px" }}
                    className="btn btn-danger remove"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice}</h4>
              {auth?.user?.address ? (
                <div className="mb-3 addresscard">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-danger addressupdate"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3 addresscard">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-danger addressupdate"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-danger"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
