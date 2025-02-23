import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function AddRecipeForm({ onRecipeAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split ingredients into an array by commas
    const ingredientsArray = ingredients.split(",").map((ingredient) => ingredient.trim());

    const newRecipe = {
      name,
      description,
      image,
      ingredients: ingredientsArray,
      instructions,
    };

    setLoading(true);

    fetch("https://dummyjson.com/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        onRecipeAdded(data); // Pass the new recipe to the parent component
        // Clear form fields
        setName("");
        setDescription("");
        setImage("");
        setIngredients("");
        setInstructions("");
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to add recipe.");
      });
  };

  return (
    <div>
      <h2>Add a New Recipe</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter recipe description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formIngredients">
          <Form.Label>Ingredients (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter recipe instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Recipe"}
        </Button>
      </Form>
    </div>
  );
}

export default AddRecipeForm;
