import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectToDatabase from '../../../lib/mongodb';
import ProductModel from '../../../models/Product';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'La llave GEMINI_API_KEY no está configurada.' },
        { status: 500 }
      );
    }

    // Obtener los productos reales de la tienda para análisis
    await connectToDatabase();
    const products = await ProductModel.find({}).lean() as any[];
    
    const catalogContext = products.map(p => 
      `- [ID: ${p._id}] ${p.name} | Cat: ${p.category} | Precio: $${p.price} | Descuento: ${p.discount || 'No'} | Rating: ${p.vendorRating}`
    ).join('\n');

    const totalProducts = products.length;
    const avgPrice = products.reduce((acc, p) => acc + p.price, 0) / (totalProducts || 1);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: `Eres el Asistente Privado de Negocios y Analista del dueño de la tienda SmarcartIA. Tu trabajo NO es vender a clientes, sino asesorar al administrador de la tienda.

REGLAS IMPORTANTES:
- Eres experto en marketing, copywriting, análisis de inventario y estrategias de ventas de e-commerce.
- Mantén un tono profesional, motivador y sumamente analítico, como un consultor de alto nivel.
- Usa formato Markdown (negritas, viñetas) para hacer tus respuestas fáciles de leer. No escribas textos excesivamente largos.
- Si te piden redactar la descripción de un producto, hazlo usando técnicas de copywriting persuasivo (resaltar beneficios, no solo características).

CONTEXTO ACTUAL DE LA TIENDA (Solo para tu uso analítico):
Tienes ${totalProducts} productos activos.
Precio promedio del catálogo: $${avgPrice.toFixed(2)}.

INVENTARIO ACTUAL:
${catalogContext}`
    });

    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    while(history.length > 0 && history[0].role === 'model') {
      history.shift();
    }

    const lastMessage = messages[messages.length - 1].text;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage);
    
    return NextResponse.json({ reply: result.response.text() });
    
  } catch (error: any) {
    console.error('Error en Seller Chat:', error);
    return NextResponse.json(
      { error: 'Error interno del Asistente de Negocios.' },
      { status: 500 }
    );
  }
}
