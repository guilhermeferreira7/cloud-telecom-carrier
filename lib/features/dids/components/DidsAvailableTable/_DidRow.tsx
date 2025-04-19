import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { DID } from "@/lib/features/dids";

import { DIDDeleteModal } from "./_DIDDeleteModal";
import { DIDDetailsModal } from "./_DIDDetailsModal";

type DIDRowProps = {
  did: DID;
};

export function DIDRow({ did }: DIDRowProps) {
  const router = useRouter();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <tr key={did.id}>
        <td>{did.id}</td>

        <td
          onClick={() => {
            setIsDetailsOpen(true);
          }}
          className="text-primary cursor-pointer text-nowrap"
        >
          {did.value}
        </td>

        <td className="text-center hover-bg">
          {did.currency} {did.setupPrice}
        </td>

        <td className="text-center">
          {did.currency} {did.monthlyPrice}
        </td>

        <td className="text-center">
          <Button
            variant="link"
            className="hover-bg-primary"
            onClick={() => router.push(`/dids/${did.id}/edit`)}
          >
            <AiOutlineEdit />
          </Button>

          <Button
            variant="link"
            className="text-danger hover-bg-danger"
            onClick={() => setIsDeleting(true)}
          >
            <AiOutlineDelete />
          </Button>
        </td>
      </tr>

      <DIDDetailsModal
        isModalOpen={isDetailsOpen}
        setIsModalOpen={setIsDetailsOpen}
        did={did}
      />

      <DIDDeleteModal
        isModalOpen={isDeleting}
        setIsModalOpen={setIsDeleting}
        did={did}
      />
    </>
  );
}
