import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load recipe.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Card>
      <Card.Img variant="top" src={recipe.image} alt={recipe.name} />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Card.Text><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</Card.Text>
        <Card.Text><strong>Instructions:</strong> {recipe.instructions}</Card.Text>
        <Button variant="secondary" onClick={() => window.history.back()}>Go Back</Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeDetails;
