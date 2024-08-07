import Link from "next/link";
import {
  Bell,
  CircleUser,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Home,
  ArrowRightLeft,
  FolderKanban,
  BookCopy,
  ScanEye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme-toggle-btn";
import { useAuth } from "@/hooks/use-auth";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";

const AppHeader = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth() as any;
  const { permisstions } = auth;

  const navList = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LineChart,
      permission:
        permisstions?.system_admin_dashboard?.can_read ||
        permisstions?.org_admin_dashboard?.can_read ||
        permisstions?.org_user_dashboard?.can_read ||
        permisstions?.client_admin_dashboard?.can_read ||
        permisstions?.client_user_dashboard?.can_read ||
        permisstions?.system_user_dashboard?.can_read ||
        permisstions?.guest_dashboard?.can_read,
    },
    {
      label: "Roles",
      path: "/roles",
      icon: ScanEye,
      permission: permisstions?.useraccess_screen?.can_read,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: BookCopy,
      permission: permisstions?.project_screen?.can_read,
    },
    {
      label: "Instances",
      path: "/instances",
      icon: FolderKanban,
      permission: permisstions?.instance_screen?.can_read,
    },
    {
      label: "Memberships",
      path: "/memberships",
      icon: ShoppingCart,
      permission: permisstions?.membership_screen?.can_read,
    },
    {
      label: "Transactions",
      path: "/transactions",
      icon: ArrowRightLeft,
      permission: permisstions?.transactions?.can_read,
    },
  ].filter((item) => item.permission);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navList.map((navItem, key) => {
                let isActive = pathname.includes(navItem.path);
                let IconComponent = navItem.icon;
                return (
                  <Link
                    key={key}
                    href={navItem.path}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      isActive ? "bg-muted" : "text-muted-foreground"
                    }  transition-all hover:text-primary`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {navItem.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className=""> {process.env.NEXT_PUBLIC_APP_NAME}</span>
                </Link>
                {navList.map((navItem, key) => {
                  let isActive = pathname.includes(navItem.path);
                  let IconComponent = navItem.icon;
                  return (
                    <Link
                      key={key}
                      href={navItem.path}
                      className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                        isActive ? "bg-muted" : "text-muted-foreground"
                      } hover:text-foreground`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {navItem.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form> */}
          </div>
          <ModeToggle />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem >Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
        {children}
      </div>
    </div>
  );
};
export default AppHeader;
