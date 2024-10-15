export interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  precioUnitario: number;
}

export interface Hamburguesa {
  id: string;
  nombre: string;
  ingredientes: Ingrediente[];
  costoTotal: number;
  precioVenta: number;
}

export interface Venta {
  id: string;
  fecha: string;
  hamburguesa: Hamburguesa;
  cantidad: number;
  ganancia: number;
}