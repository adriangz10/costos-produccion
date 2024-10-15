import React from 'react';
import { Venta } from '../types';

interface HistorialVentasProps {
  ventas: Venta[];
}

const HistorialVentas: React.FC<HistorialVentasProps> = ({ ventas }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Historial de Ventas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hamburguesa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio Unitario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ganancia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venta.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {venta.hamburguesa.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venta.cantidad}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${venta.hamburguesa.precioVenta.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${venta.ganancia.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialVentas;