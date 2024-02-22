"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { searchCoins } from "@/api";
import {
  useDebounceCallback,
  useDebounce,
  useDebounceValue,
} from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
interface ICoinGeckoCoin {
  name: string;
  symbol: string;
  large: string;
  market_cap_rank: number;
  id: string;
}
interface ICoin {
  name: string;
  symbol: string;
  logo: string;
  market_cap_rank: number;
  coinGeckoId: string;
}

interface ICoinsAutocompleteProps {
  selectCoinHandler: (value: ICoin) => void;
  label: string;
}

export default function CoinsAutocomplete({
  selectCoinHandler,
  label,
}: ICoinsAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly ICoinGeckoCoin[]>([]);
  // const [value, setValue] = useState(() =>
  //   options.length > 0 ? options[0] : null
  // );
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce<string>(query, 500);

  console.log("loading", loading);

  const firstUpdate = useRef(true);

  useEffect(() => {
    (async () => {
      console.log(firstUpdate.current);
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setLoading(true);
      const data = await searchCoins(debouncedQuery);
      console.log(data);
      setOptions(data);
      setLoading(false);
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
      getOptionLabel={(option) =>
        `${option.name} (${option.symbol}) #${option.market_cap_rank}`
      }
      options={options}
      loading={loading}
      // value={value}
      onChange={(
        event: React.ChangeEvent<EventTarget>,
        newValue: ICoinGeckoCoin | null
      ) => {
        // setValue(newValue || null);

        if (newValue) {
          console.log("newValue");
          console.log(newValue);

          console.log(options);

          const {
            id: coinGeckoId,
            large: logo,
            market_cap_rank,
            name,
            symbol,
          } = newValue;

          console.log({ coinGeckoId, logo, market_cap_rank, name, symbol });
          selectCoinHandler({
            coinGeckoId,
            logo,
            market_cap_rank,
            name,
            symbol,
          });
        }
      }}
      inputValue={inputValue}
      onInputChange={async (
        event: React.ChangeEvent<EventTarget>,
        newInputValue,
        reason
      ) => {
        setInputValue(newInputValue);

        console.log(newInputValue);

        if (reason === "input" && newInputValue.length > 1) {
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
