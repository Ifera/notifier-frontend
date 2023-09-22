import { CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

export default function ApplicationCardSkeleton() {
  // TODO: Map this with page size field
  const skeletons = Array.from(Array(3).keys());
  return (
    <>
      <CardContent sx={{ flexGrow: 1, minHeight: { xs: '65px', sm: '75px' } }}>
        <Skeleton animation='wave' height={45} width='80%' />
        <Skeleton animation='wave' height={20} width='60%' />
      </CardContent>
      <CardActions>
        {skeletons.map((skeleton) => (
          <Skeleton key={skeleton} animation='wave' height={40} width='100%' sx={{ m: 1 }} />
        ))}
      </CardActions>
    </>
  );
}
