import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ApplicationCarousel from './ApplicationCarousel';

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
          title: 'Application 1',
          description:
            'This is the description of the app. The description can also be a bit longer but okay.',
        },
        {
          id: 2,
          title: 'Application 2',
          description:
            'This is the description of the app. The description can also be a bit longer but okay.',
        },
        {
          id: 3,
          title: 'Application 3',
          description:
            'This is the description of the app. The description can also be a bit longer but okay.',
        },
        {
          id: 4,
          title: 'Application 4',
          description:
            'This is the description of the app. The description can also be a bit longer but okay.',
        },
        {
          id: 5,
          title: 'Application 5',
          description:
            'This is the description of the app. The description can also be a bit longer but okay.',
        },
        {
          id: 6,
          title: 'Application 6',
          description:
            'This is the description of the app. The description can also be a bit longer but okay.',
        },
        {
          id: 7,
          title: 'Application 7',
          description:
            'This is the description of the app. The description can also be a bit longer but okay.',
        },
        {
          id: 8,
          title: 'Application 8',
          description:
            'This is the description of the app. The description can also be a bit longer but okay.',
        },
      ];

      setCardData(mockCardData);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Box>
      <ApplicationCarousel
        cardData={cardData}
        currentPage={currentPage}
        totalCount={cardData.length}
        onPageChange={handlePageChange}
        cardsPerPage={cardsPerPage}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default Application;
