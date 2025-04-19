import {
  createDID,
  deleteDID,
  DIDState,
  fetchDIDs,
  getDID,
  updateDID,
} from "lib/features/dids";
import reducer from "lib/features/dids/didsSlice";

const initialState: DIDState = {
  paginatedData: {
    data: null,
    lastPage: null,
  },
  loading: false,
  error: null,
  deletingId: null,
  creating: false,
  updating: false,
  lastUpdated: "",
};

describe("didsSlice reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("fetchDIDs", () => {
    it("should set loading to true and error to null while fetching", () => {
      const action = { type: fetchDIDs.pending.type };
      const nextState = reducer(initialState, action);

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBe(null);
    });

    it("should set loading to false and error to null on success", () => {
      const action = { type: fetchDIDs.fulfilled.type, payload: [] };
      const nextState = reducer(initialState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(null);
    });

    it("should set the data and lastPage on success", () => {
      const data = [{ id: 1, number: "123" }];

      const action = {
        type: fetchDIDs.fulfilled.type,
        payload: { data, lastPage: 1 },
      };
      const nextState = reducer(initialState, action);

      expect(nextState.paginatedData.data).toEqual(data);
      expect(nextState.paginatedData.lastPage).toBe(1);
    });

    it('should set loading to false and error to "Erro ao buscar dids" on failure', () => {
      const action = { type: fetchDIDs.rejected.type, error: "Error" };
      const nextState = reducer(initialState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe("Erro ao buscar dids");
    });
  });

  describe("deleteDID", () => {
    it("should set deletingId to the id being deleted", () => {
      const action = { type: deleteDID.pending.type, meta: { arg: 1 } };
      const nextState = reducer(initialState, action);

      expect(nextState.deletingId).toBe(1);
    });

    it("should set deletingId to null on success", () => {
      const action = { type: deleteDID.fulfilled.type };
      const nextState = reducer(initialState, action);

      expect(nextState.deletingId).toBe(null);
    });

    it("should set deletingId to null and error to 'Erro ao deletar did' on failure", () => {
      const action = { type: deleteDID.rejected.type };
      const nextState = reducer(initialState, action);

      expect(nextState.deletingId).toBe(null);
      expect(nextState.error).toBe("Erro ao deletar did");
    });
  });

  describe("createDID", () => {
    it("should set creating to true", () => {
      const action = { type: createDID.pending.type };
      const nextState = reducer(initialState, action);

      expect(nextState.creating).toBe(true);
    });

    it("should set creating to false", () => {
      const action = { type: createDID.fulfilled.type };
      const nextState = reducer(initialState, action);

      expect(nextState.creating).toBe(false);
    });

    it("should set creating to false and error to 'Erro ao criar did' on failure", () => {
      const action = { type: createDID.rejected.type };
      const nextState = reducer(initialState, action);

      expect(nextState.creating).toBe(false);
      expect(nextState.error).toBe("Erro ao criar did");
    });
  });

  describe("updateDID", () => {
    it("should set updating to true", () => {
      const action = { type: updateDID.pending.type };
      const nextState = reducer(initialState, action);

      expect(nextState.updating).toBe(true);
    });

    it("should set updating to false", () => {
      const action = { type: updateDID.fulfilled.type };
      const nextState = reducer(initialState, action);

      expect(nextState.updating).toBe(false);
    });

    it("should set updating to false and error to 'Erro ao atualizar did' on failure", () => {
      const action = { type: updateDID.rejected.type };
      const nextState = reducer(initialState, action);

      expect(nextState.updating).toBe(false);
      expect(nextState.error).toBe("Erro ao atualizar did");
    });
  });

  describe("getDID", () => {
    it("should set loading to true and error to null while fetching", () => {
      const action = { type: getDID.pending.type };
      const nextState = reducer(initialState, action);

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBe(null);
    });

    it("should set loading to false and error to null on success", () => {
      const action = { type: getDID.fulfilled.type, payload: {} };
      const nextState = reducer(initialState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(null);
    });

    it("should set loading to false and error to 'Erro ao buscar did' on failure", () => {
      const action = { type: getDID.rejected.type };
      const nextState = reducer(initialState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe("Erro ao buscar did");
    });
  });
});
