import React, { useEffect, useState } from "react";
//types
import { User } from "@/types/User";
import { estado } from "./Filters";
//primereact
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";


interface FormularioProps {
  user?: User | null | undefined;
  onSave: (data: User) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setSelectedUser: (user: User | null) => void;
}

export const Form: React.FC<FormularioProps> = ({ user = null, onSave , visible, setVisible,setSelectedUser }) => {
  const initialFormState: User = { id: '', usuario: '', estado: '', sector: 0 };
  
  const [formData, setFormData] = useState<User>(initialFormState);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
      if (user) {
          setFormData(user);
      } else {
          setFormData(initialFormState);
      }
  }, [user]);

  useEffect(() => {
    const isValid = formData.id.trim() !== '' && formData.usuario.trim() !== '' && formData.estado.trim() !== '';
    setIsFormValid(isValid);
  }, [formData]);


  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [id]: value
    }));
  };

  const handleSubmit = () => {
    if (isFormValid) {
        onSave(formData);
    }
  };

  const handleHide = () => {
    setFormData(initialFormState); 
    setVisible(false);
    setSelectedUser(null);
  };

  return (
    <div className="card flex justify-content-center">
        <Button  label="Nuevo usuario" icon="pi pi-plus " className="bg-blue-400" onClick={() => setVisible(true)} />
        
        <Dialog visible={visible}  style={{width: '60%'}} onHide={() => handleHide} 
              content={() => (
                <section className="w-full bg-white flex flex-column h-full border-round-md">
                  <div className=" px-3 w-full bg-blue-600 text-white border-round-top-md">
                    <h1>{user ? "Editar Usuario" : "Nuevo Usuario"}</h1>

                  </div>
                  <div className="w-full flex flex-column gap-2 p-3">
                        <div className="flex flex-column gap-3">
                            <label htmlFor="id">ID</label>
                            <InputText id="id" value={formData.id} onChange={handleInputChange}  disabled={!!user}/>
                        </div>
                        <div className="flex flex-column gap-3">
                            <label htmlFor="usuario">Nombre</label>
                            <InputText id="usuario" value={formData.usuario} onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-column gap-3 w-full">
                            <label htmlFor="estado">Estado</label>
                            <Dropdown id="estado"  value={formData.estado} className="w-full" onChange={handleInputChange} options={estado}  placeholder="Seleccione el estado" />

                        </div>
                    </div>


                  <div className="w-full flex gap-3 p-3 align-content-center justify-content-center">
                  <Button label="Confirmar" icon="pi pi-check" onClick={handleSubmit} disabled={!isFormValid} />
                  <Button label="Cancelar" icon="pi pi-times" outlined  onClick={handleHide}/>

                  </div>
                </section>
              )}>
            </Dialog>
    </div>
  );
};
