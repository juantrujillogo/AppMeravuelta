import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { products as mockProducts } from '../../../lib/products';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Elimina productos existentes para evitar duplicados si se llama múltiples veces
    await Product.deleteMany({});
    
    // Mapea los productos de demostración eliminando la propiedad 'id' local
    // para que MongoDB asigne automáticamente su propio '_id' único.
    const productsToInsert = mockProducts.map(p => {
      const { id, ...rest } = p;
      return rest;
    });

    const result = await Product.insertMany(productsToInsert);

    return NextResponse.json({ 
      success: true, 
      message: 'Base de datos MongoDB poblada exitosamente!', 
      insertedCount: result.length 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
