import CountryButton from "./CountryButton";
import { Grid } from "@mui/material";
import { BaseCountry } from ".";

interface CountriesPanelProps {
  countries : Array<BaseCountry>
}

const CountriesPanel = ({countries} : CountriesPanelProps) => {

  return (
    <>
    <Grid container spacing={5}>
      {countries && countries.map(
        (country, index) => <Grid item xs={1} key={index}><CountryButton country={country} /></Grid>
      )}
    </Grid>
    </>
  );
};

export default CountriesPanel;
