"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Box, Button, Code, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ArrowLeft, CalendarDays, Check, CircleDollarSign, Inbox, Plane } from "lucide-react";
import { AlertComponent } from "@/components/ui/Custom/AlertComponent";
import { CapacityProgress } from "@/components/ui/Custom/CapacityProgress";
import { ContentCard } from "@/components/ui/Custom/ContentCard";
import { DatePicker } from "@/components/ui/Custom/DatePicker";
import { EmptyState } from "@/components/ui/Custom/EmptyState";
import { Hero } from "@/components/ui/Custom/Hero";
import { InfoItem } from "@/components/ui/Custom/InfoItem";
import { MetricCard } from "@/components/ui/Custom/MetricCard";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";
import { SelectedTags } from "@/components/ui/Custom/SelectedTags";
import { StatusLegend } from "@/components/ui/Custom/StatusLegend";
import { StatusWorkflow } from "@/components/ui/Custom/StatusWorkflow";
import { UnifiedFilterBar } from "@/components/ui/Custom/UnifiedFilterBar";
import { ShowcaseDemoStatus } from "@/enums/ShowcaseDemoStatus";
import { ComponentVariant } from "@/enums/ComponentVariant";
import type { ComponentShowcaseDetailPageProps } from "@/interface/props/showcase/ComponentShowcaseDetailPageProps";

export default function ComponentShowcaseDetailPage({ item }: ComponentShowcaseDetailPageProps) {
  const [alertVisible, setAlertVisible] = useState(true);
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState(["layout", "feedback"]);
  const [status, setStatus] = useState<ShowcaseDemoStatus>(ShowcaseDemoStatus.PENDING);
  const [variant, setVariant] = useState<ComponentVariant>(item.variants?.[0] ?? ComponentVariant.OUTLINE);

  const demo = () => {
    switch (item.slug) {
      case "alert": return alertVisible ? <AlertComponent variant={variant} status="success" title="Saved successfully" description="This alert can include actions and can be dismissed." isClosable onClose={() => setAlertVisible(false)} /> : <Button onClick={() => setAlertVisible(true)}>Show alert</Button>;
      case "capacity-progress": return <CapacityProgress value={34} total={50} unit="seats" showPercentage showStatusText />;
      case "content-card": return <ContentCard variant={variant} header={<Heading size="md">Tour summary</Heading>} footer={<Text fontSize="sm">Updated just now</Text>}><InfoItem icon={Plane} label="Destination" value="Bahrain" /></ContentCard>;
      case "date-picker": return <DatePicker label="Departure date" value={date} onChange={setDate} minDate={new Date()} />;
      case "empty-state": return <EmptyState variant={variant} icon={Inbox} title="No tours found" description="Adjust the filters or create the first tour." action={<Button size="sm">Create tour</Button>} />;
      case "hero": return <Hero title="Explore Bahrain" subtitle="A reusable responsive hero demonstration." buttonText="Explore" onActionClick={() => undefined} />;
      case "metric-card": return <MetricCard variant={variant} icon={CircleDollarSign} label="Revenue" value="BHD 12,480" helperText="12% above last month" colorPalette="green" />;
      case "selected-tags": return <SelectedTags values={tags} options={[{ label: "Layout", value: "layout" }, { label: "Feedback", value: "feedback" }]} onRemove={(value) => setTags((current) => current.filter((tag) => tag !== value))} />;
      case "status-legend": return <StatusLegend title="Tour status" colorMap={{ ACTIVE: "green", PENDING: "orange", CANCELLED: "red" }} />;
      case "status-workflow": return <StatusWorkflow currentStatus={status} steps={[ShowcaseDemoStatus.PENDING, ShowcaseDemoStatus.CONFIRMED, ShowcaseDemoStatus.COMPLETED]} statusMap={{ pending: { label: "Pending", colorPalette: "orange", icon: CalendarDays }, confirmed: { label: "Confirmed", colorPalette: "blue", icon: Check }, completed: { label: "Completed", colorPalette: "green", icon: Check } }} onStatusChange={async (next) => setStatus(next)} />;
      case "unified-filter-bar": return <UnifiedFilterBar searchLabel="Search tours" searchValue={search} onSearchTrigger={setSearch} options={[{ label: "All statuses", value: "" }, { label: "Active", value: "active" }]} onReset={() => setSearch("")} count={8} />;
      default: return <EmptyState title="Demo unavailable" description="This component demo is being prepared." />;
    }
  };

  return (
    <PageWrapper title={item.name} subtitle={item.description}>
      <VStack align="stretch" gap={6}>
        <Box><Button asChild variant="ghost" size="sm"><Link href="/components"><ArrowLeft size={16} /> Back to components</Link></Button></Box>
        <ContentCard header={<Heading size="lg">Live example</Heading>}>
          {item.variants && (
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>Variant</Text>
              <HStack wrap="wrap">
                {item.variants.map((option) => <Button key={option} size="sm" variant={variant === option ? "solid" : "outline"} onClick={() => setVariant(option)}>{option}</Button>)}
              </HStack>
            </Box>
          )}
          {demo()}
        </ContentCard>
        <ContentCard header={<Heading size="lg">Component contract</Heading>}>
          <HStack wrap="wrap">{item.features.map((feature) => <Badge key={feature} colorPalette="blue">{feature}</Badge>)}</HStack>
          <Text color="fg.muted">Import this shared component instead of rebuilding the same UI inside a feature page.</Text>
          <Code p={3} borderRadius="md">{`import { ${item.name.replaceAll(" ", "")} } from "${item.importPath}";`}</Code>
        </ContentCard>
      </VStack>
    </PageWrapper>
  );
}
