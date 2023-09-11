import { Container, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Application,
  FetchResponse,
  UseDeleteHookResult,
  UseEditHookResult,
} from '../../interfaces';
import ApplicationCard from './card/ApplicationCard';
import ApplicationCardContainer from './card/ApplicationCardContainer';
import ApplicationCardSkeleton from './card/ApplicationCardSkeleton';

interface ApplicationCarouselProps {
  data: FetchResponse<Application>;
  cardsPerPage: number;
  editHook: UseEditHookResult;
  delHook: UseDeleteHookResult;
  isLoading?: boolean;
  onCardClick: (cardId: string | number) => void;
  onPageChange?: (newPage: number) => void;
  onClickEditBtn?: (data: Application) => void;
}

function ApplicationCarousel({
  data,
  cardsPerPage,
  editHook,
  delHook,
  isLoading,

  onCardClick,
  onPageChange,
  onClickEditBtn,
}: ApplicationCarouselProps) {
  // TODO: Make this Dynamic Maybe
  const skeletons = [1, 2, 3];

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4} justifyContent='center' alignItems='center'>
        {isLoading ? (
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
          <>
            {data.results.map((app, index) => (
              <ApplicationCardContainer
                key={app.id}
                cardId={app.id}
                index={index}
                cardsPerPage={cardsPerPage}
              >
                <ApplicationCard
                  application={app}
                  editHook={editHook}
                  delHook={delHook}
                  onCardClick={onCardClick}
                  onClickEditBtn={onClickEditBtn}
                />
              </ApplicationCardContainer>
            ))}

            <Grid
              container
              justifyContent='center'
              alignItems='center'
              sx={{ mt: 2 }}
            >
              <Pagination
                count={Math.ceil(data.total_count / cardsPerPage)}
                page={data.current_page}
                onChange={(event, newPage) => {
                  onPageChange && onPageChange(newPage);
                }}
                size='medium'
                color='primary'
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default ApplicationCarousel;
