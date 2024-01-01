import { Card, InputAdornment, Stack, SxProps, TextField } from "@mui/material";
import CountriesPanel from "../components/CountriesPanel";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { BaseCountry } from "../components";
import { getAllBaseCountries } from "../utils/countriesUtils";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import useGetUser from "../hooks/useGetUser";

const countriesPanelStyle: SxProps = {
  width: "80%",
  backgroundColor: blue[200],
  padding: "2em",
  alignSelf: "center",
  borderRadius: 10,
  maxHeight: '40em',
  overflowY: "auto"
};

const searchFilter: SxProps = {
  width: "25%",
  alignSelf: "center",
  marginBottom: 2
};


const shuffleArray = (array : Array<any>) => array.slice().sort(() => Math.random() - 0.5);

const HomePage = () => {
  const [countries, setCountries] = useState<Array<BaseCountry>>([])
  const [filteredCountries, setFilteredCountries] = useState<Array<BaseCountry>>(countries)
  const [searchText, setSearchText] = useState<string>("")

  useEffect(()=>{
    const fetchCountries = async () => {
      setCountries(shuffleArray(await getAllBaseCountries()));
  };
  fetchCountries()
  }, [])

  useEffect(()=> {
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase())))
  }, [searchText, countries])

  return(<>
    <Stack sx={{ width: "100%", paddingY:5 }}>
      <TextField sx={searchFilter}
       onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
       placeholder="search a country"
       InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <TravelExploreIcon />
          </InputAdornment>
        ),
      }}
        color="info"/>
      <Card sx={countriesPanelStyle}>
        <CountriesPanel countries={filteredCountries}/>
      </Card>
    </Stack>
  </>)
};

export default HomePage;
