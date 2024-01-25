"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidation } from "@/validation/loginFormValidation";
import Link from "next/link";

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginFormValidation),
  });

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/profile");
    }
  }, [sessionStatus, router]);

  const onSubmit = async (data: LoginValues) => {
    try {
      const res = await signIn("credentials", { ...data, redirect: false });

      console.log(res);

      if (res?.status === 401) {
        setError("Invalid email or password");
        if (res?.url) router.replace("/profile");
      } else {
        setError("");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

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

      <Link href="/register" className="text-black-60 text-sm">
        Don’t have an account?
      </Link>

      {<span className="h-3 text-xs text-error">{error || ""}</span>}

      <button
        type="submit"
        className="relative z-10 block text-base w-fit min-w-32 bg-auth-accent-gradient  rounded-[10px] before:rounded-[10px] py-[17px] px-[18px] leading-none  mx-auto before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100">
        Sign In
      </button>
    </form>
  );
}
