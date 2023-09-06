import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";

export default function ApplicationCardSkeleton() {
  const skeletons = Array.from(Array(3).keys());
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
        {skeletons.map((skeleton) => (
          <Skeleton
            key={skeleton}
            animation="wave"
            height={40}
            width="100%"
            sx={{ m: 1 }}
          />
        ))}
      </CardActions>
    </Card>
  );
}
