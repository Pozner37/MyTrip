import { Groups, Landscape, LocationCity, LocationOn, Public } from "@mui/icons-material";
import { AvatarGroup, Card, CardContent, CardMedia, IconButton, Stack, SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { BaseCountry, Country } from ".";
import CountryButton from "./CountryButton";
import { blue } from "@mui/material/colors";
import { getBaseCountriesByCode, getCountryByName } from "../utils/countriesUtils";
import CountryInfoChip from "./CountryInfoChip";

const CountryCardStyle : SxProps = {
    marginTop : 10,
    marginLeft:5,
    padding:1,
    width:'fit-content',
    maxWidth:'250px',
    borderColor: blue[300],
    backgroundColor : blue[100],
    borderRadius: 5
}

const CountryPage = () => {
    const [country, setCountry] = useState<Country>();
    const [bordersBase, setBordersBase] = useState<Array<BaseCountry>>();
    const {name} = useParams();

    useEffect(() => {
        const fetchCountries = async () => 
          name && setCountry(await getCountryByName(name));

      fetchCountries()
      }, [name])

      useEffect(() => {
        const fetchBaseCountries = async () => 
          country && country.borders.length && setBordersBase(await getBaseCountriesByCode(country?.borders));
      ;
      fetchBaseCountries()
      }, [country])

    return (<>
    { country &&
        <Card variant="outlined" sx={CountryCardStyle}>
        <CardMedia
          component="img"
          height="150"
          src={country.flag}
          alt={country.name}
          sx={{borderRadius:5}}
        />
        <CardContent>
        <Typography fontSize={30} fontWeight="bold" textAlign='center'>{country.name}</Typography>
        <Stack >
          <CountryInfoChip icon={<LocationCity />} label={country.capital} />
          <CountryInfoChip icon={<Public />} label={country.continents.join(' , ')} />
          <CountryInfoChip icon={<Groups />} label={country.population.toLocaleString()} />
          <CountryInfoChip icon={<Landscape />} label={country.area.toLocaleString()} />
        </Stack>
        </CardContent>
        <div style={{display:'flex', flexDirection :'row', justifyContent:'space-between'}}>
        <AvatarGroup>{bordersBase?.map((country, index) => <CountryButton country={country} size={30}/>)}</AvatarGroup>
          {country.map && <Link to={country.map} target="_blank">
          <IconButton sx={{backgroundColor:'#1967d2', color:'white'}}>
            <LocationOn />
          </IconButton>
        </Link>}
        </div>
    </Card>
  }
    </>
    )
}

export default CountryPage