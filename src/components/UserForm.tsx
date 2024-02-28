"use client";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { userFormValidation } from "@/validation/userFormValidation";
import { useForm,Controller  } from "react-hook-form";
import { useSession } from "next-auth/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CustomSession } from "@/interfaces";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import { updateUserData } from "@/app/actions";

interface UserFormValues {
  name: string;
  email: string;
  phone?: string;
  birthday?: Date | null;
}

export default function UserForm() {
  const session = useSession() as {
    data: CustomSession;
    status: string;
    update: any;
  };

  const [isLoading, setIsLoading] = useState(false);

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
    if (
      session &&
      session.data &&
      session.data.user &&
      session.status === "authenticated"
    ) {
      setValue("name", session.data?.user?.name || "");
      setValue("email", session.data?.user?.email || "");
      setValue("phone", session.data?.user?.phone || "");
      setValue(
        "birthday",
        session.data.user.birthday ? new Date(session.data.user.birthday) : null
      );
    }
  }, [setValue, session]);

  const onSubmit = async (data: UserFormValues) => {
    const requestBody = {
      ...data,
      birthday: data.birthday ? data.birthday.toISOString() : null,
    };

    setIsLoading(true);

    const res = await updateUserData(requestBody);

    if (res instanceof Object && "error" in res && res.error) {
      setError(res.error);
      return;
    }

    await session.update(requestBody);

    setIsLoading(false);
  };

  return (
    <form className=" pb-5" onSubmit={handleSubmit(onSubmit)}>
      <label className="flex flex-col mb-2 h-[106px]  leading-none">
        <span className=" h-5 mb-[10px] ">Email</span>

        <TextField
          type="text"
          className="mb-2  bg-[#16161E] rounded-[10px]"
          {...register("email", { required: true, maxLength: 80 })}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "10px",
            },
            "& .MuiInputBase-input": {
              color: "#fff",
            },
          }}
        />
        <span className="h-3 text-xs text-error">
          {errors.email && errors.email.message}
        </span>
      </label>
      <label className="flex flex-col mb-2 h-[106px]  leading-none ">
        <span className=" h-5 mb-[10px]">Name</span>

        <TextField
          type="text"
          className="mb-2  bg-[#16161E] rounded-[10px]"
          {...register("name", { required: true, maxLength: 80 })}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "10px",
            },
            "& .MuiInputBase-input": {
              color: "#fff",
            },
          }}
        />
        <span className="h-3 text-xs text-error">
          {errors.name && errors.name.message}
        </span>
      </label>
      <label className="flex flex-col mb-2  h-[106px] leading-none ">
        <span className=" h-5 mb-[10px]">Phone</span>

        <Controller
          control={control}
          name="phone"
          render={({ field }) => {
            return (
              <InputMask
                mask="+38 (999) 999-99-99"
                value={field.value}
                disabled={false}
                onChange={field.onChange}
              >
                <TextField
                  type="phone"
                  className="mb-2 bg-[#16161E] rounded-[10px]"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "10px",
                    },
                    "& .MuiInputBase-input": {
                      color: "#fff",
                    },
                  }}
                />
              </InputMask>
            );
          }}
        />

        <span className="h-3 text-xs text-error">
          {errors.phone && errors.phone.message}
        </span>
      </label>
      <label className="flex flex-col mb-2  h-[106px]  leading-none ">
        <span className=" h-5 mb-[10px]">Birthday</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => {
              return (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  sx={{
                    color: "#fff",
                    backgroundColor: "#16161E",
                    borderRadius: "10px",
                    outline: "none",
                    overflow: "hidden",
                    border: "none",
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "10px",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      fill: "#fff",
                    },
                    "& .MuiInputBase-input": {
                      color: "#fff",
                    },
                    "& .MuiDateCalendar-root": {
                      color: "red",
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: "#2196f3",
                      border: "1px solid",
                      backgroundColor: "green",
                    },
                  }}
                  slotProps={{
                    layout: {
                      sx: {
                        ".MuiDateCalendar-root": {
                          color: "#fff",

                          borderWidth: 1,
                          borderColor: "green",
                          border: "1px solid",
                          backgroundImage:
                            "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",

                          ".MuiDayCalendar-weekDayLabel": {
                            color: "#fff",
                          },
                          ".MuiPickersDay-root": {
                            color: "#fff",

                            "&.Mui-selected": {
                              color: "#fff",
                              backgroundColor: "#b102cd",
                            },
                          },
                        },
                      },
                    },
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

      {<span className="h-3 mb-4 text-xs block text-error">{error || ""}</span>}

      <button
        type="submit"
        className={`${
          isLoading && "loading  blocked"
        }  relative z-10 block text-base w-fit min-w-32 bg-auth-accent-gradient  rounded-[10px] before:rounded-[10px] py-[17px] px-[18px] leading-none  mx-auto before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100`}>
        Update
      </button>
    </form>
  );
}
