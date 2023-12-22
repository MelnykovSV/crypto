// import { GetStaticProps, InferGetStaticPropsType } from "next";

import CurrenciesTable from "@/components/CurrenciesTable";

// export const getStaticProps = (async () => {
//   const res = await fetch(
//     "https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=5&precision=3"
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return { props: { currenciesData: data } };
// }) satisfies GetStaticProps<{ currenciesData: { id: string }[] }>;

export default function Page() {
  return (
    <div>
      <h2>CurrenciesPage</h2>
      <CurrenciesTable />
    </div>
  );
}
