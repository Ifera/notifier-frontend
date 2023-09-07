import { Card, Grid, Slide } from "@mui/material";

interface ApplicationCardContainerProps {
  cardId?: string | number;
  index: number;
  cardsPerPage: number;
  currentIndex: number;
  children: React.ReactNode;
}

const ApplicationCardContainer = ({
  cardId,
  index,
  cardsPerPage,
  currentIndex,
  children,
}: ApplicationCardContainerProps) => {
  return (
    <Slide
      key={index}
      direction={index < currentIndex ? "left" : "right"}
      in={index < cardsPerPage}
      mountOnEnter
      unmountOnExit
    >
      <Grid
        item
        key={cardId === undefined ? index : cardId}
        xs={12}
        sm={6}
        md={4}
      >
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            minWidth: 275,
          }}
        >
          {children}
        </Card>
      </Grid>
    </Slide>
  );
};

export default ApplicationCardContainer;
