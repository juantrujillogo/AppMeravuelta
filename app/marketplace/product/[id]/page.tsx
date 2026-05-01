"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../../../lib/products';
import { useCartSimulation } from '../../../../components/CartSimulationContext';
import { ArrowLeft, Star, Clock, ShieldCheck, Truck, ShoppingCart, Info, User } from 'lucide-react';

export default function ProductDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addToCart } = useCartSimulation();
  const [adding, setAdding] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Find the product matching the string id from params
        const found = data.find((p: Product) => p.id.toString() === params.id);
        setProduct(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div className="p-20 text-center text-xl font-bold text-gray-500">Cargando producto...</div>;
  if (!product) return <div className="p-20 text-center text-xl font-bold">Producto no encontrado</div>;

  const handleCheckout = () => {
    addToCart(product);
    router.push('/marketplace/checkout');
  };

  const handleCartAdd = () => {
    setAdding(true);
    addToCart(product);
    setTimeout(() => {
      setAdding(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back navigation */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-500 hover:text-purple-600 font-medium transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al catálogo
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative">
            
            {/* Image side */}
            <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
              {product.discount && (
                <div className="absolute top-8 left-8 bg-red-500 text-white font-extrabold px-4 py-2 rounded-xl shadow-lg z-10 text-sm">
                  Descuento -{product.discount}
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Content side */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
              <span className="text-sm font-extrabold text-purple-600 tracking-widest uppercase mb-3 block">
                {product.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Vendor Info card */}
              <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Vendido por</p>
                    <p className="font-bold text-gray-900">{product.vendorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1.5 rounded-lg text-yellow-800 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  {product.vendorRating}
                </div>
              </div>

              {/* Prices */}
              <div className="mb-8">
                {product.originalPrice > product.price && (
                  <p className="text-gray-400 line-through text-lg font-medium">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
                <p className="text-5xl font-extrabold text-gray-900 bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Spec list */}
              <div className="mb-10 space-y-3">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-purple-600" /> Especificaciones Principales
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-2 shrink-0"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Badges */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <Truck className="w-8 h-8 text-blue-500 bg-blue-50 p-1.5 rounded-lg" />
                  Envío: {product.shippingTime}
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <ShieldCheck className="w-8 h-8 text-green-500 bg-green-50 p-1.5 rounded-lg" />
                  Protección al comprador VentasIA
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  onClick={handleCartAdd}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all border-2 ${
                    adding 
                      ? 'bg-green-50 border-green-500 text-green-600'
                      : 'border-purple-600 text-purple-700 hover:bg-purple-50 hover:shadow-lg'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" /> 
                  {adding ? '¡Agregado!' : 'Agregar al carrito'}
                </button>

                <button 
                  onClick={handleCheckout}
                  className="flex-[1.5] bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center px-6 py-4 rounded-xl font-bold transition-all shadow-[0_4px_20px_0_rgba(168,85,247,0.4)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.3)] hover:-translate-y-1 active:scale-95"
                >
                  Comprar Ahora
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
