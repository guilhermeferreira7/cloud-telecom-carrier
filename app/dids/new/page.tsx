"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "@/lib/components/Spinner/Spinner";
import { createDID, DID } from "@/lib/features/dids";
import { AppDispatch, RootState } from "@/lib/store";

export default function _page() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { creating } = useSelector((state: RootState) => state.dids);

  function handleCreateDID(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    dispatch(createDID(formDataObj as Omit<DID, "id">)).then(() => {
      router.push("/dids");
    });
  }

  return (
    <>
      <Container className="my-3">
        <Breadcrumb>
          <Breadcrumb.Item href="/dids">Números disponíveis</Breadcrumb.Item>

          <Breadcrumb.Item active>Novo número</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="w-100 justify-content-center">
          <Col md={6}>
            <Card className="p-3">
              <Form onSubmit={handleCreateDID}>
                <Form.Group className="mb-3">
                  <Form.Label>Número</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="+55 (11) 9 9999-9999"
                    name="value"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Preço de compra</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="10,00"
                    name="setupPrice"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Preço mensal</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="10,00"
                    name="monthlyPrice"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Moeda</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="R$, U$, etc"
                    name="currency"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100"
                  type="submit"
                  disabled={creating}
                >
                  {creating ? <Spinner size="sm" /> : "Criar"}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
