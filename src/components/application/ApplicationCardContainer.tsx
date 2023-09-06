import { Grid, Slide } from "@mui/material";

interface ApplicationCardContainerProps {
  cardId?: number;
  index: number;
  cardsPerPage: number;
  children: React.ReactNode;
}

const ApplicationCardContainer = ({
  index,
  cardsPerPage,
  children,
}: ApplicationCardContainerProps) => {
  return (
    <Slide
      key={index}
      direction="left"
      in={index < cardsPerPage}
      mountOnEnter
      unmountOnExit
    >
      <Grid item key={index} xs={12} sm={6} md={4} m={2}>
        {children}
      </Grid>
    </Slide>
  );
};

export default ApplicationCardContainer;
