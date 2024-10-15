import React, { useState, useEffect } from 'react';
import { Utensils } from 'lucide-react';
import IngredienteForm from './components/IngredienteForm';
import HamburguesaForm from './components/HamburguesaForm';
import VentaForm from './components/VentaForm';
import HistorialVentas from './components/HistorialVentas';
import { Ingrediente, Hamburguesa, Venta } from './types';

function App() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [hamburguesas, setHamburguesas] = useState<Hamburguesa[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    const storedIngredientes = localStorage.getItem('ingredientes');
    const storedHamburguesas = localStorage.getItem('hamburguesas');
    const storedVentas = localStorage.getItem('ventas');

    if (storedIngredientes) setIngredientes(JSON.parse(storedIngredientes));
    if (storedHamburguesas) setHamburguesas(JSON.parse(storedHamburguesas));
    if (storedVentas) setVentas(JSON.parse(storedVentas));
  }, []);

  useEffect(() => {
    localStorage.setItem('ingredientes', JSON.stringify(ingredientes));
    localStorage.setItem('hamburguesas', JSON.stringify(hamburguesas));
    localStorage.setItem('ventas', JSON.stringify(ventas));
  }, [ingredientes, hamburguesas, ventas]);

  const handleAgregarIngrediente = (nuevoIngrediente: Ingrediente) => {
    setIngredientes([...ingredientes, nuevoIngrediente]);
  };

  const handleAgregarHamburguesa = (nuevaHamburguesa: Hamburguesa) => {
    setHamburguesas([...hamburguesas, nuevaHamburguesa]);
  };

  const handleRegistrarVenta = (nuevaVenta: Venta) => {
    setVentas([...ventas, nuevaVenta]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Utensils className="mr-2 h-8 w-8 text-indigo-600" />
            Calculadora de Costos y Ganancias de Hamburguesas
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Agregar Ingrediente</h2>
              <IngredienteForm onAgregarIngrediente={handleAgregarIngrediente} />
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Crear Hamburguesa</h2>
              <HamburguesaForm ingredientes={ingredientes} onAgregarHamburguesa={handleAgregarHamburguesa} />
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Registrar Venta</h2>
              <VentaForm hamburguesas={hamburguesas} onRegistrarVenta={handleRegistrarVenta} />
            </div>
          </div>
          <HistorialVentas ventas={ventas} />
        </div>
      </main>
    </div>
  );
}

export default App;