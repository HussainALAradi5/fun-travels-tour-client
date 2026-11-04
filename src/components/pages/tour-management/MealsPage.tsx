
import { MealPlanManager } from "@/components/tour-management/MealPlanManager";
import { PageWrapper } from "@/components/ui/custom/PageWrapper";

const MealsPage = () => (
  <PageWrapper title="Meal Management" subtitle="Manage dining options." imageUrl="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600">
    <MealPlanManager />
  </PageWrapper>
);

export default MealsPage;
