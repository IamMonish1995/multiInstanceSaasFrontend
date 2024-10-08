"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useReducer, useState } from "react";
import {
  getAllMenus,
  getProfileConfig,
  saveNewRole,
  updateRole,
} from "@/services/authRequest";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { encryptJSON } from "@/lib/utils";

const RolesForm = ({ SelectedRole = null, handleClose = () => {},fetchAllRoles=()=>{} }: any) => {
  const [assessList, setAccessList] = useState([]) as any;
  const [menus, setMenus] = useState([]) as any;
  const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);
  const [addColCheckBox, setAddColCheckBox] = useState(false);
  const [editColCheckBox, setEditColCheckBox] = useState(false);
  const [deleteColCheckBox, setDeleteColCheckBox] = useState(false);
  const [viewColCheckBox, setViewColCheckBox] = useState(false);
  const [, forceUpdate] = useReducer((x: any) => x + 1, 0);  
  const auth = useAuth() as any;
  const formSchema = z.object({
    name: z.string().min(4, {
      message: "Roles Name must be at least 4 characters.",
    }),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: SelectedRole?.role_name || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (auth.isLoading != true) {
        auth.setIsLoading(true);
        if (SelectedRole) {
        await  toast.promise(updateRole({role_id:SelectedRole._id,name: values.name,assessList}), {
            loading: "Loading...",
            success: "Data Updated",
            error: "Something went wrong",
          });
        }else{
         await toast.promise(saveNewRole({ name: values.name, assessList }), {
            loading: "Loading...",
            success: "Data Saved",
            error: "Something went wrong",
          });
        }
        
        handleClose()
        fetchAllRoles()
        auth.setIsLoading(false);
      }
    } catch (err) {
      handleClose()
      fetchAllRoles()
      auth.setIsLoading(false);
      console.log(err);
    }
  }

  const checkCheckBoxStatus = () => {
    let tempAddColchecks = [] as any;
    let tempEditColchecks = [] as any;
    let tempDeleteColchecks = [] as any;
    let tempViewColchecks = [] as any;

    if (menus.length > assessList.length) {
      setSelectAllCheckBox(false);
      setAddColCheckBox(false);
      setEditColCheckBox(false);
      setDeleteColCheckBox(false);
      setViewColCheckBox(false);
    } else {
      assessList.map((access: any) => {
        tempAddColchecks.push(access.can_create);
        tempEditColchecks.push(access.can_update);
        tempDeleteColchecks.push(access.can_delete);
        tempViewColchecks.push(access.can_read);
      });

      let addIncludes = !tempAddColchecks.includes(false);
      let editdIncludes = !tempEditColchecks.includes(false);
      let deleteIncludes = !tempDeleteColchecks.includes(false);
      let viewIncludes = !tempViewColchecks.includes(false);

      setAddColCheckBox(addIncludes);
      setEditColCheckBox(editdIncludes);
      setDeleteColCheckBox(deleteIncludes);
      setViewColCheckBox(viewIncludes);

      if (addIncludes && editdIncludes && deleteIncludes && viewIncludes) {
        setSelectAllCheckBox(true);
      } else {
        setSelectAllCheckBox(false);
      }
    }
    forceUpdate();
  };

  let setColCheckBox = {
    can_create: setAddColCheckBox,
    can_update: setEditColCheckBox,
    can_delete: setDeleteColCheckBox,
    can_read: setViewColCheckBox,
  } as any;
  let getColCheckBox = {
    can_create: addColCheckBox,
    can_update: editColCheckBox,
    can_delete: deleteColCheckBox,
    can_read: viewColCheckBox,
  } as any;

  const getAllMenuList = () => {
    getAllMenus(null).then((response) => {
      setMenus(response.result);
    });
  };
  const getAccessListForUserType = () => {
    if (SelectedRole) {
      encryptJSON(SelectedRole._id).then((encryptedroleId) => {
        getProfileConfig({
          external_role_id: encryptedroleId,
        })
          .then((res) => {
            if (res.status == "success") {
              let tempArray = res.result.map((TempAccess:any)=>{
                return {...TempAccess,menu_id:TempAccess.menu_id._id,role_id:SelectedRole._id}
              })
              console.log({tempArray});
              
              setAccessList(tempArray);
              checkCheckBoxStatus();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };
  useEffect(() => {
    getAllMenuList();
  }, []);

  useEffect(() => {
    getAccessListForUserType();
  }, [SelectedRole]);

  const handleCheck = (Action: any, Value: any, MenuID: any) => {
    let tempArray = assessList;
    let tempObject = {
      can_create: false,
      can_update: false,
      can_delete: false,
      can_read: false,
    };
    let index = assessList.findIndex((item: any) => {
      return item.menu_id == MenuID;
    });
    if (index != -1) {
      let tempObjectExisting = {
        can_create: assessList[index].can_create,
        can_update: assessList[index].can_update,
        can_delete: assessList[index].can_delete,
        can_read: assessList[index].can_read,
      };
      let tempData = {
        menu_id: MenuID,
        ...tempObjectExisting,
        [Action]: Value,
      };
      tempArray[index] = tempData;
    } else {
      let tempData = {
        menu_id: MenuID,
        ...tempObject,
        [Action]: Value,
      };
      tempArray = [...tempArray, tempData];
    }    
    setAccessList(tempArray);
    forceUpdate();
    checkCheckBoxStatus();
  };

  const handleRowChecked = (Value: any, MenuID: any) => {
    let index = assessList.findIndex((item: any) => {
      return item.menu_id == MenuID;
    });
    let tempObjectExisting = {
      can_create: Value,
      can_update: Value,
      can_delete: Value,
      can_read: Value,
    };
    let tempData = {
      menu_id: MenuID,
      ...tempObjectExisting,
    };

    if (index != -1) {
      let tempArray = assessList;
      tempArray[index] = tempData;
      setAccessList(tempArray);
    } else {
      setAccessList((prevData: any) => {
        return [...prevData, tempData];
      });
    }
    forceUpdate();
    checkCheckBoxStatus();
  };

  const handleColChecked = (Value: any, Action: any) => {
    let colCheckBox;

    switch (Action) {
      case "can_create":
        colCheckBox = {
          ...getColCheckBox,
          can_create: Value,
        };
        setAddColCheckBox(Value);
        break;
      case "can_update":
        colCheckBox = {
          ...getColCheckBox,
          can_update: Value,
        };
        setEditColCheckBox(Value);
        break;
      case "can_delete":
        colCheckBox = {
          ...getColCheckBox,
          can_delete: Value,
        };
        setDeleteColCheckBox(Value);
        break;
      case "can_read":
        colCheckBox = {
          ...getColCheckBox,
          can_read: Value,
        };
        setViewColCheckBox(Value);
        break;
      default:
        // code block
        setViewColCheckBox(Value);
    }

    if (
      colCheckBox.can_create &&
      colCheckBox.can_update &&
      colCheckBox.can_delete &&
      colCheckBox.can_read
    ) {
      setSelectAllCheckBox(true);
    } else {
      setSelectAllCheckBox(false);
    }

    let tempArray = assessList;
    menus.map((menu: any) => {
      let index = tempArray.findIndex((item: any) => {
        return item.menu_id == menu._id;
      });

      if (index != -1) {
        let tempObjectExisting = {
          can_create: tempArray[index].can_create,
          can_update: tempArray[index].can_update,
          can_delete: tempArray[index].can_delete,
          can_read: tempArray[index].can_read,
        };
        let tempData = {
          menu_id: menu._id,
          ...tempObjectExisting,
          [Action]: Value,
        };
        tempArray[index] = tempData;
      } else {
        let tempObjectExisting = {
          can_create: false,
          can_update: false,
          can_delete: false,
          can_read: false,
        };
        let tempData = {
          menu_id: menu._id,
          ...tempObjectExisting,
          [Action]: Value,
        };
        tempArray = [...tempArray, tempData];
      }
    });
    setAccessList(tempArray);
    checkCheckBoxStatus();
    forceUpdate();
  };

  return (
    <>
      <CardContent>
        <ScrollArea className="h-[50vh]">
          <div className="grid gap-4 md:p-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-4 text-center">
                    <FormField
                      control={form.control}
                      name="name"
                      defaultValue={SelectedRole?.role_name || ""}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Menu</TableHead>
                        <TableHead>Add</TableHead>
                        <TableHead>Edit</TableHead>
                        <TableHead>Delete</TableHead>
                        <TableHead>View</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menus?.map((menu: any, index: number) => {
                        const permission = assessList?.find((access: any) => {
                          if (SelectedRole) {
                            if (
                              access?.menu_id === menu._id
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          } else {
                            return false;
                          }
                        });
                        return (
                          <TableRow key={index}>
                            <TableCell>{menu.menu_name}</TableCell>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={permission && permission.can_create}
                                onChange={(e) => {
                                  handleCheck(
                                    "can_create",
                                    e.target.checked,
                                    menu._id
                                  );
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={permission && permission.can_update}
                                onChange={(e) => {
                                  handleCheck(
                                    "can_update",
                                    e.target.checked,
                                    menu._id
                                  );
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={permission && permission.can_delete}
                                onChange={(e) => {
                                  handleCheck(
                                    "can_delete",
                                    e.target.checked,
                                    menu._id
                                  );
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={permission && permission.can_read}
                                onChange={(e) => {
                                  handleCheck(
                                    "can_read",
                                    e.target.checked,
                                    menu._id
                                  );
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-around">
                  <Button
                    onClick={handleClose}
                    variant="destructive"
                    className="w-auto"
                  >
                    cancel
                  </Button>
                  <Button type="submit" className="w-auto">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </CardContent>
    </>
  );
};

export default RolesForm;
