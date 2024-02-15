import { getUserTransactions } from "@/app/actions";
// import { parseStrToJSON } from "@/app/lib";
export default async function TransactionsTable({ params }: any) {
  const res = await  getUserTransactions(params);


  return <div>{res}</div>;
}
