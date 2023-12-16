import { useEffect, useState } from "react";
import { getAllCountries } from "../utils/countriesUtils";
import CountryButton from "./CountryButton";
import { Grid, ListItem } from "@mui/material";

const shuffleArray = (array) => array.slice().sort(() => Math.random() - 0.5);

const CountriesPanel = () => {
  const [countries, setCountries] = useState<any>([]);

  useEffect( () => {
    const fetchCountries = async () => {
        setCountries(shuffleArray(await getAllCountries()));
    };
    fetchCountries();
  }, []);

  return (
    <Grid container spacing={5}>
      {countries && countries.map(
        (country, index) => index < 48 && <Grid item xs={1}><CountryButton country={country} /></Grid>
      )}
    </Grid>
  );
};

export default CountriesPanel;
