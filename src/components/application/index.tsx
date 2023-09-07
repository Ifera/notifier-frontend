import { useState } from "react";
import { Box } from "@mui/material";
import ApplicationCarousel from "./ApplicationCarousel";
import useApplications from "../../hooks/useApplications";

const cardsPerPage = 3;

function Application() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, error } = useApplications({
    pageNumber: currentPage,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setCurrentIndex(newPage * cardsPerPage);
  };

  const handleCardClick = (cardId: string | number) => {
    console.log(`Clicked card ${cardId}`);
  };

  console.log(data);
  console.log(currentPage);
  return (
    <Box>
      <ApplicationCarousel
        cardData={data?.results || []}
        currentPage={currentPage}
        totalCount={data?.total_count || 0}
        currentIndex={currentIndex}
        onPageChange={handlePageChange}
        onCardClick={handleCardClick}
        cardsPerPage={cardsPerPage}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default Application;
