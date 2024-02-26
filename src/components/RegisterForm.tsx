"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormValidation } from "@/validation/registerFormValidation";
import Link from "next/link";
import { DNA } from "react-loader-spinner";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: yupResolver(registerFormValidation),
  });

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/profile");
    }
  }, [sessionStatus, router]);

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const body = await res.json();

      if (res.status === 409) {
        setError(body.message);
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
    setIsLoading(false);
  };

  if (sessionStatus === "loading") {
    return (
      <div className="h-[302px] relative">
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full text-lg mt-10">
      <label className="flex flex-col  leading-none ">
        <span className=" h-5 mb-[10px] ">Email</span>

        <input
          type="text"
          className="mb-2 p-4 bg-[#16161E] rounded-[10px]"
          {...register("email", { required: true, maxLength: 80 })}
        />
        <span className="h-3 text-xs text-error">
          {errors.email && errors.email.message}
        </span>
      </label>

      <label className="flex flex-col  leading-none ">
        <span className=" h-5 mb-[10px]">Name</span>

        <input
          type="text"
          className="mb-2 p-4 bg-[#16161E] rounded-[10px]"
          {...register("name", { required: true, maxLength: 80 })}
        />
        <span className="h-3 text-xs text-error">
          {errors.name && errors.name.message}
        </span>
      </label>
      <label className="flex flex-col  leading-none ">
        <span className=" h-5 mb-[10px]">Password</span>

        <input
          type="password"
          className="mb-2 p-4 bg-[#16161E] rounded-[10px]"
          {...register("password", { required: true, maxLength: 80 })}
        />
        <span className="h-3 text-xs text-error">
          {errors.password && errors.password.message}
        </span>
      </label>

      <Link href="/login" className="text-black-60 text-sm">
        Already have an account?
      </Link>

      {<span className="h-3 text-xs text-error">{error || ""}</span>}

      <button
        type="submit"
        className={`${
          isLoading && "loading blocked"
        } relative z-10 block text-base w-fit min-w-32 bg-auth-accent-gradient  rounded-[10px] before:rounded-[10px] py-[17px] px-[18px] leading-none  mx-auto before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:text-opacity-100`}>
        Sign Up
      </button>
    </form>
  );
}
