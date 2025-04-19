import { FormEvent, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "@/lib/components/Spinner/Spinner";
import { AppDispatch, RootState } from "@/lib/store";

import { deleteDID } from "@/lib/features/dids/actions";
import { DID } from "@/lib/features/dids/types";

type DIDDeleteModalProps = {
  did: DID;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
};

export function DIDDeleteModal({
  did,
  isModalOpen,
  setIsModalOpen,
}: DIDDeleteModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { deletingId } = useSelector((state: RootState) => state.dids);

  const [error, setError] = useState<string | null>();

  function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    if (formDataObj.number !== did.value) {
      setError("Número incorreto, tente novamente.");
      return;
    }

    dispatch(deleteDID(did.id));
  }

  return (
    <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
      <Modal.Header>
        <Modal.Title>
          Excluir DID <span className="fw-bold">{did.value}</span>?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleDelete}>
          <Form.Group className="mb-3">
            <Form.Label>Digite o número do DID para confirmar.</Form.Label>

            <Form.Control
              className={`${error ? "is-invalid" : ""}`}
              type="text"
              placeholder="+55 (00) 00000-0000"
              name="number"
            />

            {error && <Form.Text className="text-danger">{error}</Form.Text>}
          </Form.Group>

          <Modal.Footer>
            <Row>
              <Col>
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
              </Col>

              <Col>
                <Button
                  variant="danger"
                  className="w-100"
                  type="submit"
                  disabled={deletingId !== null}
                >
                  {deletingId ? <Spinner size="sm" /> : "Excluir"}
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
