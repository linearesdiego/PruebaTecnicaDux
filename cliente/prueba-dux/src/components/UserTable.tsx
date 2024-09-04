// hooks
import React from "react";
//primereact
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

//types
import { User } from "@/types/User";

interface UserTableProps {
  users: User[] | undefined;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const actionBodyTemplate = (rowData: User) => (
    <div className="flex justify-content-center gap-2">
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-primary" onClick={() => onEdit(rowData)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete(rowData.id)} />
    </div>
  );

  return (
    <div className="card mt-2">
      <DataTable size="small" value={users}>
        <Column field="id" header="ID" />
        <Column field="usuario" header="Usuario" 
            body={(rowData: User) => (
                    <span className="text-blue-700 font-bold border-bottom-2 border-blue-700">{rowData.usuario}</span>
                )}
        
        />
        <Column field="estado" header="Estado" />
        <Column field="sector" header="Sector" />
        <Column body={actionBodyTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
      </DataTable>
    </div>
  );
};

export default UserTable;
