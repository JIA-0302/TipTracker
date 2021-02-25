import React from "react";
import Registration from "../components/registration";
import AuthLayout from "../components/layouts/auth-layout";

const Home: React.FunctionComponent = () => {
  return (
    <AuthLayout>
      <Registration />
    </AuthLayout>
  );
};
export default Home;
