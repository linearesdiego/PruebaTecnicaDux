// hooks
import React from "react";

//primereact
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";

interface FiltersProps {
  filtros: { estado: string; busqueda: string };
  onFiltroChange: (e: DropdownChangeEvent | React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export const estado = ['ACTIVO', 'INACTIVO'];

const Filters: React.FC<FiltersProps> = ({ filtros, onFiltroChange, onClear }) => (
  <div className="w-full flex align-content-center flex-column lg:flex-row gap-4 justify-content-between">
    <div className="w-full flex flex-column gap-4 lg:flex-row">
      <IconField iconPosition="left" className="w-full">
        <InputIcon className="pi pi-search"></InputIcon>
        <InputText name="busqueda" value={filtros.busqueda} onChange={onFiltroChange} placeholder="Buscar" className="w-full" />
      </IconField>

      <Dropdown name="estado" value={filtros.estado} className="w-full" onChange={onFiltroChange} options={estado} optionLabel="name" placeholder="Seleccione el estado" />
    </div>
    <Button icon="pi pi-filter-slash" className="bg-blue-200 border-none" onClick={onClear} />
  </div>
);

export default Filters;
