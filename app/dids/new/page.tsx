"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
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
import { currencyMask, phoneMask } from "@/lib/helpers/masks";

const countryCodes = ["+55", "+1", "+44", "+61", "+7"];

const currencies = ["R$", "US$", "€"];

type FormData = {
  countryCode: string;
  number: string;
  setupPrice: string;
  monthlyPrice: string;
  currency: string;
};

export default function _page() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { creating } = useSelector((state: RootState) => state.dids);

  const [formData, setFormData] = useState<FormData>({
    countryCode: "",
    number: "",
    setupPrice: "",
    monthlyPrice: "",
    currency: "",
  });

  function handleCreateDID(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const did: Omit<DID, "id"> = {
      currency: formData.currency,
      monthlyPrice: formData.monthlyPrice,
      setupPrice: formData.setupPrice,
      value: `${formData.countryCode} ${formData.number}`,
    };

    dispatch(createDID(did)).then(() => {
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
          <Col lg={6}>
            <Card className="p-3">
              <Form onSubmit={handleCreateDID}>
                <div className="d-flex gap-3">
                  <Form.Group className="mb-3 w-25">
                    <Form.Label>
                      Número <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Select
                      placeholder="+55"
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData((val) => ({
                          ...val,
                          countryCode: e.target.value,
                        }))
                      }
                    >
                      {countryCodes.map((countryCode) => (
                        <option key={countryCode} value={countryCode}>
                          {countryCode}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3 w-75">
                    <Form.Label className="text-white">.</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="(11) 9 9999-9999"
                      value={formData.number}
                      onChange={(e) => {
                        setFormData((val) => ({
                          ...val,
                          number: phoneMask(e.target.value),
                        }));
                      }}
                    />
                  </Form.Group>
                </div>

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
