import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

function EditRecipeForm({ onRecipeUpdated }) {
  const { id } = useParams(); // Recipe ID from the URL
  const navigate = useNavigate(); // For navigation after successful update
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    // Fetch the existing recipe details when the component mounts
    setLoading(true);
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setName(data.name);
        setDescription(data.description);
        setImage(data.image);
        setIngredients(data.ingredients.join(", "));
        setInstructions(data.instructions);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load recipe details.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split ingredients into an array
    const ingredientsArray = ingredients.split(",").map((ingredient) => ingredient.trim());

    const updatedRecipe = {
      name,
      description,
      image,
      ingredients: ingredientsArray,
      instructions,
    };

    setLoading(true);

    fetch(`https://dummyjson.com/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        onRecipeUpdated(data); // Notify the parent to update the recipe list
        navigate(`/recipe/${id}`); // Redirect to the recipe details page after successful update
      })
      .catch((error) => {
        setLoading(false);
        setError("Failed to update recipe.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>Edit Recipe</h2>
      {recipe && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              type="text"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formIngredients">
            <Form.Label>Ingredients (comma-separated)</Form.Label>
            <Form.Control
              type="text"
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
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      )}
    </div>
  );
}

export default EditRecipeForm;
