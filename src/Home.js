import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
const Home = () => {
  return (
    <div className="home">
      <h1>welcome to my CRUD operation apps.</h1>
      <Link to="/products">
        <Button className="mt-3 py-3 px-5"> Go to your product page</Button>
      </Link>
    </div>
  );
};

export default Home;
