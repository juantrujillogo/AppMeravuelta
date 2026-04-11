"use client";

import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { useCartSimulation } from './CartSimulationContext';
import { products } from '../lib/products';

export default function Marketplace() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categorías");
  const { startCartSimulation } = useCartSimulation();


  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    startCartSimulation();
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Categorías" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header (with cart counter) */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Menu className="h-6 w-6 text-gray-600 sm:hidden cursor-pointer hover:text-purple-600" />
              <span className="text-xl font-extrabold text-purple-700 tracking-tight">SmarcartIA</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-gray-600">
                <button className="hover:text-purple-600 transition-colors">Vender</button>
                <button className="hover:text-purple-600 transition-colors">Ayuda</button>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-600 hover:text-purple-600 transition-colors bg-gray-100 hover:bg-purple-50 p-2 rounded-full hidden sm:block">
                  <User className="h-5 w-5" />
                </button>

                {/* Cart Button */}
                <button className="relative text-gray-600 hover:text-purple-600 transition-colors bg-gray-100 hover:bg-purple-50 p-2 rounded-full">
                  <ShoppingCart className="h-5 w-5" />

                  {/* Cart Counter */}
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-in zoom-in duration-200">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Banner */}
      <div className="bg-purple-700 text-white text-center py-16 px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-purple-500 mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-12 -right-12 w-72 h-72 rounded-full bg-purple-800 mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
            Marketplace Empresarial
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-10 font-light">
            Encuentra los mejores recursos y herramientas para llevar tu negocio al siguiente nivel.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl p-2 flex flex-col sm:flex-row shadow-2xl items-center ring-1 ring-black/5">
            <div className="w-full sm:w-auto relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-gray-700 font-medium px-4 py-3 sm:border-r border-gray-200 focus:outline-none appearance-none cursor-pointer pr-10"
              >
                <option value="Categorías">Categorías</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Mobiliario">Mobiliario</option>
                <option value="Accesorios">Accesorios</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="flex-1 flex items-center px-4 py-3 sm:py-0 w-full border-t sm:border-t-0 border-gray-100 mt-2 sm:mt-0">
              <Search className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="¿Qué estás buscando para tu empresa?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-gray-900 px-2 py-1 focus:outline-none placeholder-gray-400 font-medium"
              />
            </div>

            <button
              onClick={(e) => e.preventDefault()}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg w-full sm:w-auto mt-2 sm:mt-0 whitespace-nowrap"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Main Content (Product Grid) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Recomendados para ti</h2>
            <p className="text-gray-500 mt-1 font-medium">Selección especial de productos destacados</p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-bold text-sm hidden sm:block transition-colors">
            Ver todo el catálogo →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {filteredProducts.map((product) => (
            <Link href={`/marketplace/product/${product.id}`} key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 group flex flex-col cursor-pointer ring-1 ring-black/5 hover:ring-purple-500/20">
              <div className="relative aspect-[4/3] sm:aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Badges Container */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                  {product.discount && (
                    <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                      -{product.discount}
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                      Destacado
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 bg-white">
                <span className="text-xs text-purple-600 font-extrabold uppercase tracking-widest mb-1 opacity-80">
                  {product.category}
                </span>

                <h3 className="text-gray-900 font-bold text-lg leading-snug mb-3 line-clamp-2 min-h-[3rem] group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>

                {/* Proveedor Preview */}
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-500">
                  <User className="w-3 h-3 text-purple-400" />
                  Vendidor por: <span className="text-purple-700">{product.vendorName}</span>
                </div>

                <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-100/60">
                  <div className="flex flex-col">
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through font-medium mb-0.5">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 leading-none">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart();
                    }}
                    className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(168,85,247,0.39)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.23)] text-sm z-10"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="bg-white border-t py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} SmarcartIA. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
