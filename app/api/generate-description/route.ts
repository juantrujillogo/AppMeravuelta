import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { productName } = await req.json();

    if (!productName) {
      return NextResponse.json({ error: 'Falta el nombre del producto' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Actúa como un experto copywriter de e-commerce. Genera una descripción de producto atractiva, profesional y persuasiva para el siguiente artículo: "${productName}". 
    La descripción debe tener alrededor de 3 oraciones cortas, resaltando beneficios y características clave sin inventar especificaciones irreales. Solo devuelve el texto de la descripción, sin introducciones ni títulos.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    return NextResponse.json({ success: true, description: text });
  } catch (error: any) {
    console.error('Error generando descripción:', error);
    return NextResponse.json({ success: false, error: 'Error al generar la descripción' }, { status: 500 });
  }
}
