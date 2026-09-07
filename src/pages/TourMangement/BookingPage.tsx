// src/pages/TourManagement/BookingPage.tsx
import { useParams } from "react-router-dom";
import { BookingManager } from "@/components/TourManagement/BookingManager";

const BookingPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  return <BookingManager tourId={tourId} />;
};

export default BookingPage;