import { Button } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { DIDS_DEFAULT_LIMIT } from "@/lib/constants";
import { deleteDID, DID, fetchDIDs } from "@/lib/features/dids";
import { usePageSearch } from "@/lib/hooks/usePageSearch";
import { AppDispatch, RootState } from "@/lib/store";

type DidRowProps = {
  did: DID;
};

export function DidRow({ did }: DidRowProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { page, limit } = usePageSearch(DIDS_DEFAULT_LIMIT);

  const { deletingId } = useSelector((state: RootState) => state.dids);

  return (
    <tr key={did.id}>
      <td>{did.id}</td>

      <td
        onClick={() => {}}
        className="text-primary text-decoration-underline cursor-pointer text-nowrap"
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
  );
}
