"use client";

import React, { useState, useRef } from 'react';
import { ShoppingCart, Search, Menu, User, Laptop, Sofa, Headphones, Package, Camera, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCartSimulation } from './CartSimulationContext';
import { Product } from '../lib/products'; // Use the interface

interface MarketplaceProps {
  products: Product[];
}

export default function Marketplace({ products }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categorías");
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const { cartItems, setIsCartOpen, addToCart } = useCartSimulation();

  const productsGridRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzingImage(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result;

        const response = await fetch('/api/visual-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: (base64data as string).split(',')[1],
            mimeType: file.type
          })
        });

        const data = await response.json();
        if (data.success && data.keyword) {
          setSearchQuery(data.keyword);
          setSelectedCategory("Categorías"); // Reset category to allow broad search
          executeSearch(); // Scroll down to results
        } else {
          alert('No se pudo identificar la imagen.');
        }
        setIsAnalyzingImage(false);
      };
    } catch (error) {
      console.error(error);
      setIsAnalyzingImage(false);
      alert('Hubo un error al analizar la imagen.');
    }
  };

  const executeSearch = () => {
    if (productsGridRef.current) {
      productsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Categorías" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Cabecera (con contador del carrito) */}
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
                <Link href="/marketplace/profile" className="text-gray-600 hover:text-purple-600 transition-colors bg-gray-100 hover:bg-purple-50 p-2 rounded-full hidden sm:block">
                  <User className="h-5 w-5" />
                </Link>

                {/* Botón del Carrito */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-gray-600 hover:text-purple-600 transition-colors bg-gray-100 hover:bg-purple-50 p-2 rounded-full"
                >
                  <ShoppingCart className="h-5 w-5" />

                  {/* Contador del Carrito */}
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

      {/* Banner Principal */}
      <div className="relative bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800 text-white text-center py-24 px-4 overflow-hidden animate-gradient-x">
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-500 mix-blend-screen filter blur-[100px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 rounded-full bg-indigo-500 mix-blend-screen filter blur-[100px] animate-blob" style={{animationDelay: "2s"}}></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 rounded-full bg-pink-500 mix-blend-screen filter blur-[100px] animate-blob" style={{animationDelay: "4s"}}></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 drop-shadow-sm">
            Marketplace Empresarial
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto mb-12 font-light">
            Encuentra los mejores recursos y herramientas para llevar tu negocio al siguiente nivel.
          </p>

          {/* Barra de Búsqueda con Glassmorphism */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 md:p-3 flex flex-col sm:flex-row shadow-2xl items-center border border-white/20">
            <div className="w-full sm:w-auto relative mb-2 sm:mb-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-white font-medium px-4 py-3 sm:border-r border-white/20 focus:outline-none appearance-none cursor-pointer pr-10 [&>option]:text-gray-900"
              >
                <option value="Categorías">Categorías</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Mobiliario">Mobiliario</option>
                <option value="Accesorios">Accesorios</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="flex-1 flex items-center px-4 py-3 sm:py-0 w-full">
              <Search className="h-5 w-5 text-white/70 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="¿Qué estás buscando para tu empresa?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    executeSearch();
                  }
                }}
                className="w-full bg-transparent text-white px-2 py-1 focus:outline-none placeholder-white/60 font-medium"
              />
            </div>

            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
            />

            <div className="flex w-full sm:w-auto mt-2 sm:mt-0 gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }}
                disabled={isAnalyzingImage}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all shadow-md flex items-center justify-center sm:flex-none disabled:opacity-50"
                title="Buscar por imagen"
              >
                {isAnalyzingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  executeSearch();
                }}
                className="bg-white text-purple-700 hover:bg-gray-50 active:scale-95 px-8 py-3 rounded-xl font-bold transition-all shadow-lg w-full sm:w-auto whitespace-nowrap"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Quick Categories (Pills) */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
             <button onClick={() => setSelectedCategory('Tecnología')} className={`px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === 'Tecnología' ? 'bg-white text-purple-700' : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'}`}>
               <Laptop className="w-4 h-4" /> Tecnología
             </button>
             <button onClick={() => setSelectedCategory('Mobiliario')} className={`px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === 'Mobiliario' ? 'bg-white text-purple-700' : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'}`}>
               <Sofa className="w-4 h-4" /> Mobiliario
             </button>
             <button onClick={() => setSelectedCategory('Accesorios')} className={`px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === 'Accesorios' ? 'bg-white text-purple-700' : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'}`}>
               <Headphones className="w-4 h-4" /> Accesorios
             </button>
             <button onClick={() => setSelectedCategory('Categorías')} className={`px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === 'Categorías' ? 'bg-white text-purple-700' : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'}`}>
               <Package className="w-4 h-4" /> Todo
             </button>
          </div>
        </div>
      </div>

      {/* Contenido Principal (Cuadrícula de Productos) */}
      <main ref={productsGridRef} className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full scroll-mt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {searchQuery ? 'Resultados de Búsqueda' : 'Recomendados para ti'}
            </h2>
            <p className="text-gray-500 mt-1 font-medium">
              {searchQuery ? `Mostrando productos para "${searchQuery}"` : 'Selección especial de productos destacados'}
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-bold text-sm hidden sm:block transition-colors">
            Ver todo el catálogo →
          </button>
        </div>

        {/* Cuadrícula */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {filteredProducts.map((product) => (
            <Link href={`/marketplace/product/${product.id}`} key={product.id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(168,85,247,0.12)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col cursor-pointer">
              <div className="relative aspect-[4/3] sm:aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
                {/* Imagen */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Contenedor de Etiquetas (Badges) */}
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

                {/* Vista previa del Proveedor */}
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

                  {/* Botón de Agregar */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(168,85,247,0.39)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.23)] text-sm z-10"
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
