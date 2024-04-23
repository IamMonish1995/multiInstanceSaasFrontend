import { Button } from "#srccomponents/ui/button.tsx";
import { DashBoardLayout } from "#srclayouts/dashboard/layout.tsx";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TopPageNavigation from "#srccomponents/TopPageNavigation.tsx";
import AddItemDialogue from "#srccomponents/AddItemDialogue.tsx";
import AddInstanceForm from "#srccomponents/Instance/addForm.tsx";
const Page = () => {
  const [Instances, setInstances] = useState([1, 2, 2, 2]);
  const [AddModalShow, setAddModalShow] = useState(false);

  const handleAddBtn = () => {
    setAddModalShow(true);
  };
  const handleExportBtn = () => {
    alert("Export Button Clicked")
  };

  const AllContent = () => (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {Instances?.map((Instance, key) => (
        <Card key={key} x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-sm justify-center font-medium">
              <div className="text-2xl font-bold">Instance Name</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="link" className="w-full">
              Visit
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
  const tabs = [
    { label: "All", value: "all", content: <AllContent /> },
    { label: "Active", value: "active", content: <AllContent /> },
    { label: "Draft", value: "draft", content: <AllContent /> },
    { label: "Archived", value: "archived", content: <AllContent /> },
  ];
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Instances</h1>
      </div>
      <AddItemDialogue open={AddModalShow} setIsOpen={setAddModalShow} content={<AddInstanceForm/>}/>
      {Instances && Instances.length == 0 ? (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Instances
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start managing as soon as you add a Instance.
            </p>
            <Button className="mt-4">Add Instance</Button>
          </div>
        </div>
      ) : (
        <>
          <TopPageNavigation
            tabs={tabs}
            pageName="Instance"
            handleAddBtn={handleAddBtn}
            handleExportBtn={handleExportBtn}
          />
        </>
      )}
    </main>
  );
};
Page.getLayout = (page: any) => <DashBoardLayout>{page}</DashBoardLayout>;

export default Page;
