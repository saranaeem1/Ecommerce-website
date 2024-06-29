import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 mt-5">
        <div className="row justify-content-center mt-5">
          <div className="card w-75 p-3 mb-4">
            <AdminMenu />
          </div>
          <div className="col-md-9 d-flex justify-content-center">
            <div className="card text-black w-75 p-3">
              <h3 className="text-center">Admin Details</h3>
              <hr />
              <h4>Admin Name: {auth?.user?.name}</h4>
              <h4>Admin Email: {auth?.user?.email}</h4>
              <h4>Admin Contact: {auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
