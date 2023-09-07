import { useState } from "react";
import { Alert, Box } from "@mui/material";
import ApplicationCarousel from "./ApplicationCarousel";
import useApplications from "../../hooks/useApplications";

const cardsPerPage = 3;

function Application() {
  const [currentPage, setCurrentPage] = useState(0);
  const dummyCardData = {
    current_page: 1,
    last_page: 1,
    total_count: 7,
    results: [
      {
        id: "64f95fee91387ae2183de50f",
        name: "4th App",
        description: "This application is used for Learning management system",
        is_active: false,
        created_at: "2023-09-07T05:30:22.143Z",
        modified_at: "2023-09-07T05:30:22.143Z",
      },
      {
        id: "64f9686b91387ae2183de514",
        name: "5th App",
        description: "This application is used for Learning management system",
        is_active: false,
        created_at: "2023-09-07T06:06:35.943Z",
        modified_at: "2023-09-07T06:06:35.943Z",
      },
      {
        id: "64f95fdf91387ae2183de509",
        name: "New App",
        description: "This application is used for Learning management system",
        is_active: false,
        created_at: "2023-09-07T05:30:07.882Z",
        modified_at: "2023-09-07T05:30:07.883Z",
      },
      {
        id: "64f976ad5932102c331cadf4",
        name: "New Appppp",
        description: "This application is used for Learning management system",
        is_active: false,
        created_at: "2023-09-07T07:07:25.834Z",
        modified_at: "2023-09-07T07:07:25.834Z",
      },
      {
        id: "64f95fe891387ae2183de50c",
        name: "Third App",
        description: "This application is used for Learning management system",
        is_active: false,
        created_at: "2023-09-07T05:30:16.604Z",
        modified_at: "2023-09-07T05:30:16.604Z",
      },
      {
        id: "64f95fd291387ae2183de504",
        name: "Thrive2s",
        description: "This application is used for Learning management system",
        is_active: false,
        created_at: "2023-09-07T05:29:54.722Z",
        modified_at: "2023-09-07T05:29:54.723Z",
      },
      {
        id: "64f96a7591387ae2183de521",
        name: "appppppp",
        description: "This application is used for Learning management system",
        is_active: false,
        created_at: "2023-09-07T06:15:17.939Z",
        modified_at: "2023-09-07T06:15:17.939Z",
      },
    ],
  };

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
    console.log(`Clicked card ${cardId}`);
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
