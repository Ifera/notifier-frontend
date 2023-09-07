import Grid from "@mui/material/Grid";
import ApplicationCard from "./card/ApplicationCard";
import ApplicationCardSkeleton from "./card/ApplicationCardSkeleton";
import ApplicationCardContainer from "./card/ApplicationCardContainer";
import { Application } from "../../entities/Application";
import { Container, Pagination } from "@mui/material";

interface ApplicationCarouselProps {
  currentPage: number;
  cardData: Application[];
  cardsPerPage: number;
  totalCount: number;
  currentIndex: number;
  onCardClick: (cardId: string | number) => void;
  onPageChange?: (newPage: number) => void;
  isLoading?: boolean;
}

export default function ApplicationCarousel({
  currentPage,
  cardData,
  cardsPerPage,
  totalCount,
  currentIndex,
  onCardClick,
  onPageChange,
  isLoading,
}: ApplicationCarouselProps) {
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleCards = cardData.slice(startIndex, endIndex);

  // TODO: Make this Dynamic Maybe
  const skeletons = [1, 2, 3];

  return (
    <Container sx={{ py: 8 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        mb={4}
      >
        {isLoading
          ? skeletons.map((_, index) => (
              <ApplicationCardContainer
                key={index}
                index={index}
                currentIndex={currentIndex}
                cardsPerPage={cardsPerPage}
              >
                <ApplicationCardSkeleton />
              </ApplicationCardContainer>
            ))
          : visibleCards.map((card, index) => (
              <ApplicationCardContainer
                key={card.id}
                cardId={card.id}
                index={index}
                currentIndex={currentIndex}
                cardsPerPage={cardsPerPage}
              >
                <ApplicationCard
                  cardId={card.id}
                  title={card.name}
                  description={card.description}
                  onCardClick={onCardClick}
                />
              </ApplicationCardContainer>
            ))}
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Pagination
          count={Math.ceil(totalCount / cardsPerPage)}
          page={currentPage + 1}
          onChange={(event, newPage) =>
            onPageChange && onPageChange(newPage - 1)
          }
          size="medium"
          color="primary"
        />
      </Grid>
    </Container>
  );
}
