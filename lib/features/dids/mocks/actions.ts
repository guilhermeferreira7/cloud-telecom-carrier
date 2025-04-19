import { DID } from "../types";
import dataMock from "./mock-data.json";

export async function fetchMockedDIDs(page: number, limit: number) {
  await fakeDelay(2000);

  const storageDids = localStorage.getItem("dids");

  if (storageDids) {
    const orderedDids = JSON.parse(storageDids).sort((a: DID, b: DID) => {
      return b.id - a.id;
    });

    const paginatedData = orderedDids.slice((page - 1) * limit, page * limit);

    return {
      data: paginatedData,
      lastPage: Math.ceil(JSON.parse(storageDids).length / limit),
    };
  }

  localStorage.setItem("dids", JSON.stringify(dataMock));

  const paginatedData = JSON.parse(localStorage.getItem("dids")!).slice(
    (page - 1) * limit,
    page * limit
  );

  return {
    data: paginatedData,
    lastPage: Math.ceil(
      JSON.parse(localStorage.getItem("dids")!).length / limit
    ),
  };
}

export async function deleteMockedDID(id: number) {
  await fakeDelay(1500);

  const storageDids = localStorage.getItem("dids");

  if (!storageDids) {
    throw new Error("DID not found");
  }

  const dids = JSON.parse(storageDids);

  localStorage.setItem(
    "dids",
    JSON.stringify(dids.filter((did: any) => did.id !== id))
  );

  return id;
}

export async function createMockedDID(data: Omit<DID, "id">) {
  await fakeDelay(1500);

  const dids = await fetchMockedDIDs(1, 1);
  if (dids.data.length > 0) {
    const lastId = dids.data[0].id;
    const DID = { ...data, id: lastId + 1 };

    const allDids = localStorage.getItem("dids");

    const parsedDids = allDids ? JSON.parse(allDids) : [];

    localStorage.setItem("dids", JSON.stringify([...parsedDids, DID]));

    return DID;
  }

  const DID = { ...data, id: 1 };

  localStorage.setItem("dids", JSON.stringify([DID]));

  return DID;
}

export async function updateMockedDID(
  id: number,
  data: Omit<DID, "id" | "value">
) {
  await fakeDelay(1500);

  const storageDids = localStorage.getItem("dids");

  if (!storageDids) {
    throw new Error("DID not found");
  }

  const dids = JSON.parse(storageDids);

  const updatedDids = dids.map((did: DID) => {
    if (did.id === id) {
      return { ...did, ...data };
    }

    return did;
  });

  localStorage.setItem("dids", JSON.stringify(updatedDids));

  return id;
}

export async function getMockedDID(id: number) {
  await fakeDelay(1500);

  const dids = localStorage.getItem("dids");

  if (!dids) {
    throw new Error("DID not found");
  }

  return JSON.parse(dids).find((d: DID) => d.id === id);
}

async function fakeDelay(amount: number) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, amount);
  });
}
