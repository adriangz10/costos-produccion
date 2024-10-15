import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Hamburguesa, Ingrediente } from '../types';

interface HamburguesaFormProps {
  ingredientes: Ingrediente[];
  onAgregarHamburguesa: (hamburguesa: Hamburguesa) => void;
}

const HamburguesaForm: React.FC<HamburguesaFormProps> = ({ ingredientes, onAgregarHamburguesa }) => {
  const [hamburguesa, setHamburguesa] = useState<Hamburguesa>({
    id: '',
    nombre: '',
    ingredientes: [],
    costoTotal: 0,
    precioVenta: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const costoTotal = hamburguesa.ingredientes.reduce(
      (total, ing) => total + ing.cantidad * ing.precioUnitario,
      0
    );
    const nuevaHamburguesa = {
      ...hamburguesa,
      id: Date.now().toString(),
      costoTotal,
    };
    onAgregarHamburguesa(nuevaHamburguesa);
    setHamburguesa({ id: '', nombre: '', ingredientes: [], costoTotal: 0, precioVenta: 0 });
  };

  const handleIngredienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIngredientes = Array.from(e.target.selectedOptions, (option) =>
      ingredientes.find((ing) => ing.id === option.value)
    ).filter((ing): ing is Ingrediente => ing !== undefined);

    setHamburguesa({ ...hamburguesa, ingredientes: selectedIngredientes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre de la hamburguesa
        </label>
        <input
          type="text"
          id="nombre"
          value={hamburguesa.nombre}
          onChange={(e) => setHamburguesa({ ...hamburguesa, nombre: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="ingredientes" className="block text-sm font-medium text-gray-700">
          Ingredientes
        </label>
        <select
          multiple
          id="ingredientes"
          onChange={handleIngredienteChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          {ingredientes.map((ing) => (
            <option key={ing.id} value={ing.id}>
              {ing.nombre} - {ing.cantidad} {ing.unidad}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="precioVenta" className="block text-sm font-medium text-gray-700">
          Precio de venta
        </label>
        <input
          type="number"
          id="precioVenta"
          value={hamburguesa.precioVenta}
          onChange={(e) => setHamburguesa({ ...hamburguesa, precioVenta: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="mr-2 h-4 w-4" />
        Agregar Hamburguesa
      </button>
    </form>
  );
};

export default HamburguesaForm;