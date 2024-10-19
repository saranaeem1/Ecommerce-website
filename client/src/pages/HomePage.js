import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import "../styles/Homepage.css";
import ProductCard from "./ProductCard";
import MenuSection from "./MenuSection";
import FeedbackForm from "./FeedbackForm";
import { validateFeedbackForm } from "../utils/validation";

const HomePage = () => {
  // State for feedback form
  const [feedbackType, setFeedbackType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  const [auth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs using utility function
    const errors = validateFeedbackForm({ name, email, phone, details });
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }

    // Check if user is authenticated
    if (!auth.user) {
      toast.error("Please sign in to submit feedback");
      return;
    }

    try {
      const feedbackData = { type: feedbackType, name, email, phone, details };
      const response = await axios.post(
        "/api/v1/feedback/submit",
        feedbackData
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        setFeedbackType("");
        setName("");
        setEmail("");
        setPhone("");
        setDetails("");
      } else {
        toast.error(response.data.error || "Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <div className="mainflex">
        <div className="flex1">
          <h1 className="mainh">
            Indulge in
            <span className="red"> Pasta on the Plate!</span>
          </h1>
          <p className="mainp">
            Embark on a culinary journey like no other with our premier
            ecommerce pasta shop. Offering an enticing array of handcrafted
            pasta delicacies, we invite you to savor the authentic flavors of
            Italy from the comfort of your home. From traditional classics to
            innovative creations, each artisanal pasta is meticulously crafted
            using only the finest ingredients, promising a gastronomic
            experience that tantalizes the taste buds.
          </p>
          <button className="mainbtn">
            <Link to="/categories" className="btnlink">
              Order Now
            </Link>
          </button>
        </div>
        <div className="flex2"></div>
        <img className="img1" src="/images/img1.png" />
      </div>

      <MenuSection />

      <div className="mainflex">
        <div className="flex1">
          <img className="img2" src="/images/imgorder1.jpeg" />
        </div>
        <div className="flex2">
          <img className="img2" src="/images/imgorder2.jpeg" />
        </div>
      </div>

      <div className="imgcentre">
        <img className=" img3" src="/images/free.jpeg" />
      </div>

      <div className="flex_main2h2">
        <h1>Want help? Wanna Leave a review?</h1>
        <p>Tell us more about your queries or give us feedback..</p>
      </div>

      <div className="flexescontainer">
        <div className="left-div">
          <img src="/images/12.gif" alt="Your Image" />
        </div>

        <div className="right-div">
          <FeedbackForm
            feedbackType={feedbackType}
            setFeedbackType={setFeedbackType}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            details={details}
            setDetails={setDetails}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <ProductCard />
    </Layout>
  );
};

export default HomePage;
