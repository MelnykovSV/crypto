"use client";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { userFormValidation } from "@/validation/userFormValidation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  birthday: Date;
}

export default function UserForm() {
  const session = useSession() as any;

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<UserFormValues>({
    resolver: yupResolver(userFormValidation),
  });

  useEffect(() => {
    if (session.status === "authenticated") {
      setValue("name", session.data?.user?.name || "");
      setValue("email", session.data?.user?.email || "");
      setValue("phone", session.data?.user?.phone || "");
      setValue("birthday", new Date(session.data?.user?.birthday) || null);
    }
  }, [setValue, session]);

  const onSubmit = async (data: UserFormValues) => {
    const requestBody = { ...data, birthday: data.birthday.toISOString() };

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        await session.update(requestBody);
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (err) => {
        console.log(err);
      })}>
      <label className="flex flex-col  leading-none">
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
        <span className=" h-5 mb-[10px]">Phone</span>

        <input
          type="phone"
          className="mb-2 p-4 bg-[#16161E] rounded-[10px]"
          {...register("phone", { required: true, maxLength: 80 })}
        />
        <span className="h-3 text-xs text-error">
          {errors.phone && errors.phone.message}
        </span>
      </label>
      <label className="flex flex-col  leading-none ">
        <span className=" h-5 mb-[10px]">Birthday</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => {
              console.log(field.value);
              return (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              );
            }}
          />
        </LocalizationProvider>
        <span className="h-3 text-xs text-error">
          {errors.birthday && errors.birthday.message}
        </span>
      </label>

      {<span className="h-3 text-xs text-error">{error || ""}</span>}

      <button
        type="submit"
        className="relative z-10 block text-base w-fit min-w-32 bg-auth-accent-gradient  rounded-[10px] before:rounded-[10px] py-[17px] px-[18px] leading-none  mx-auto before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100">
        Update
      </button>
    </form>
  );
}
