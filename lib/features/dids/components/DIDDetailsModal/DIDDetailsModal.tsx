import { Button, Modal } from "react-bootstrap";

type DIDDetailsModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  did: any;
};

export function DIDDetailsModal({
  isModalOpen,
  setIsModalOpen,
  did,
}: DIDDetailsModalProps) {
  return (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
      <Modal.Header>
        <Modal.Title>Detalhes</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <span className="fw-bold">ID:</span> {did.id}
        </p>

        <p>
          <span className="fw-bold">Número:</span> {did.value}
        </p>

        <p>
          <span className="fw-bold">Custo de compra:</span> {did.currency}{" "}
          {did.setupPrice}
        </p>

        <p>
          <span className="fw-bold">Custo mensal:</span> {did.currency}{" "}
          {did.monthlyPrice}
        </p>

        <p>
          <span className="fw-bold">Criado em:</span>{" "}
          {new Date("2025-04-10 12:00:00").toLocaleString()}
        </p>

        <p>
          <span className="fw-bold">Última alteração:</span>{" "}
          {new Date("2025-04-10 12:00:00").toLocaleString()}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
