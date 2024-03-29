import { Search, Breadcrumbs } from "@/components";

export default function Layout({ children, params }: any) {
  return (
    <>
      <div className="flex flex-col gap-2 justify-between pt-1 pb-5 px-2 laptop:flex-row">
        <Breadcrumbs />

        <Search />
      </div>

      <div className="flex-1 h-[calc(100%-64px)] overflow-y-auto h-overflow-y-auto">
        {children}
      </div>
    </>
  );
}
