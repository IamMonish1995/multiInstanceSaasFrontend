import { Button } from "#srccomponents/ui/button.tsx";
import { DashBoardLayout } from "#srclayouts/dashboard/layout.tsx";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Page = () => {
  const [Instances, setInstances] = useState([
    1, 2
  ]);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Instances</h1>
      </div>
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
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {Instances.map((Instance, key) => (
            <Card
              key={key}
              className="w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10"
            >
              <CardHeader>
                <CardTitle className="flex item-center justify-center">
                  Instance{" "}{key+1}
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit, amet ipsum consectetur adipisicing
                  elit.
                </CardDescription>
              </CardHeader>

              <hr className="w-4/5 m-auto mb-4" />

              <CardFooter className="flex justify-center">
                <div className="space-y-4 ">
                  <Button className="w-full">Visit</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};
Page.getLayout = (page: any) => <DashBoardLayout>{page}</DashBoardLayout>;

export default Page;
