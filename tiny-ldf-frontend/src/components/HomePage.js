import React from "react";
import QuadInsertForm from "./QuadInsertForm";
import QueryForm from "./QueryForm";

const HomePage = () => {
  return (
    <div className="container mt-4">
      <h2>Home Page</h2>
      <QuadInsertForm />
      <QueryForm />
    </div>
  );
};

export default HomePage;
