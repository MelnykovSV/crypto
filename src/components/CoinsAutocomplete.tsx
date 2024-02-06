"use client";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { searchCoins } from "@/api";
import {
  useDebounceCallback,
  useDebounce,
  useDebounceValue,
} from "usehooks-ts";
import { useEffect, useState } from "react";

interface ICoin {
  name: string;
  symbol: string;
  large: string;
}

interface ICoinsAutocompleteProps {
  selectCoinHandler: (value: string | null) => void;
  label: string;
}

export default function CoinsAutocomplete({
  selectCoinHandler,
  label,
}: ICoinsAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly ICoin[]>([]);
  const [value, setValue] = React.useState(
    options.length > 0 ? options[0] : null
  );

  const [inputValue, setInputValue] = React.useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = React.useState(false);
  const debouncedQuery = useDebounce<string>(query, 500);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await searchCoins(debouncedQuery);
      console.log(data);
      setOptions(data);
      setLoading(false);
    })();
  }, [debouncedQuery]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
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
      value={value}
      onChange={(
        event: React.ChangeEvent<EventTarget>,
        newValue: ICoin | null
      ) => {
        setValue(newValue || null);

        console.log("newValue");
        console.log(newValue);
        selectCoinHandler(newValue ? newValue.symbol : null);
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
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
