import React, { useState } from "react";
import { insertQuad } from "../services/api";

function QuadInsertForm() {
  const [quad, setQuad] = useState({
    subject: "",
    predicate: "",
    object: "",
    graph: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Call the API to insert the Quad
      const response = await insertQuad(quad);

      // Check if the response object exists
      if (response && response.id) {
        setMessage(`Quad inserted successfully!`);
        setQuad({ subject: "", predicate: "", object: "", graph: "" }); // Reset form fields
      } else {
        setError("Failed to insert Quad: Unexpected response from the server.");
      }
    } catch (err) {
      // Handle API or network errors
      console.error("Error inserting Quad:", err.message || err);
      setError(
        `Failed to insert Quad: ${
          err.message || "An unexpected error occurred."
        }`
      );
    }
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h3 className="mb-3">Insert Quad</h3>
      <form onSubmit={handleSubmit}>
        {["Subject", "Predicate", "Object", "Graph"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input
              type="text"
              className="form-control"
              placeholder={`Enter ${field}`}
              value={quad[field.toLowerCase()]}
              onChange={(e) =>
                setQuad({ ...quad, [field.toLowerCase()]: e.target.value })
              }
              required
            />
          </div>
        ))}
        <button className="btn btn-success" type="submit">
          Insert Quad
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default QuadInsertForm;
