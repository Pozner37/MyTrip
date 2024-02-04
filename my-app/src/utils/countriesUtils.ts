import axios from "axios";

export const getAllBaseCountries = () => 
  getBaseCountries("https://restcountries.com/v3.1/all/?fields=name,flags");

export const getBaseCountriesByCode = (codes : Array<string>) => 
  getBaseCountries(`https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}`);

export const getCountryByName = (name : string) => 
  getCountry(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

export const getCountryFlag = async (name : string) => 
  await getCountryByName(name).then(res => res.flag);

const getBaseCountries =async (path : string) => 
  await axios
    .get(path)
    .then(function (response) {
      return response?.data?.map((country: any) => ({
        name: country.name.common,
        flag: country.flags.png
      }));
    })
    .catch(function (error) {
      throw `error fetching base countries: ${error}`;
    });
;

const getCountry =async (path : string) => 
  await axios
    .get(path)
    .then(response => {
      const country = response?.data[0]
      return ({
        name: country.name.common,
        flag: country.flags.png,
        borders: country.borders ?? [],
        continents: country.continents ?? [],
        capital: (country.capital && country.capital[0]) || "-",
        map: country.maps.googleMaps,
        population : country.population,
        area : country.area
      });
    })
    .catch(function (error) {
      throw `error fetching a country: ${error}`;
    });
;
