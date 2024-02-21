"use client";

import { DNA } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className=" h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
}
