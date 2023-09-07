import React from "react"; // Add React import
import Grid from "@mui/material/Grid";
import ApplicationCard from "./card/ApplicationCard";
import ApplicationCardSkeleton from "./card/ApplicationCardSkeleton";
import ApplicationCardContainer from "./card/ApplicationCardContainer";
import { Application } from "../../entities/Application";
import { Container, Pagination } from "@mui/material";
import { FetchResponse } from "../../services/api-client";

interface ApplicationCarouselProps {
  data: FetchResponse<Application>;
  cardsPerPage: number;
  onCardClick: (cardId: string | number) => void;
  onPageChange?: (newPage: number) => void;
  isLoading?: boolean;
}

export default function ApplicationCarousel({
  data,
  cardsPerPage,
  onCardClick,
  onPageChange,
  isLoading,
}: ApplicationCarouselProps) {
  // TODO: Make this Dynamic Maybe
  const skeletons = [1, 2, 3];

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {isLoading ? (
          // Use parentheses for the entire expression
          skeletons.map((_, index) => (
            <ApplicationCardContainer
              key={index}
              index={index}
              cardsPerPage={cardsPerPage}
            >
              <ApplicationCardSkeleton />
            </ApplicationCardContainer>
          ))
        ) : (
          // Use parentheses for the entire expression
          <>
            {data.results.map((card, index) => (
              <ApplicationCardContainer
                key={card.id}
                cardId={card.id}
                index={index}
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
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Pagination
                count={Math.ceil(data.total_count / cardsPerPage)}
                page={data.current_page}
                onChange={(event, newPage) =>
                  onPageChange && onPageChange(newPage)
                }
                size="medium"
                color="primary"
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
