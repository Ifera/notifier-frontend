import { Grid, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface CarouselNavigationButtonProps {
  currentPage: number;
  cardDataLength: number;
  cardsPerPage: number;
  onClick?: (newPage: number) => void;
}

const CarouselButton = ({
  currentPage,
  cardDataLength,
  cardsPerPage,
  onClick,
}: CarouselNavigationButtonProps) => {
  return (
    <Grid item xs={1}>
      <IconButton
        onClick={() => onClick && onClick(currentPage + 1)}
        disabled={currentPage === Math.ceil(cardDataLength / cardsPerPage) - 1}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Grid>
  );
};

export default CarouselButton;
