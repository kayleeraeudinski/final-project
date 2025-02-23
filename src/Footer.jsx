import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Recipe App. All rights reserved.</p>
            <p>
              <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="text-white">
                GitHub
              </a>{" "}
              |{" "}
              <a href="https://www.linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="text-white">
                LinkedIn
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
