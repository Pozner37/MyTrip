import { Card, Stack, SxProps } from "@mui/material";
import CountriesPanel from "../components/CountriesPanel";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { blue } from "@mui/material/colors";

const countriesPanelStyle: SxProps = {
  width: "80%",
  backgroundColor: blue[200],
  padding: "2em",
  alignSelf: "center",
  borderRadius: 10,
};

const HomePage = () => (
  <>
    <ResponsiveAppBar />
    <Stack sx={{ width: "100%" }}>
      <Card sx={countriesPanelStyle}>
        <CountriesPanel />
      </Card>
    </Stack>
  </>
);

export default HomePage;
