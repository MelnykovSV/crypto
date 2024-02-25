"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { searchCoins } from "@/api";
import { useDebounce } from "usehooks-ts";
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
  selectCoinHandler: (value: ICoin | null) => void;
  label: string;
}

export default function CoinsAutocomplete({
  selectCoinHandler,
  label,
}: ICoinsAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly ICoinGeckoCoin[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce<string>(query, 500);

  const firstUpdate = useRef(true);

  useEffect(() => {
    (async () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setLoading(true);
      const data = await searchCoins(debouncedQuery);
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
      getOptionLabel={(option) => `${option.name} (${option.symbol})`}
      options={options}
      loading={loading}
      onChange={(
        event: React.ChangeEvent<EventTarget>,
        newValue: ICoinGeckoCoin | null
      ) => {
        if (newValue) {
          const {
            id: coinGeckoId,
            large: logo,
            market_cap_rank,
            name,
            symbol,
          } = newValue;

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
