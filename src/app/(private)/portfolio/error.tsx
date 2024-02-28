"use client";

import { getErrorMessage } from "@/app/lib";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2 className="mb-5 font-bold text-3xl">Something went wrong!</h2>
      <p className="mb-5">{getErrorMessage(error)}</p>
      <button
        onClick={() => reset()}
        className=" text-white  text-center relative z-10 block bg-auth-accent-gradient text-base  w-[130px]   rounded-[10px] before:rounded-[10px] py-[12px] px-[18px] leading-none   before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100">
        Try again
      </button>
    </div>
  );
}
