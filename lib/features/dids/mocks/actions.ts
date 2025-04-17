import dataMock from "./mock-data.json";

export async function fetchMockedDIDs(page: number, limit: number) {
  await fakeDelay(2000);

  const storageDids = localStorage.getItem("dids");

  if (storageDids) {
    const paginatedData = JSON.parse(storageDids).slice(
      (page - 1) * limit,
      page * limit
    );

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

async function fakeDelay(amount: number) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, amount);
  });
}
