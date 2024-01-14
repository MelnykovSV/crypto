import { Search,Breadcrumbs } from "@/components";


export default function Layout({children, params}: any) {
  console.log(params);

  return (
    <>
      <div>
        {/* <h2>CurrenciesPage</h2> */}
        <Breadcrumbs/>

        <Search />
      </div>

      {children}
    </>
  );
}
