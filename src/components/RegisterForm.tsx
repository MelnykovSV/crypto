"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormValidation } from "@/validation/registerFormValidation";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}



export default function RegisterForm() {
  const [error, setError] = useState("");
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
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-5 w-[400px] border">
      <input
        type="text"
        placeholder="Name"
        {...register("name", { required: true, maxLength: 80 })}
      />
      {errors.name && <span>{errors.name.message}</span>}
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
      <button type="submit">Sign Up</button>
    </form>
  );
}
