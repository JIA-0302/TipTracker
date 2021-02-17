import React from "react";
import Registration from "../components/registration";
import PrivateLayout from "../components/layouts/private-layout";

const Home: React.FunctionComponent = () => {
    return (
        <PrivateLayout>
        <Registration/>
        </PrivateLayout>
    );
};
export default Home;
