import React, { useState } from "react";
import { queryQuads } from "../services/api";

function QueryForm() {
  const [query, setQuery] = useState({
    subject: "",
    predicate: "",
    object: "",
    graph: "",
  });
  const [results, setResults] = useState([]);
  const [executionTime, setExecutionTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const handleQuery = async () => {
    setError("");
    setResults([]);
    setLoading(true);

    const startTime = performance.now();
    try {
      // Remove empty fields from the query object
      const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(([_, value]) => value.trim() !== "")
      );

      const response = await queryQuads(filteredQuery, page, 10);
      const endTime = performance.now();

      setResults(response.content);
      setExecutionTime(
        `Execution time: ${(endTime - startTime).toFixed(2)} ms`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h3 className="mb-3">Query Quads</h3>
      {["Subject", "Predicate", "Object", "Graph"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label">{field}</label>
          <input
            type="text"
            className="form-control"
            placeholder={`Enter ${field}`}
            onChange={(e) =>
              setQuery({ ...query, [field.toLowerCase()]: e.target.value })
            }
          />
        </div>
      ))}
      <button
        className="btn btn-primary mb-3"
        onClick={handleQuery}
        disabled={loading}
      >
        {loading ? "Loading..." : "Query"}
      </button>
      {executionTime && (
        <div className="alert alert-info p-2">{executionTime}</div>
      )}
      {error && <div className="alert alert-danger p-2">{error}</div>}
      {results.length > 0 && (
        <div className="mt-3">
          <h5>Results:</h5>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Predicate</th>
                <th>Object</th>
                <th>Graph</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index}>
                  <td>{item.subject}</td>
                  <td>{item.predicate}</td>
                  <td>{item.object}</td>
                  <td>{item.graph}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QueryForm;
