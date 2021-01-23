import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div className="jumbotron1 h1 p-4 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 mt-4 mb-3 h2 font-weight-bold  jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />

      <h6 className="text-center p-3 mt-4 mb-3 h2 font-weight-bold jumbotron">
        Best Sellers
      </h6>
      <BestSellers />

      <h6 className="text-center p-3 mt-4 mb-5 h2 font-weight-bold jumbotron">
        Categories
      </h6>
      <CategoryList />

      <h6 className="text-center p-3 mt-4 mb-5 h2 font-weight-bold jumbotron">
        Sub Categories
      </h6>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
