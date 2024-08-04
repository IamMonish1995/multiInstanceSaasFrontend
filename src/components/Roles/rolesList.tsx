"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Delete,
  EllipsisVertical,
  Pencil,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const RoleList = ({ Roles = [],handleEditBtn,handleDeleteBtn }: any) => {
  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of all Roles.</TableCaption>
        <TableHeader>
          <TableRow className="flex justify-between">
            <TableHead className="">Name</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Roles?.map((item:any, key:number) => {
            return (
              <TableRow key={key} className="flex justify-between">
                <TableCell className="">{item.role_name}</TableCell>
                <TableCell className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical className="ml-2 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={()=>{handleEditBtn(item)}} className="flex justify-between">
                        <span>Edit</span>
                        <Pencil className="mr-2 h-4 w-4" />
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={()=>{handleDeleteBtn(item)}} className="flex justify-between">
                        <span>Delete</span>
                        <Delete className="mr-2 h-4 w-4" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default RoleList;
