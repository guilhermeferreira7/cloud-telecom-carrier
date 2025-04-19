import { Table } from "react-bootstrap";

import { Pagination } from "@/lib/components/Pagination/Pagination";

import { DID } from "@/lib/features/dids/types";

import { DIDRow } from "./_DIDRow";

type DIDsAvailableTableProps = {
  numbers: DID[];
  paginationProps: {
    page: number;
    setPage: (page: number) => void;
    lastPage: number;
  };
};

export function DIDsAvailableTable({
  numbers,
  paginationProps,
}: DIDsAvailableTableProps) {
  const { lastPage, page, setPage } = paginationProps;

  if (numbers.length === 0) {
    return <p className="text-center">Nenhum DID disponível</p>;
  }

  return (
    <>
      <Table responsive striped hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Número</th>
            <th className="text-center">Preço de compra</th>
            <th className="text-center">Preço mensal</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((did) => (
            <DIDRow did={did} key={did.id} />
          ))}
        </tbody>
      </Table>

      {!lastPage ? (
        <p>Carregando...</p>
      ) : (
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      )}
    </>
  );
}
