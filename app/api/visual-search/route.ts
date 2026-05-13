import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Instanciar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'Falta la imagen' }, { status: 400 });
    }

    // Inicializar el modelo visual (gemini-2.5-flash es excelente para tareas rápidas multimodales)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Preparar el prompt
    const prompt = "Analiza esta imagen e identifica qué producto de oficina principal es. Devuelve ÚNICAMENTE UNA o DOS PALABRAS CLAVE descriptivas que sirvan para buscar el producto en una tienda de equipos y mobiliario (ej. 'Silla', 'Monitor', 'Teclado', 'Escritorio', 'Webcam', 'Auriculares', 'Raton', 'Reposamuñecas'). No incluyas signos de puntuación, no incluyas artículos como 'un' o 'el', ni des explicaciones adicionales. Solo las palabras clave limpias.";

    // Partes para el modelo: el prompt en texto y la imagen inline
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType || 'image/jpeg'
      }
    };

    // Llamada a la IA
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text().trim();

    return NextResponse.json({ success: true, keyword: text });
  } catch (error: any) {
    console.error('Error in visual search API:', error);
    return NextResponse.json({ success: false, error: error.message || error.toString() }, { status: 500 });
  }
}
