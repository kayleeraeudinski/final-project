import React from "react";
import { Alert } from "react-bootstrap";

function ErrorMessage({ message }) {
  return (
    <Alert variant="danger" className="mt-4">
      <Alert.Heading>Error</Alert.Heading>
      <p>{message || "Something went wrong. Please try again later."}</p>
    </Alert>
  );
}

export default ErrorMessage;
