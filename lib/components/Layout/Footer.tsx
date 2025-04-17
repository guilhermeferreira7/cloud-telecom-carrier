import { Container } from "react-bootstrap";

export function Footer() {
  return (
    <Container
      as="footer"
      fluid
      className="p-3 text-center text-white bg-primary"
    >
      <p>Desafio 3CPlus • React + Redux Toolkit</p>
      <p>&copy; 2025 – Todos os direitos reservados.</p>
    </Container>
  );
}
