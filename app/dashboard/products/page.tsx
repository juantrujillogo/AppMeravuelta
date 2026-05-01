"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../../lib/products';
import { Search, Plus, Edit2, Trash2, MoreVertical, Tag, DollarSign, PackageOpen, X, Copy, EyeOff, Save } from 'lucide-react';

export default function ProductsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProductsList(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);

  // Estado del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Estado del Menú Desplegable (Dropdown)
  const [activeDropdown, setActiveDropdown] = useState<number | string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar menú desplegable al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const filteredProducts = productsList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number | string) => {
    if (confirm("¿Estás seguro que deseas eliminar este producto?")) {
      setProductsList(productsList.filter(p => p.id !== id));
      setActiveDropdown(null);
    }
  };

  const handleOpenModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const discount = formData.get('discount') as string;
    const image = formData.get('image') as string;
    const description = formData.get('description') as string;

    if (editingProduct) {
      // Modo Edición (Pendiente implementar endpoint PUT/PATCH real)
      setProductsList(productsList.map(p => p.id === editingProduct.id ? {
        ...p, name, price, category, discount: discount || null, image: image || p.image, description: description || p.description
      } : p));
      setIsModalOpen(false);
    } else {
      // Modo Creación (Guarda en MongoDB)
      try {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name, price, category, discount: discount || null, image: image || undefined, description: description || undefined
          })
        });

        if (res.ok) {
          const data = await res.json();
          setProductsList([data.product, ...productsList]);
          setIsModalOpen(false);
        } else {
          alert("Error al guardar el producto en la base de datos.");
        }
      } catch (error) {
        console.error("Error saving product:", error);
        alert("Ocurrió un error en la conexión.");
      }
    }
  };

  return (
    <div className="p-8 pb-32 relative">
      {/* Cabecera */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mis Productos</h1>
          <p className="text-gray-500 mt-1">Gestiona el inventario, precios y categorización.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 transition-colors text-white font-bold px-6 py-3 rounded-xl shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar Producto
        </button>
      </header>

      {/* Barra de Herramientas / Búsqueda */}
      <div className="bg-white rounded-t-2xl border border-gray-200 border-b-0 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-medium sm:text-sm"
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 font-bold px-4 py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
            <Tag className="w-4 h-4" /> Categorías
          </button>
          <button className="flex-1 sm:flex-none border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm">
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white border border-gray-200 rounded-b-2xl overflow-visible shadow-sm relative">
        <div className="overflow-visible min-h-[400px]">
          <table className="min-w-full divide-y divide-gray-200 overflow-visible">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                  Precio Base
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                  Estado Promocional
                </th>
                <th scope="col" className="relative px-6 py-4 text-right">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-gray-500 font-medium">
                    Cargando productos desde MongoDB...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/80 transition-colors relative">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 h-14 w-14 border border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                          <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</div>
                          <div className="text-sm text-gray-500 font-medium">ID: #{product.id.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold bg-purple-50 text-purple-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      <span className="flex items-center text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.discount ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold bg-green-50 text-green-700 border border-green-100">
                          Descuento Activo: {product.discount}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-500">
                          Precio Regular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="text-gray-400 hover:text-purple-600 bg-white hover:bg-purple-50 p-2 rounded-lg transition-colors border border-transparent hover:border-purple-100" title="Editar">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="relative inline-block text-left" ref={activeDropdown === product.id ? dropdownRef : null}>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                            className="text-gray-400 hover:text-gray-600 p-2 ml-1 rounded-lg hover:bg-gray-100 transition-colors" title="Más opciones">
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Menú Desplegable */}
                          {activeDropdown === product.id && (
                            <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-in fade-in zoom-in-95 duration-150">
                              <div className="py-1" role="menu">
                                <button className="text-gray-700 hover:bg-gray-50 hover:text-purple-600 group flex items-center w-full px-4 py-2 text-sm font-medium transition-colors" role="menuitem">
                                  <Copy className="mr-3 h-4 w-4 text-gray-400 group-hover:text-purple-600" />
                                  Duplicar
                                </button>
                                <button className="text-gray-700 hover:bg-gray-50 group flex items-center w-full px-4 py-2 text-sm font-medium transition-colors" role="menuitem">
                                  <EyeOff className="mr-3 h-4 w-4 text-gray-400" />
                                  Ocultar
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <PackageOpen className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium text-lg">No se encontraron productos.</p>
                    <p className="text-gray-400 text-sm mt-1">Prueba usando otros términos de búsqueda.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación simulada */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">Mostrando <span className="font-bold text-gray-700">{filteredProducts.length}</span> resultados</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-400 rounded-md text-sm font-bold" disabled>Anterior</button>
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 rounded-md text-sm font-bold shadow-sm">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Modal - Agregar / Editar Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fondo oscuro (Backdrop) */}
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Contenido del Modal */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-extrabold text-gray-900">
                {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nombre del producto</label>
                  <input
                    name="name"
                    required
                    defaultValue={editingProduct?.name || ''}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium outline-none"
                    placeholder="Ej. Silla de oficina gamer..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
                    <select
                      name="category"
                      required
                      defaultValue={editingProduct?.category || ''}
                      className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 font-medium outline-none"
                    >
                      <option value="">Selecciona...</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Mobiliario">Mobiliario</option>
                      <option value="Accesorios">Accesorios</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Precio ($)</label>
                    <input
                      name="price"
                      required
                      defaultValue={editingProduct?.price || ''}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 font-medium outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Descuento (Opcional)</label>
                    <input
                      name="discount"
                      defaultValue={editingProduct?.discount || ''}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 font-medium outline-none"
                      placeholder="Ej. 15% OFF"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">URL de la Imagen</label>
                    <input
                      name="image"
                      defaultValue={editingProduct?.image || ''}
                      type="url"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 font-medium outline-none"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Descripción del producto</label>
                  <textarea
                    name="description"
                    defaultValue={editingProduct?.description || ''}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 font-medium outline-none resize-none"
                    placeholder="Escribe una descripción detallada..."
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
