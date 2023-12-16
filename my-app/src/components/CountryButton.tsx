import { Avatar, Tooltip } from "@mui/material";
import { Country } from ".";
import { getAllCountries } from "../utils/countriesUtils";

interface CountryButtonProps {
  country: Country;
}

const CountryButton = ({ country }: CountryButtonProps) => {
  const openCountryPage = () => {
    // TODO: implement moving to country page
  };
  return (
    <Tooltip title={country.name} sx={{cursor: 'pointer'}}>
      <Avatar src={country.flag} onClick={openCountryPage} sx={{width: 56, height: 56}}/>
    </Tooltip>
  );
};

export default CountryButton;
