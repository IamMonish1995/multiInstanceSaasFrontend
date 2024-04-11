import { DashBoardLayout } from "#srclayouts/dashboard/layout.tsx";

const Page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      tranactions
    </main>
  );
};
Page.getLayout = (page: any) => <DashBoardLayout>{page}</DashBoardLayout>;

export default Page;
