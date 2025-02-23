import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DeleteRecipeButton({ recipeId, onRecipeDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      setLoading(true);

      fetch(`https://dummyjson.com/recipes/${recipeId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete recipe.");
          }
          return res.json();
        })
        .then(() => {
          setLoading(false);
          onRecipeDeleted(recipeId); // Notify parent component that the recipe is deleted
          navigate("/"); // Redirect to the home page or another appropriate page
        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to delete recipe.");
        });
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="danger" onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Recipe"}
      </Button>
    </div>
  );
}

export default DeleteRecipeButton;
