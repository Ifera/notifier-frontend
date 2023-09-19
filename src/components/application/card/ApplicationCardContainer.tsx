import { Card, Grid, Slide } from '@mui/material';
import { useBetween } from 'use-between';
import { ID } from '../../../interfaces';
import { dashboardState } from '../../../pages/Dashboard';

interface ApplicationCardContainerProps {
  cardId?: ID;
  index: number;
  cardsPerPage: number;
  children: React.ReactNode;
}

const ApplicationCardContainer = ({
  cardId,
  index,
  cardsPerPage,
  children,
}: ApplicationCardContainerProps) => {
  const { selectedApp } = useBetween(dashboardState);

  return (
    <Slide
      key={index}
      direction='right'
      in={index < cardsPerPage}
      mountOnEnter
      unmountOnExit
    >
      <Grid item key={cardId === undefined ? index : cardId} xs={12} sm={4}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: cardId === selectedApp ? '1px solid #aaa' : 'none',
          }}
        >
          {children}
        </Card>
      </Grid>
    </Slide>
  );
};

export default ApplicationCardContainer;
