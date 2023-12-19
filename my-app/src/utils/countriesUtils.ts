import axios from "axios";
import { BaseCountry, Country } from "../components";

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
export const getAllBaseCountries =async () => 
  await axios
    .get("https://restcountries.com/v3.1/all/?fields=name,flags")
    .then(function (response) {
      const countries: Array<BaseCountry> = response?.data?.map((country: any) => ({
        name: country.name.common,
        flag: country.flags.png
      }));

      return countries;
    })
    .catch(function (error) {
      throw `error fetching all countries: ${error}`;
    });
;

export const getCountry =async (name : string) => 
  await axios
    .get(`https://restcountries.com/v3.1/name/${name}`)
    .then(function (response) {
      const country = response?.data[0]
      return {
        name: country.name.common,
        flag: country.flags.png,
        borders: country.borders ?? [],
        continents: country.continents ?? [],
        capital: (country.capital && country.capital[0]) || "-",
        map: country.maps.googleMaps,
        population : country.population,
        area : country.area
      } as Country;
    })
    .catch(function (error) {
      throw `error fetching all countries: ${error}`;
    });
;

export const getBaseByCodes =async (codes : Array<string>) => 
  await axios
  .get(`https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}`)
  .then(function (response) {
    const countries: Array<BaseCountry> = response?.data?.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.png
    }));

    return countries;
  })
  .catch(function (error) {
    throw `error fetching all countries: ${error}`;
  });
;
