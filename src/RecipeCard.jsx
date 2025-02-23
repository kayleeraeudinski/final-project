import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={recipe.image} alt={recipe.name} />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Link to={`/recipe/${recipe.id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;