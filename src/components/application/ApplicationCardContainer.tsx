import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ApplicationCard from "./ApplicationCard";

const cards = [1, 2, 3];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ApplicationCardContainer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <ApplicationCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
