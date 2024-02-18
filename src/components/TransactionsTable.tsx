import { getUserTransactions } from "@/app/actions";
import { ImageComponent } from "@/UI";
import dollarIcon from "@/assets/dollar.svg";
import Image from "next/image";
import { roundValue } from "@/app/lib";
import dayjs from "dayjs";
import { GoDotFill } from "react-icons/go";
import { TransactionsSortingSwitcher } from ".";
export default async function TransactionsTable({ params }: any) {
  const res = await getUserTransactions(params);

  const data = JSON.parse(res);


  return (
    <table className="w-full mb-[20px]">
      <thead>
        <tr>
          <th className="py-2" colSpan={2}>
            Sent
          </th>
          <th className="py-2" colSpan={2}>
            Received
          </th>
          <th className="flex gap-2 justify-center py-2">
            Date <TransactionsSortingSwitcher />
          </th>
          <th className="py-2">Status</th>
          <th className="py-2">Type</th>
        </tr>
      </thead>
      <tbody>
        {data.userTransactions.map(
          ({
            _id,
            isSuccessful,
            type,
            fromItem,
            fromAmount,
            toItem,
            toAmount,
            createdAt,
          }: any) => (
            <tr key={_id}>
              <td className="py-2">
                <div className="flex gap-1 items-center justify-center">
                  {fromItem.toLowerCase() === "usd" ? (
                    <Image
                      src={dollarIcon}
                      alt="dollar image"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <ImageComponent
                      src={fromItem in data.logos ? data.logos[fromItem] : ""}
                      alt={`${fromItem} image`}
                      width={30}
                      height={30}
                    />
                  )}
                  {fromItem}
                </div>
              </td>
              <td className="text-center py-2">{roundValue(fromAmount)}</td>
              <td className="py-2">
                <div className="flex gap-1 items-center justify-center">
                  {toItem.toLowerCase() === "usd" ? (
                    <Image
                      src={dollarIcon}
                      alt="dollar image"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <ImageComponent
                      src={toItem in data.logos ? data.logos[toItem] : ""}
                      alt={`${toItem} image`}
                      width={30}
                      height={30}
                    />
                  )}
                  {toItem}
                </div>
              </td>
              <td className="text-center py-2">{roundValue(toAmount)}</td>
              <td className="text-center py-2">
                {dayjs(createdAt).format("MMM DD, YYYY, hh:mm")}
              </td>
              <td className="text-center py-2">
                <div
                  className={
                    `flex justify-between items-center py-2 px-4 w-[130px] rounded-full  mx-auto  ${isSuccessful ? "bg-success" : "bg-error"}`
                  }>
                  <GoDotFill /> {isSuccessful ? "Accepted" : "Rejected"}
                </div>
              </td>
              <td className="text-center py-2">{type}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
