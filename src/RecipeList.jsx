import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="row">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="col-md-4 mb-4">
          <Card>
            <Card.Img variant="top" src={recipe.image} alt={recipe.name} />
            <Card.Body>
              <Card.Title>{recipe.name}</Card.Title>
              <Card.Text>{recipe.description}</Card.Text>
              <Link to={`/recipe/${recipe.id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
