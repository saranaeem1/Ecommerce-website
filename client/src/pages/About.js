import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus mt-5 ">
        <div className="col-md-6 ">
          <img
          className="mt-5"
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
          At Pasta on the Plate, we're passionate about crafting culinary experiences that celebrate the artistry and flavors of authentic Italian cuisine. Our journey began with a simple yet profound love for pasta – a staple of Italian gastronomy that embodies tradition, creativity, and the joy of sharing meals with loved ones.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
