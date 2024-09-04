"use client";
//hooks
import React, { useEffect, useRef, useState } from "react";

//services
import { getUser, postUser, updateUser, deleteUser } from "@/services/users";
//components
import UserTable from "@/components/UserTable";
import Filters from "@/components/Filters";
import PaginatorComponent from "@/components/Paginator";
import { Form } from "@/components/Form";
import { useDebounce } from "@uidotdev/usehooks";
//primereact
import { DropdownChangeEvent } from "primereact/dropdown";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import { Toast } from "primereact/toast";


import { User, UserPagination } from "@/types/User";

export default function Home() {
  const [users, setUsers] = useState<UserPagination>();
  const [first, setFirst] = useState<number>(1);
  const [rows, setRows] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [filtros, setFiltros] = useState({ estado: "", busqueda: "" });
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const debouncedFiltros = useDebounce(filtros, 200);

  useEffect(() => {
    getUser(page, filtros.busqueda, filtros.estado).then((res) => setUsers(res));
  }, [page, debouncedFiltros]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  const checkIfUserExists = async (data: User) => {
    const { data: existingUsers } = await getUser(page, filtros.busqueda, filtros.estado)
    return existingUsers.some((user: User) => user.id === data.id || user.usuario === data.usuario);
  };

  const saveUser = async (data: User) => {
    if (selectedUser) {
      await updateUser(data);
      toast.current?.show({ severity: 'success', summary: 'Acción exitosa!', detail: 'Usuario actualizado', life: 3000 });
    } else {
      await postUser(data);
      toast.current?.show({ severity: 'success', summary: 'Acción exitosa!', detail: 'Usuario guardado', life: 3000 });
    }
  };

  const handleSave = async (data: User) => {

    try {
      if (!selectedUser && await checkIfUserExists(data)) {
        
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'El ID o usuario ya existe. No se puede crear.', life: 3000 });
        return;
      }
      await saveUser(data);
      setVisible(false);
      getUser(page, filtros.busqueda, filtros.estado).then((res) => setUsers(res));
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  const handleEdit = (rowData: User) => {
    setSelectedUser(rowData);
    setVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.current?.show({ severity: 'success', summary: 'Acción exitosa!', detail: 'Usuario eliminado', life: 3000 });
      getUser(page, filtros.busqueda, filtros.estado).then((res) => setUsers(res));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleFiltros = (e: DropdownChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClearFilters = () => setFiltros({ estado: '', busqueda: '' });

  return (
    <main className="mt-3 mx-3">
      <Toast ref={toast} />

      <div className="w-full flex align-items-center justify-content-between mb-2">
        <h1>Usuarios</h1>
        <Form user={selectedUser} onSave={handleSave} visible={visible} setVisible={setVisible} setSelectedUser={setSelectedUser} />
      </div>

      <Filters filtros={filtros} onFiltroChange={handleFiltros} onClear={handleClearFilters} />

      <UserTable users={users?.data} onEdit={handleEdit} onDelete={handleDelete} />

      <PaginatorComponent first={first} rows={rows} totalRecords={users?.items} onPageChange={onPageChange} />
    </main>
  );
}
