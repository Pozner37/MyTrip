import { LocationOn } from "@mui/icons-material";
import { Card, CardContent, CardMedia, IconButton, Stack, SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { BaseCountry, Country } from ".";
import { getBaseByCodes, getCountry } from "../utils/countriesUtils";
import CountryButton from "./CountryButton";
import { blue } from "@mui/material/colors";

const CountryCardStyle : SxProps = {
    marginTop : 10,
    marginLeft:5,
    padding:2,
    width:'fit-content',
    maxWidth:'250px',
    backgroundColor : blue[100]
}

const CountryPage = () => {
    const [country, setCountry] = useState<Country>();
    const [bordersBase, setBordersBase] = useState<Array<BaseCountry>>();
    const {name} = useParams();

    useEffect(()=>{
        const fetchCountries = async () => 
          name && setCountry(await getCountry(name));
      ;
      fetchCountries()
      }, [name])

      useEffect(() => {
        const fetchBaseCountries = async () => 
          country && country.borders.length && setBordersBase(await getBaseByCodes(country?.borders));
      ;
      fetchBaseCountries()
      }, [country])

    return (<>{ country &&
        <Card sx={CountryCardStyle}>
        <CardMedia
          component="img"
          height="150"
          src={country.flag}
          alt={country.name}
        />
        <CardContent>
        <Typography fontSize={30} fontWeight="bold" textAlign='center'>{country.name}</Typography>
        <Stack>
          <Typography>
          Capital : {country.capital}
          </Typography>
          {country.borders.length > 0 && <Typography sx={{display:'flex', flexWrap:'wrap', alignItems : 'center'}} >
          Borders : 
          {bordersBase?.map((country, index) => <div key={index} style={{padding:3}}><CountryButton country={country} size={30}/></div>)}
          </Typography>}
          <Typography>
          Continents : {country.continents.join(' , ')}
          </Typography>
          <Typography>
          Population : {country.population.toLocaleString()}
          </Typography>
          <Typography>
          Area : {country.area.toLocaleString()}
          </Typography>
        </Stack>
        </CardContent>
      {country.map && <Link to={country.map} target="_blank">
      <IconButton sx={{backgroundColor:'#1967d2', color:'white', float:'right'}}>
        <LocationOn />
      </IconButton>
    </Link>}
    </Card>
  }
    </>
    )
}

export default CountryPage