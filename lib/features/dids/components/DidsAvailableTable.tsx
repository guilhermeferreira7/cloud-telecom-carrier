import { Table } from "react-bootstrap";

import { DID } from "@/lib/features/dids";

import { DidRow } from "./_DidRow";

type DidsAvailableTableProps = {
  numbers: DID[];
};

export function DidsAvailableTable({ numbers }: DidsAvailableTableProps) {
  if (numbers.length === 0) {
    return <p className="text-center">Nenhum DID disponível</p>;
  }

  return (
    <Table responsive striped hover className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Número</th>
          <th className="text-center">Custo mensal</th>
          <th className="text-center">Custo de compra</th>
          <th className="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        {numbers.map((did) => (
          <DidRow did={did} key={did.id} />
        ))}
      </tbody>
    </Table>
  );
}
