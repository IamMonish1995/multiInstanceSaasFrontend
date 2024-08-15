import { Button } from "@/components/ui/button";
import { DashBoardLayout } from "@/layouts/dashboard/layout";
import { useEffect, useState } from "react";
import TopPageNavigation from "@/components/TopPageNavigation";
import DialogueComponent from "@/components/DialogueComponent";
import RolesForm from "@/components/Roles/roleForm";
import RoleList from "@/components/Roles/rolesList";
import { deleteRole, getAllRoles } from "@/services/authRequest";
const Page = () => {
  const [Roles, setRoles] = useState([]);
  const [AddModalShow, setAddModalShow] = useState(false);
  const [EditModalShow, setEditModalShow] = useState(false);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [SelectedRole, setSelectedRole] = useState(null);

  const handleAddBtn = () => {
    setAddModalShow(true);
  };
  const handleEditBtn = (role: any) => {
    setSelectedRole(role);
    setEditModalShow(true);
  };
  const handleDeleteBtn = (role: any) => {
    setSelectedRole(role);
    deleteRole({ role_id: role._id }).then(() => {
      fetchAllRoles();
    });

    // setDeleteModalShow(true);
  };
  const handleExportBtn = () => {
    alert("Export Button Clicked");
  };
  const fetchAllRoles = () => {
    getAllRoles({}).then((res) => {
      setRoles(res.result);
    });
  };
  useEffect(() => {
    fetchAllRoles();
  }, []);

  const AllContent = () => (
    <RoleList
      Roles={Roles}
      handleEditBtn={handleEditBtn}
      handleDeleteBtn={handleDeleteBtn}
    />
  );
  const tabs = [
    { label: "All", value: "all", content: <AllContent /> },
    // { label: "Active", value: "active", content: <AllContent /> },
    // { label: "Draft", value: "draft", content: <AllContent /> },
    // { label: "Archived", value: "archived", content: <AllContent /> },
  ];
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">User Roles</h1>
      </div>
      <DialogueComponent
        open={AddModalShow}
        setIsOpen={setAddModalShow}
        content={
          <RolesForm
            fetchAllRoles={fetchAllRoles}
            handleClose={() => {
              setAddModalShow(false);
            }}
          />
        }
      />
      <DialogueComponent
        open={EditModalShow}
        setIsOpen={setEditModalShow}
        content={
          <RolesForm
            fetchAllRoles={fetchAllRoles}
            handleClose={() => {
              setEditModalShow(false);
            }}
            SelectedRole={SelectedRole}
            setSelectedRole={setSelectedRole}
          />
        }
      />
      <DialogueComponent
        open={DeleteModalShow}
        setIsOpen={setDeleteModalShow}
        content={
          <RolesForm
            fetchAllRoles={fetchAllRoles}
            handleClose={() => {
              setDeleteModalShow(false);
            }}
            SelectedRole={SelectedRole}
            setSelectedRole={setSelectedRole}
          />
        }
      />
      {Roles && Roles.length == 0 ? (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Roles
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start managing as soon as you add a Role.
            </p>
            <Button className="mt-4">Add Role</Button>
          </div>
        </div>
      ) : (
        <>
          <TopPageNavigation
            tabs={tabs}
            pageName="Roles"
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
