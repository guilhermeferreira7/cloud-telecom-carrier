import { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { DIDS_DEFAULT_LIMIT } from "@/lib/constants";
import { usePageSearch } from "@/lib/hooks/usePageSearch";
import { AppDispatch, RootState } from "@/lib/store";

import {
  deleteDID,
  DID,
  DIDDetailsModal,
  fetchDIDs,
} from "@/lib/features/dids";

type DIDRowProps = {
  did: DID;
};

export function DIDRow({ did }: DIDRowProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { deletingId } = useSelector((state: RootState) => state.dids);

  const { page, limit } = usePageSearch(DIDS_DEFAULT_LIMIT);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <tr key={did.id}>
        <td>{did.id}</td>

        <td
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="text-primary cursor-pointer text-nowrap"
        >
          {did.value}
        </td>

        <td className="text-center">
          {did.currency} {did.monthlyPrice}
        </td>

        <td className="text-center hover-bg">
          {did.currency} {did.setupPrice}
        </td>

        <td className="text-center">
          {deletingId === did.id ? (
            <div className="spinner-border spinner-border-sm text-danger" />
          ) : (
            <>
              <Button variant="link" className="hover-bg-primary">
                <AiOutlineEdit />
              </Button>

              <Button
                variant="link"
                className="text-danger hover-bg-danger"
                onClick={() =>
                  dispatch(deleteDID(did.id)).then(() => {
                    dispatch(fetchDIDs({ page, limit }));
                  })
                }
              >
                <AiOutlineDelete />
              </Button>
            </>
          )}
        </td>
      </tr>

      <DIDDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        did={did}
      />
    </>
  );
}
