"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { parseStrToJSON } from "@/app/lib";
import { toast } from "react-toastify";
import { getPortfolioCoins } from "@/app/actions";
import { useDebounce } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import { IPortfolioCoin } from "@/interfaces";

interface ICoinsAutocompleteProps {
  selectCoinHandler: (value: IPortfolioCoin | null) => void;
  label: string;
}

export default function CoinsFromAutocomplete({
  selectCoinHandler,
  label,
}: ICoinsAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly IPortfolioCoin[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce<string>(query, 500);

  const firstUpdate = useRef(true);

  useEffect(() => {
    (async () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
      }

      const res = await getPortfolioCoins();

      if (res instanceof Object && "error" in res) {
        toast.error(res.error);
        return;
      }

      setOptions(parseStrToJSON(res));
    })();
  }, [debouncedQuery]);

  return (
    <Autocomplete
      sx={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#2B2C3B",

        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "10px",
        },
        "& .MuiInputBase-input": {
          color: "#fff",
        },
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => `${option.name} (${option.symbol})`}
      options={options}
      loading={loading}
      onChange={(
        event: React.ChangeEvent<EventTarget>,
        newValue: IPortfolioCoin | null
      ) => {
        if (newValue) {
          selectCoinHandler(newValue);
        }
      }}
      inputValue={inputValue}
      onInputChange={async (
        event: React.ChangeEvent<EventTarget>,
        newInputValue,
        reason
      ) => {
        setInputValue(newInputValue);

        if (reason === "clear") {
          setQuery("");
          selectCoinHandler(null);
        } else if (reason === "input" && newInputValue.length > 1) {
          setQuery(newInputValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
