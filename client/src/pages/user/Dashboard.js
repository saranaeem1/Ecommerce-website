import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 mt-5">
            <UserMenu />
          </div>
          <div className="col-md-9 mt-5">
            <div className="card p-3 ">
              <h3 className="text-black">Name: {auth?.user?.name}</h3>
              <h3 className="text-black">Email: {auth?.user?.email}</h3>
              <h3 className="text-black">Address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
