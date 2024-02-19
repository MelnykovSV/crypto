"use client";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function TransactionsDatePicker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const dateHandler = (newValue: dayjs.Dayjs | null) => {
    if (newValue !== null && !dayjs(newValue).isValid()) {
      return;
    }
    const params = new URLSearchParams(searchParams);

    if (newValue === null) {
      params.delete("date");
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    params.set("date", newValue.format("YYYY-MM-DD"));
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultValue={
          searchParams.get("date") ? dayjs(searchParams.get("date")) : null
        }
        sx={{
          color: "#fff",
          backgroundColor: "#16161E",
          borderRadius: "10px",
          outline: "none",
          overflow: "hidden",
          border: "none",
          width: "260px",
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
          actionBar: {
            actions: ["clear"],
            sx: {
              bgColor: "red",
            },
          },
          layout: {
            sx: {
              border: "1px solid",
              backgroundColor: "#b102cd",
              backgroundImage:
                "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
              color: "#fff",
              ".MuiDialogActions-root": {
                ".MuiButtonBase-root": {
                  color: "#fff",
                },
              },
              ".MuiDateCalendar-root": {
                ".MuiDayCalendar-weekDayLabel": {
                  color: "#fff",
                },
                ".MuiPickersDay-root": {
                  color: "#fff",
                  "&.Mui-selected": {
                    backgroundColor: "#b102cd",
                  },
                  "&.MuiPickersDay-today": {
                    borderColor: "#b102cd",
                  },
                },
              },
            },
          },
        }}
        onChange={dateHandler}
      />
    </LocalizationProvider>
  );
}
