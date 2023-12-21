import { Chip, ChipProps } from "@mui/material";

const CountryInfoChip = (props : ChipProps) => {
return  <Chip variant="filled" color="primary" sx={{justifyContent:'flex-start', marginTop:1}} {...props}/>
}

export default CountryInfoChip;