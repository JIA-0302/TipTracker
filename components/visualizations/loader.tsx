import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => (
  <Spinner animation="border" role="status" className="align-self-center">
    <span className="sr-only">Loading...</span>
  </Spinner>
);

export default Loader;
