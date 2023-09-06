import React, { useState, useEffect } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import ApplicationCarousel from "./ApplicationCarousel";

// Define your CardDataItem type
export interface CardDataItem {
  id: number;
  title: string;
  description: string;
}

const cardsPerPage = 3;

function Application() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardData, setCardData] = useState<CardDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockCardData: CardDataItem[] = [
        {
          id: 1,
          title: "Application 1",
          description:
            "This is the description of the app. The description can also be a bit longer but okay.",
        },
        {
          id: 2,
          title: "Application 2",
          description:
            "This is the description of the app. The description can also be a bit longer but okay.",
        },
        {
          id: 3,
          title: "Application 3",
          description:
            "This is the description of the app. The description can also be a bit longer but okay.",
        },
        {
          id: 4,
          title: "Application 4",
          description:
            "This is the description of the app. The description can also be a bit longer but okay.",
        },
        {
          id: 5,
          title: "Application 5",
          description:
            "This is the description of the app. The description can also be a bit longer but okay.",
        },
        {
          id: 6,
          title: "Application 6",
          description:
            "This is the description of the app. The description can also be a bit longer but okay.",
        },
        {
          id: 7,
          title: "Application 7",
          description:
            "This is the description of the app. The description can also be a bit longer but okay.",
        },
        {
          id: 8,
          title: "Application 8",
          description:
            "This is the description of the app. The description can also be a bit longer but okay.",
        },
      ];

      setCardData(mockCardData);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(cardData.length / cardsPerPage) - 1)
    );
  };

  return (
    <Box className="App">
      <Toolbar color="primary">
        <Typography>Application</Typography>
      </Toolbar>

      <ApplicationCarousel
        cardData={cardData}
        currentPage={currentPage}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        cardsPerPage={cardsPerPage}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default Application;
