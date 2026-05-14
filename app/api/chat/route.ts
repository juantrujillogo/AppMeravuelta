import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectToDatabase from '../../../lib/mongodb';
import ProductModel from '../../../models/Product';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'La llave GEMINI_API_KEY no está configurada en .env.local' },
        { status: 500 }
      );
    }

    // 1. Obtener los productos de la base de datos para darle contexto a la IA
    await connectToDatabase();
    const products = await ProductModel.find({}).lean() as any[];
    
    // Crear un catálogo en texto para que la IA sepa qué vender
    const catalogContext = products.map(p => 
      `- ${p.name} (Categoría: ${p.category}). Precio: $${p.price}. Descuento: ${p.discount || 'Ninguno'}. Detalles: ${p.description} Especificaciones: ${p.specs.join(', ')}`
    ).join('\n');

    // 2. Configurar Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Recomendación: usar gemini-1.5-flash para respuestas súper rápidas en chats
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `Eres el asistente virtual experto en ventas de SmarcartIA. Tu objetivo es ayudar a los clientes a encontrar productos, responder dudas sobre garantías y tiempos de envío, y motivar la compra de forma muy amable, concisa y persuasiva. 

REGLAS IMPORTANTES:
- Usa respuestas cortas y al grano (máximo 2 o 3 párrafos cortos).
- Solo puedes vender y recomendar productos que existan en el catálogo.
- Todos los productos tienen 1 año de garantía extendida y 30 días de devolución.
- Los tiempos de envío son: 24-48h para accesorios/tecnología y 5-7 días para mobiliario pesado.
- Si el cliente pregunta algo no relacionado con la tienda o productos, dile amablemente que solo puedes ayudar con temas de la tienda.
- Si el usuario menciona que abandonó un carrito, recuérdale que use el código RECUPERA10 para un 10% de descuento extra.

CATÁLOGO ACTUAL DE PRODUCTOS DISPONIBLES:
${catalogContext}`
    });

    // 3. Preparar el historial de mensajes para Gemini
    // Gemini usa el formato: role: "user" | "model", parts: [{ text: "..." }]
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // REGLA DE GEMINI: El historial SIEMPRE debe comenzar con un mensaje del usuario.
    // Eliminamos cualquier saludo inicial del bot que esté al principio del historial.
    while(history.length > 0 && history[0].role === 'model') {
      history.shift();
    }

    const lastMessage = messages[messages.length - 1].text;

    // 4. Iniciar el chat y enviar el mensaje
    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(lastMessage);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
    
  } catch (error: any) {
    console.error('Error en Gemini Chat:', error);
    return NextResponse.json(
      { error: 'Lo siento, tuve un problema procesando tu mensaje. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
