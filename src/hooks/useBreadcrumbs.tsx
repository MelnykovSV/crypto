import { usePathname } from "next/navigation";

export default function useBreadcrumbs() {
  const pathname = usePathname();

  return pathname
    .slice(1)
    .split("/")
    .reduce(
      (
        acc: { page: string; pathname: string }[],
        page: string,
        i: number,
        arr: string[]
      ) => [
        ...acc,
        {
          page,
          pathname: i ? `${acc[acc.length - 1].pathname}/${page}` : `/${page}`,
        },
      ],
      []
    );
}
