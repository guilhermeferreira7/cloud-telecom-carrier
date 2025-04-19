"use client";

import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineCloudSync, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "@/lib/components/Spinner/Spinner";
import { DIDS_DEFAULT_LIMIT, DIDS_POLLING_INTERVAL } from "@/lib/constants";
import { DIDsAvailableTable, fetchDIDs } from "@/lib/features/dids";
import { usePageSearch } from "@/lib/hooks/usePageSearch";
import { AppDispatch, RootState } from "@/lib/store";

export default function _page() {
  const dispatch = useDispatch<AppDispatch>();

  const { page, limit, setPage } = usePageSearch(DIDS_DEFAULT_LIMIT);

  const {
    paginatedData: { data: numbers, lastPage },
    loading: isPolling,
    error,
    lastUpdated,
  } = useSelector((state: RootState) => state.dids);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => dispatch(fetchDIDs({ page, limit }));

  useEffect(() => {
    setIsLoading(true);

    fetchData().finally(() => {
      setIsLoading(false);
    });

    const interval = setInterval(fetchData, DIDS_POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [dispatch, page, limit]);

  if (error) {
    return <p className="fs-4 p-3">{error}</p>;
  }

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <h1 className="fs-4">
              Números disponíveis
              {isPolling ? (
                <Spinner text="Atualizando..." color="secondary" />
              ) : (
                <span className="text-secondary fs-xs ms-3 text-nowrap">
                  <AiOutlineCloudSync size={16} />
                  <span className="ms-1">{lastUpdated}</span>
                </span>
              )}
            </h1>
          </Col>

          <Col className="text-end">
            <Button>
              <Container className="d-flex align-items-center gap-2">
                <AiOutlinePlus />
                Novo número
              </Container>
            </Button>
          </Col>
        </Row>

        {isLoading || numbers === null ? (
          <p>Carregando...</p>
        ) : (
          <DIDsAvailableTable
            numbers={numbers}
            paginationProps={{ page, lastPage: lastPage!, setPage }}
          />
        )}
      </Container>
    </>
  );
}
