import {
  Groups,
  Landscape,
  LocationCity,
  LocationOn,
  Public,
} from "@mui/icons-material";
import {
  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseCountry, Country } from ".";
import CountryButton from "./CountryButton";
import { blue } from "@mui/material/colors";
import {
  getBaseCountriesByCode,
  getCountryByName,
} from "../utils/countriesUtils";
import CountryInfoChip from "./CountryInfoChip";

const CountryCardStyle: SxProps = {
  marginTop: 10,
  marginLeft: 5,
  padding: 1,
  width: "fit-content",
  maxWidth: "250px",
  borderColor: blue[300],
  backgroundColor: blue[100],
  borderRadius: 5,
  position: 'absolute'
};

interface CountryCardProps {
  name: string | undefined;
}

const CountryCard = ({ name }: CountryCardProps) => {
  const [country, setCountry] = useState<Country>();
  const [bordersBase, setBordersBase] = useState<Array<BaseCountry>>();

  useEffect(() => {
    const fetchCountries = async () =>
      name && setCountry(await getCountryByName(name));

    fetchCountries();
  }, [name]);

  useEffect(() => {
    const fetchBaseCountries = async () =>
      country &&
      country.borders.length &&
      setBordersBase(await getBaseCountriesByCode(country?.borders));
    fetchBaseCountries();
  }, [country]);

  return (
    <>
      {country && (
        <Card variant="outlined" sx={CountryCardStyle}>
          <CardMedia
            component="img"
            height="150"
            src={country.flag}
            alt={country.name}
            sx={{ borderRadius: 5 }}
          />
          <CardContent>
            <Typography fontSize={30} fontWeight="bold" textAlign="center">
              {country.name}
            </Typography>
            <Stack>
              <CountryInfoChip
                icon={<LocationCity />}
                label={`Capital: ${country.capital}`}
              />
              <CountryInfoChip
                icon={<Public />}
                label={`Continents: ${country.continents.join(" , ")}`}
              />
              <CountryInfoChip
                icon={<Groups />}
                label={`Population: ${country.population.toLocaleString()}`}
              />
              <CountryInfoChip
                icon={<Landscape />}
                label={`Area: ${country.area.toLocaleString()}`}
              />
            </Stack>
          </CardContent>
          <Box
            display={"flex"}
            flex-direction="row"
            justifyContent="space-between"
          >
            <AvatarGroup>
              {bordersBase?.map((country, index) => (
                <CountryButton key={index} country={country} size={30} />
              ))}
            </AvatarGroup>
            {country.map && (
              <Link to={country.map} target="_blank">
                <Tooltip title="Location">
                  <IconButton
                    sx={{ backgroundColor: "#1967d2", color: "white" }}
                  >
                    <LocationOn />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </Box>
        </Card>
      )}
    </>
  );
};

export default CountryCard;
