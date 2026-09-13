import { notFound } from "next/navigation";
import ComponentShowcaseDetailPage from "@/features/ComponentShowcaseDetailPage";
import { componentCatalog, getComponentShowcaseItem } from "@/constants/showcase/componentCatalog";
import type { ComponentPageProps } from "@/interface/props/showcase/ComponentPageProps";

export const generateStaticParams = () => componentCatalog.map(({ slug }) => ({ slug }));

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const item = getComponentShowcaseItem(slug);
  if (!item) notFound();
  return <ComponentShowcaseDetailPage item={item} />;
}
