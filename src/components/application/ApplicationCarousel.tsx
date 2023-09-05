import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ApplicationCard from "./ApplicationCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";

const cardData = [
  {
    title: "Application 1",
    description: "This is the first application",
  },
  {
    title: "Application 2",
    description: "This is the second application",
  },
  {
    title: "Application 3",
    description: "This is the third application",
  },
  {
    title: "Application 4",
    description: "This is the fourth application",
  },
  {
    title: "Application 5",
    description: "This is the fifth application",
  },
  {
    title: "Application 6",
    description: "This is the sixth application",
  },
  {
    title: "Application 7",
    description: "This is the seventh application",
  },
];

const cardsPerPage = 3;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ApplicationCarousel() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(cardData.length / cardsPerPage) - 1)
    );
  };

  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleCards = cardData.slice(startIndex, endIndex);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ py: 8 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={1}>
            <IconButton onClick={handlePrevClick} disabled={currentPage === 0}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {visibleCards.map((card, index) => (
                <Slide
                  key={index}
                  direction={"left"}
                  in={true}
                  mountOnEnter
                  unmountOnExit
                >
                  <div style={{ padding: 16 }}>
                    <ApplicationCard
                      title={card.title}
                      description={card.description}
                    />
                  </div>
                </Slide>
              ))}
            </div>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={handleNextClick}
              disabled={
                currentPage === Math.ceil(cardData.length / cardsPerPage) - 1
              }
            >
              <ArrowForwardIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
