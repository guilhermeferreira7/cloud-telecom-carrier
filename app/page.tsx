"use client";

import { useRouter } from "next/navigation";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export default function IndexPage() {
  const router = useRouter();

  return (
    <Container
      fluid
      className="d-flex min-vh-100 align-items-center justify-content-center"
    >
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <Card className="p-3">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Usuário ou email</Form.Label>

                <Form.Control type="username" placeholder="email@exemplo.com" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>

                <Form.Control type="password" placeholder="********" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Manter conectado" />
              </Form.Group>

              <Button
                variant="primary"
                className="w-100"
                onClick={() => router.push("/home")}
              >
                Entrar
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
