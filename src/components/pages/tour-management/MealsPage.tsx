
import { MealPlanManager } from "@/components/tour-management/MealPlanManager";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";
import { IMAGES } from "@/constants/ui/images";

const MealsPage = () => (
  <PageWrapper title="Meal Management" subtitle="Manage dining options." imageUrl={IMAGES.meals}>
    <MealPlanManager />
  </PageWrapper>
);

export default MealsPage;
