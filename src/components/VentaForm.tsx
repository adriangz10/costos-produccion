import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { Hamburguesa, Venta } from '../types';

interface VentaFormProps {
  hamburguesas: Hamburguesa[];
  onRegistrarVenta: (venta: Venta) => void;
}

const VentaForm: React.FC<VentaFormProps> = ({ hamburguesas, onRegistrarVenta }) => {
  const [venta, setVenta] = useState<Venta>({
    id: '',
    fecha: new Date().toISOString().split('T')[0],
    hamburguesa: {} as Hamburguesa,
    cantidad: 1,
    ganancia: 0,
  });

  useEffect(() => {
    if (hamburguesas.length > 0) {
      setVenta(prevVenta => ({ ...prevVenta, hamburguesa: hamburguesas[0] }));
    }
  }, [hamburguesas]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ganancia = (venta.hamburguesa.precioVenta - venta.hamburguesa.costoTotal) * venta.cantidad;
    const nuevaVenta = {
      ...venta,
      id: Date.now().toString(),
      ganancia,
    };
    onRegistrarVenta(nuevaVenta);
    setVenta({
      id: '',
      fecha: new Date().toISOString().split('T')[0],
      hamburguesa: hamburguesas[0] || {} as Hamburguesa,
      cantidad: 1,
      ganancia: 0,
    });
  };

  if (hamburguesas.length === 0) {
    return <p>No hay hamburguesas disponibles para vender.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
          Fecha
        </label>
        <input
          type="date"
          id="fecha"
          value={venta.fecha}
          onChange={(e) => setVenta({ ...venta, fecha: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="hamburguesa" className="block text-sm font-medium text-gray-700">
          Hamburguesa
        </label>
        <select
          id="hamburguesa"
          value={venta.hamburguesa.id}
          onChange={(e) => {
            const selectedHamburguesa = hamburguesas.find((h) => h.id === e.target.value);
            if (selectedHamburguesa) {
              setVenta({ ...venta, hamburguesa: selectedHamburguesa });
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          {hamburguesas.map((h) => (
            <option key={h.id} value={h.id}>
              {h.nombre} - ${h.precioVenta}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
          Cantidad
        </label>
        <input
          type="number"
          id="cantidad"
          value={venta.cantidad}
          onChange={(e) => setVenta({ ...venta, cantidad: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          min="1"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <DollarSign className="mr-2 h-4 w-4" />
        Registrar Venta
      </button>
    </form>
  );
};

export default VentaForm;