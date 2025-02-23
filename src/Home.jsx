import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Container className="text-center">
        <Row>
          <Col>
            <h1>Welcome to the Recipe App!</h1>
            <p>Browse through various recipes and manage them.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
