import React from "react";
import Login from "../components/login";
import AuthLayout from "../components/layouts/auth-layout";

const Home: React.FunctionComponent = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};
export default Home;
