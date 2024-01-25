"use client";

import { useForm, Resolver } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidation } from "@/validation/loginFormValidation";

interface LoginValues {
  email: string;
  password: string;
}



export default function LoginForm() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [error, setError] = useState("");
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/profile");
    }
  }, [sessionStatus, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: yupResolver(loginFormValidation) });

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
      className="flex flex-col gap-4 p-5 w-[400px] border text-black">
      <input
        type="text"
        placeholder="email"
        {...register("email", { required: true, maxLength: 80 })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true, maxLength: 80 })}
      />

      {errors.password && <span>{errors.password.message}</span>}
      {error && <span>{error}</span>}
      <button type="submit" className="bg-white">
        Sign Up
      </button>
    </form>
  );
}
