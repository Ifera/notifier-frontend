import { useState } from "react";
import { Alert, Box } from "@mui/material";
import ApplicationCarousel from "./ApplicationCarousel";
import useApplications from "../../hooks/useApplications";

// TODO: MOVE TO CONFIG FILE
const cardsPerPage = 3;

function Application(props) {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, error } = useApplications({
    pageNumber: currentPage,
  });

  if (error)
    return (
      <Alert severity="error">
        An error occurred while loading the applications
      </Alert>
    );

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCardClick = (cardId: string | number) => {
    props.setEventId(cardId);
  };

  return (
    <Box>
      <ApplicationCarousel
        data={data}
        cardsPerPage={cardsPerPage}
        onCardClick={handleCardClick}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default Application;
