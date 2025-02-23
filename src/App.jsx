import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home"; 
import RecipeDetails from "./RecipeDetails"; 
import AddRecipeForm from "./AddRecipeForm"; 
import EditRecipeForm from "./EditRecipeForm"; 
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 
import ManageRecipes from "./ManageRecipes"; // Import ManageRecipes component


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/add" element={<AddRecipeForm />} />
          <Route path="/edit/:id" element={<EditRecipeForm />} />
          <Route path="/manage" element={<ManageRecipes />} /> {/* Add route for ManageRecipes */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
