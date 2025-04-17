import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePageSearch(DEFAULT_LIMIT: number) {
  const search = useSearchParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));

      router.push(pathname + "?" + params.toString());
    },
    [searchParams]
  );

  const page = search.get("page");
  const limit = search.get("limit");

  return {
    page: page && Number(page) ? Number(page) : 1,
    limit: limit && Number(limit) ? Number(limit) : DEFAULT_LIMIT,
    setPage,
  };
}
