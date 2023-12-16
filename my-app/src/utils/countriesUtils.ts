import axios from "axios";
import { Country } from "../components";

export const getAllCountries =async () => 
  await axios
    .get("https://restcountries.com/v3.1/all")
    .then(function (response) {
      const countries: Array<Country> = response?.data?.map((country: any) => ({
        name: country.name.common,
        flag: country.flags.png,
        continents: country.continents,
        capital: (country.capital && country.capital[0]) || "-",
      }));

      return countries;
    })
    .catch(function (error) {
      throw `error fetching all countries: ${error}`;
    });
;
