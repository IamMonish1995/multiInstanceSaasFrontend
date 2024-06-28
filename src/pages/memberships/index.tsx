import { Pricing } from "@/components/Pricing";
import { DashBoardLayout } from "@/layouts/dashboard/layout";

const Page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">MemberShips</h1>
      </div>
      <div className="-mt-24">
        <Pricing />
      </div>
    </main>
  );
};
Page.getLayout = (page: any) => <DashBoardLayout>{page}</DashBoardLayout>;

export default Page;
