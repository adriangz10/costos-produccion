import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Ingrediente } from '../types';

interface IngredienteFormProps {
  onAgregarIngrediente: (ingrediente: Ingrediente) => void;
}

const IngredienteForm: React.FC<IngredienteFormProps> = ({ onAgregarIngrediente }) => {
  const [ingrediente, setIngrediente] = useState<Ingrediente>({
    id: '',
    nombre: '',
    cantidad: 0,
    unidad: '',
    precioUnitario: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregarIngrediente({ ...ingrediente, id: Date.now().toString() });
    setIngrediente({ id: '', nombre: '', cantidad: 0, unidad: '', precioUnitario: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre del ingrediente
        </label>
        <input
          type="text"
          id="nombre"
          value={ingrediente.nombre}
          onChange={(e) => setIngrediente({ ...ingrediente, nombre: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
          Cantidad
        </label>
        <input
          type="number"
          id="cantidad"
          value={ingrediente.cantidad}
          onChange={(e) => setIngrediente({ ...ingrediente, cantidad: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="unidad" className="block text-sm font-medium text-gray-700">
          Unidad
        </label>
        <input
          type="text"
          id="unidad"
          value={ingrediente.unidad}
          onChange={(e) => setIngrediente({ ...ingrediente, unidad: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="precioUnitario" className="block text-sm font-medium text-gray-700">
          Precio unitario
        </label>
        <input
          type="number"
          id="precioUnitario"
          value={ingrediente.precioUnitario}
          onChange={(e) => setIngrediente({ ...ingrediente, precioUnitario: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="mr-2 h-4 w-4" />
        Agregar Ingrediente
      </button>
    </form>
  );
};

export default IngredienteForm;