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

  const dateHandler = (newValue: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("date", newValue);

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultValue={dayjs(searchParams.get("date")?.toString())}
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
        onChange={(newValue) => {
          //   console.log("change");
          if (newValue) {
            dateHandler(newValue.format("YYYY-MM-DD"));
          }
        }}
      />
    </LocalizationProvider>
  );
}
