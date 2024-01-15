import { Search, Breadcrumbs } from "@/components";

export default function Layout({ children, params }: any) {
  console.log(params);

  return (
    <>
      <div className="flex justify-between pt-1 pb-5 px-5">
        <Breadcrumbs />

        <Search />
      </div>

      <div className="flex-1 h-[calc(100%-64px)] overflow-y-auto h-overflow-y-auto">
        {" "}
        {children}
      </div>
    </>
  );
}
