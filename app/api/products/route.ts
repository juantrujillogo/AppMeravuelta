import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import ProductModel from '../../../models/Product';

export async function GET() {
  try {
    await connectToDatabase();
    const dbProducts = await ProductModel.find({}).lean() as any[];
    
    const formatted = dbProducts.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      featured: p.featured,
      image: p.image,
      vendorName: p.vendorName,
      vendorRating: p.vendorRating,
      shippingTime: p.shippingTime,
      description: p.description,
      specs: p.specs
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Asignar valores por defecto para campos que el frontend no envíe
    const newProduct = new ProductModel({
      name: body.name,
      category: body.category,
      price: Number(body.price),
      originalPrice: Number(body.originalPrice || body.price),
      discount: body.discount || null,
      featured: body.featured || false,
      image: body.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", // Imagen placeholder
      vendorName: body.vendorName || "Mi Tienda Propia",
      vendorRating: body.vendorRating || 5.0,
      shippingTime: body.shippingTime || "24-48 horas",
      description: body.description || "Nueva descripción del producto.",
      specs: body.specs || ["Especificación 1", "Especificación 2"]
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json({
      message: "Producto creado exitosamente",
      product: {
        id: savedProduct._id.toString(),
        name: savedProduct.name,
        category: savedProduct.category,
        price: savedProduct.price,
        originalPrice: savedProduct.originalPrice,
        discount: savedProduct.discount,
        featured: savedProduct.featured,
        image: savedProduct.image,
        vendorName: savedProduct.vendorName,
        vendorRating: savedProduct.vendorRating,
        shippingTime: savedProduct.shippingTime,
        description: savedProduct.description,
        specs: savedProduct.specs
      }
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
