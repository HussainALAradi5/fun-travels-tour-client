import { useParams } from "@/lib/navigation";
import { BookingManager } from "@/components/TourManagement/BookingManager";

const BookingPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  return <BookingManager tourId={tourId} />;
};

export default BookingPage;
