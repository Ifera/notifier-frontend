import Grid from "@mui/material/Grid";
import ApplicationCard from "./ApplicationCard";
import ApplicationCardSkeleton from "./ApplicationCardSkeleton";
import ApplicationCardContainer from "./ApplicationCardContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { CardDataItem } from ".";

interface ApplicationCarouselProps {
  currentPage: number;
  cardData: CardDataItem[];
  cardsPerPage: number;
  onNextClick?: (newPage: number) => void;
  onPrevClick?: (newPage: number) => void;
  isLoading?: boolean;
}

export default function ApplicationCarousel({
  currentPage,
  cardData,
  cardsPerPage,
  onNextClick,
  onPrevClick,
  isLoading,
}: ApplicationCarouselProps) {
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleCards = cardData.slice(startIndex, endIndex);

  const skeletons = [1, 2, 3];

  return (
    <Grid container spacing={2} justifyContent="center">
      {/* TODO: Refactor this to a CarouselNavigationButton Component */}
      <Grid item xs={1}>
        <IconButton
          aria-label="previous"
          onClick={() => onPrevClick && onPrevClick(currentPage - 1)}
          disabled={currentPage === 0}
        >
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
          {isLoading
            ? skeletons.map((_, index) => (
                <ApplicationCardContainer
                  index={index}
                  cardsPerPage={cardsPerPage}
                >
                  <ApplicationCardSkeleton />
                </ApplicationCardContainer>
              ))
            : visibleCards.map((card, index) => (
                <ApplicationCardContainer
                  index={index}
                  cardsPerPage={cardsPerPage}
                >
                  <ApplicationCard
                    title={card.title}
                    description={card.description}
                  />
                </ApplicationCardContainer>
              ))}
        </div>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          aria-label="next"
          onClick={() => onNextClick && onNextClick(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(cardData.length / cardsPerPage) - 1
          }
        >
          <ArrowForwardIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
