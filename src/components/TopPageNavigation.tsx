import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const TopPageNavigation = ({
  tabs = [
    { label: "All", value: "all", content: <>All</> },
    { label: "Active", value: "active", content: <>Active</> },
    { label: "Draft", value: "draft", content: <>Draft</> },
    { label: "Archived", value: "archived", content: <>Archived</> },
  ],
  pageName = "Instance",
  handleAddBtn = () => {},
  handleExportBtn = () => {},
}: any) => {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          {tabs &&
            tabs.map((tab: any, key: any) => (
              <TabsTrigger key={key} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          {false && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1"
              onClick={handleExportBtn}
            >
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          )}
          <Button size="sm" className="h-8 gap-1" onClick={handleAddBtn}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add {pageName}
            </span>
          </Button>
        </div>
      </div>
      {tabs &&
        tabs.map((tab: any, key: any) => (
          <TabsContent key={key} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
    </Tabs>
  );
};

export default TopPageNavigation;
