import React from "react";
import Layout from "../components/Layout/Layout";
import CategoryCard from "./CategoryCard";

const categoryData = [
  {
    image: "/images/pasta.jpg",
    title: "Exquisite Pasta Creations",
    description:
      "Indulge in the timeless flavors of Italy with our handcrafted pasta delicacies, meticulously prepared using the finest ingredients.",
    link: "/category/pasta",
  },
  {
    image: "/images/sandwiches.jpg",
    title: "Sandwiches",
    description:
      "Experience the flavour of our perfect sandwiches, delivering a burst of flavor in every bite.",
    link: "/category/sandwiches",
  },
  {
    image: "/images/chowmein.jfif",
    title: "Irresistible Chowmein",
    description:
      "Delight your senses with our savory chowmein, expertly crafted with a medley of aromatic spices and fresh ingredients.",
    link: "/category/chowmein",
  },
  {
    image: "/images/soups.jpg",
    title: "Soups",
    description:
      "Explore our diverse selection of soups crafted that span a world of culinary traditions and ingredients.",
    link: "/category/soups",
  },
  {
    image: "/images/desserts.jfif",
    title: "Desserts",
    description:
      "Explore our delectable assortment of desserts crafted with passion and precision to satisfy your sweet tooth.",
    link: "/category/desserts",
  },
  {
    image: "/images/beverages.jfif",
    title: "Refreshing Beverages",
    description:
      "Quench your thirst with our refreshing selection of beverages, ranging from energizing juices to soothing teas.",
    link: "/category/drinks",
  },
];

const Categories = () => {
  return (
    <Layout title="Our Menu">
      <div className="menudivs mt-5">
        <h1>Categories</h1>
      </div>
      <div className="menudivs">
        <div className="row">
          {categoryData.map((category, index) => (
            <CategoryCard
              key={index}
              image={category.image}
              title={category.title}
              description={category.description}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
