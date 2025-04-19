export type DID = {
  id: number;
  value: string;
  monthlyPrice: string;
  setupPrice: string;
  currency: string;
};

export type DIDState = {
  paginatedData: {
    data: DID[] | null;
    lastPage: number | null;
  };
  loading: boolean;
  deletingId: number | null;
  creating: boolean;
  updating: boolean;
  lastUpdated: string;
  error: string | null;
};
