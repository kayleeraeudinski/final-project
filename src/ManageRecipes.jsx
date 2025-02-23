import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import DeleteRecipeButton from "./DeleteRecipeButton";

function ManageRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of recipes
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load recipes.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Manage Recipes</h2>
      <Row>
        {recipes.map((recipe) => (
          <Col key={recipe.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image} alt={recipe.name} />
              <Card.Body>
                <Card.Title>{recipe.name}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <Link to={`/edit/${recipe.id}`}>
                  <Button variant="primary" className="mr-2">
                    Edit
                  </Button>
                </Link>
                <DeleteRecipeButton
                  recipeId={recipe.id}
                  onRecipeDeleted={(id) =>
                    setRecipes((prevRecipes) =>
                      prevRecipes.filter((recipe) => recipe.id !== id)
                    )
                  }
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ManageRecipes;
