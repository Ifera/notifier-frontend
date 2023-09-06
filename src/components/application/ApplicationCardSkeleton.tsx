import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";

export default function ApplicationCardSkeleton() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton animation="wave" height={40} width="80%" />
        <Skeleton animation="wave" height={20} width="60%" />
      </CardContent>
      <CardActions>
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={36}
          width={80}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={36}
          width={80}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={36}
          width={100}
        />
      </CardActions>
    </Card>
  );
}
