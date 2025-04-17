import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";

export function Header() {
  return (
    <Container as="header" fluid className="p-3 bg-primary">
      <Row>
        <Col className="fs-4 fw-bold text-white">Cloud Telecom Carrier</Col>

        <Col className="text-end">
          <div className="d-flex align-items-center justify-content-end gap-1">
            <span className="text-secondary">Usuário:</span>
            <span className="text-white">guilhermeribas</span>

            <Button variant="link" className="text-danger text-nowrap fw-bold">
              <span className="me-1">Sair</span>
              <AiOutlineLogout />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
