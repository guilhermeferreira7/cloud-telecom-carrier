"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { DID, getDID, updateDID } from "@/lib/features/dids";
import { currencyMask } from "@/lib/helpers/masks";
import { AppDispatch, RootState } from "@/lib/store";

const currencies = ["R$", "US$", "€"];

type FormData = {
  setupPrice: string;
  monthlyPrice: string;
  currency: string;
};

export default function _page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const [did, setDid] = useState<DID>();

  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { updating } = useSelector((state: RootState) => state.dids);

  const [formData, setFormData] = useState<FormData>({
    setupPrice: "",
    monthlyPrice: "",
    currency: currencies[0],
  });

  useEffect(() => {
    setIsLoading(true);

    dispatch(getDID(Number(id)))
      .then((res) => {
        setDid(res.payload);
        setFormData(res.payload);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleEditDID(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const did: FormData = {
      setupPrice: formData.setupPrice,
      monthlyPrice: formData.monthlyPrice,
      currency: formData.currency,
    };

    dispatch(updateDID({ id: Number(id), data: did })).then(() => {
      router.push("/dids");
    });
  }

  if (isLoading)
    return (
      <div className="p-3 fs-4 d-flex align-items-center gap-2">
        Carregando <Spinner />
      </div>
    );

  if (!did) return <p className="p-3 fs-4">DID não encontrado</p>;

  return (
    <>
      <Container className="my-3">
        <Breadcrumb>
          <Breadcrumb.Item href="/dids">Números disponíveis</Breadcrumb.Item>

          <Breadcrumb.Item active>Editar número</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="w-100 justify-content-center">
          <Col lg={6}>
            <Card className="p-3">
              <Form onSubmit={handleEditDID}>
                <Form.Group className="mb-3">
                  <Form.Label>Número</Form.Label>

                  <Form.Control type="text" disabled value={did.value} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Preço de compra <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="10,00"
                    value={formData.setupPrice}
                    onChange={(e) =>
                      setFormData((val) => ({
                        ...val,
                        setupPrice: currencyMask(e.target.value),
                      }))
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Preço mensal <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="10,00"
                    value={formData.monthlyPrice}
                    onChange={(e) =>
                      setFormData((val) => ({
                        ...val,
                        monthlyPrice: currencyMask(e.target.value),
                      }))
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Moeda <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData((val) => ({
                        ...val,
                        currency: e.target.value,
                      }))
                    }
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100"
                  type="submit"
                  disabled={updating}
                >
                  {updating ? <Spinner size="sm" /> : "Atualizar"}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
