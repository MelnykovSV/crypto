import { ImageComponent } from "@/UI";
import dollarIcon from "@/assets/dollar.svg";
import Image from "next/image";
import { roundValue } from "@/app/lib";
import dayjs from "dayjs";
import { TransactionsSortingSwitcher } from ".";
import { GoDotFill } from "react-icons/go";
import { ITransactionData } from "@/interfaces";
import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";

interface ITransactionsTableProps {
  data: {
    totalPages: number;
    userTransactions: ITransactionData[];
    error?: string;
  };
}

export default async function TransactionsTable({
  data,
}: ITransactionsTableProps) {
  if (!data || !data.userTransactions) {
    return (
      <div>
        <h2>ERROR</h2>
        {data.error}
      </div>
    );
  }

  return (
    <>
      <table className="w-full mb-[20px] hidden small-desktop:table">
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
              fromItemSymbol,
              fromItemLogo,
              fromAmount,
              toItemSymbol,
              toItemLogo,
              toAmount,
              createdAt,
            }) => (
              <tr key={_id}>
                <td className="py-2">
                  <div className="flex gap-1 items-center justify-center">
                    {fromItemSymbol.toLowerCase() === "usd" ? (
                      <Image
                        src={dollarIcon}
                        alt="dollar image"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <ImageComponent
                        src={fromItemLogo ? fromItemLogo : ""}
                        alt={`${fromItemSymbol} image`}
                        width={30}
                        height={30}
                      />
                    )}
                    <p className=" break-words max-w-16">{fromItemSymbol}</p>
                  </div>
                </td>
                <td className="text-center py-2 break-words max-w-[160px]">
                  {roundValue(fromAmount)}
                </td>
                <td className="py-2">
                  <div className="flex gap-1 items-center justify-center">
                    {toItemSymbol.toLowerCase() === "usd" ? (
                      <Image
                        src={dollarIcon}
                        alt="dollar image"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <ImageComponent
                        src={toItemLogo ? toItemLogo : ""}
                        alt={`${toItemSymbol} image`}
                        width={30}
                        height={30}
                      />
                    )}
                    <p className=" break-words max-w-16">{toItemSymbol}</p>
                  </div>
                </td>
                <td className="text-center py-2 break-words max-w-[160px]">
                  {roundValue(toAmount)}
                </td>
                <td className="text-center py-2">
                  {dayjs(createdAt).format("MMM DD, YYYY, hh:mm")}
                </td>
                <td className="text-center py-2">
                  <div
                    className={`flex justify-between items-center py-2 px-4 w-[130px] rounded-full  mx-auto  ${
                      isSuccessful ? "bg-success" : "bg-error"
                    }`}>
                    <GoDotFill /> {isSuccessful ? "Accepted" : "Rejected"}
                  </div>
                </td>
                <td className="text-center py-2 ">
                  <div
                    className={`text-center py-2  px-4 w-[110px] rounded-full  mx-auto capitalize  ${
                      type === "buy"
                        ? "bg-accent"
                        : type === "sell"
                        ? "bg-accent-dark"
                        : "bg-accent-blue"
                    }`}>
                    {type}
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <ul className="mb-[20px] block small-desktop:hidden">
        {data.userTransactions.map(
          ({
            _id,
            isSuccessful,
            type,
            fromItemSymbol,
            fromItemLogo,
            fromAmount,
            toItemSymbol,
            toItemLogo,
            toAmount,
            createdAt,
          }) => (
            <li
              key={_id}
              className="flex flex-col-reverse  px-3 py-5 tablet:px-10 tablet:gap-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-white last-of-type:after:hidden">
              <div className="flex flex-col items-center tablet:flex-row tablet:justify-center tablet:gap-5">
                <div className=" flex gap-5 items-center">
                  <div className="flex gap-3 items-center justify-center ">
                    {fromItemSymbol.toLowerCase() === "usd" ? (
                      <Image
                        src={dollarIcon}
                        alt="dollar image"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <ImageComponent
                        src={fromItemLogo ? fromItemLogo : ""}
                        alt={`${fromItemSymbol} image`}
                        width={30}
                        height={30}
                      />
                    )}
                    <p className="break-words max-w-16 tablet:max-w-15 laptop:max-w-20">
                      {fromItemSymbol}
                    </p>
                  </div>
                  <p className="text-center  break-words max-w-[135px] large-mobile:max-w-[200px] tablet:max-w-[125px] laptop:max-w-[200px]">
                    {roundValue(fromAmount)}
                  </p>
                </div>

                <div className="block tablet:hidden">
                  <FaArrowDownLong size={30} />
                </div>

                <div className="hidden tablet:block">
                  <FaArrowRightLong size={30} />
                </div>

                <div className=" flex gap-5 items-center">
                  <div className="flex gap-3 items-center justify-center">
                    {toItemSymbol.toLowerCase() === "usd" ? (
                      <Image
                        src={dollarIcon}
                        alt="dollar image"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <ImageComponent
                        src={toItemLogo ? toItemLogo : ""}
                        alt={`${toItemSymbol} image`}
                        width={30}
                        height={30}
                      />
                    )}

                    <p className="break-words max-w-16 tablet:max-w-15 laptop:max-w-20">
                      {toItemSymbol}
                    </p>
                  </div>
                  <p className="text-center break-words max-w-[135px] large-mobile:max-w-[200px] tablet:max-w-[125px] laptop:max-w-[200px] ">
                    {roundValue(toAmount)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-start flex-col-reverse gap-2 tablet:flex-row">
                <p className="text-center py-1 ">
                  {dayjs(createdAt).format("MMM DD, YYYY, hh:mm")}
                </p>

                <div className="flex w-full gap-4 justify-between tablet:w-fit ">
                  <div
                    className={`flex  items-center py-1 px-4 w-[130px] rounded-full  mr-auto tablet:mx-auto  ${
                      isSuccessful ? "bg-success" : "bg-error"
                    }`}>
                    <GoDotFill /> {isSuccessful ? "Accepted" : "Rejected"}
                  </div>

                  <div
                    className={`text-center py-1  px-4 w-[110px] rounded-full  ml-auto tablet:mx-auto capitalize  ${
                      type === "buy"
                        ? "bg-accent"
                        : type === "sell"
                        ? "bg-accent-dark"
                        : "bg-accent-blue"
                    }`}>
                    {type}
                  </div>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
}
