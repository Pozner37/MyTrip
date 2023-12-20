import { Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BaseCountry } from ".";

interface CountryButtonProps {
  country: BaseCountry;
  size?: number;
}

const CountryButton = ({ country, size }: CountryButtonProps) => {
  const navigate = useNavigate();

  const openCountryPage = () => {
    navigate(`/country/${country.name}`);
  };

  return (
    <Tooltip title={country.name} sx={{ cursor: "pointer" }}>
      <Avatar
        src={country.flag}
        onClick={openCountryPage}
        sx={{ width: size ?? 56, height: size ?? 56, cursor: "pointer" }}
      />
    </Tooltip>
  );
};

export default CountryButton;
