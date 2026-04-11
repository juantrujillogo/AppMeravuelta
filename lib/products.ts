export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string | null;
  featured: boolean;
  image: string;
  vendorName: string;
  vendorRating: number;
  shippingTime: string;
  description: string;
  specs: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Silla de Oficina Ergonómica Premium",
    category: "Mobiliario",
    price: 199.99,
    originalPrice: 249.99,
    discount: "20%",
    featured: true,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    vendorName: "ErgoOffice Tech",
    vendorRating: 4.8,
    shippingTime: "24-48 horas hábiles",
    description: "Nuestra silla ergonómica está diseñada con malla transpirable de alta tecnología. Cuenta con soporte lumbar ajustable en múltiples dimensiones, reposabrazos 3D y mecanismo sincrónico para la máxima comodidad durante exhaustivas jornadas de trabajo.",
    specs: ["Soporte lumbar ajustable", "Reposabrazos 3D", "Malla transpirable importada", "Ruedas silenciosas PU", "Capacidad: 150kg"]
  },
  {
    id: 2,
    name: "Monitor UltraWide 34\" 4K",
    category: "Tecnología",
    price: 499.99,
    originalPrice: 599.99,
    discount: "15%",
    featured: false,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    vendorName: "DigitalDisplays Pro",
    vendorRating: 4.9,
    shippingTime: "3-5 días hábiles",
    description: "Maximiza tu productividad con este monitor curvo UltraWide 34\" con resolución 4K. Incluye paneles IPS con colores vibrantes sRGB 99% ideales para edición o tareas de desarrollo que requieren espacio. Su tasa de refresco ultra dinámica lo hace perfecto también para entretenimiento.",
    specs: ["Resolución: 3440 x 1440", "Panel IPS", "Color sRGB 99%", "Refresco: 144Hz", "Tiempo de respuesta: 1ms"]
  },
  {
    id: 3,
    name: "Teclado Mecánico Inalámbrico",
    category: "Accesorios",
    price: 89.99,
    originalPrice: 120.00,
    discount: "25%",
    featured: true,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    vendorName: "KeyTech Store",
    vendorRating: 4.6,
    shippingTime: "Dentro de 24 horas",
    description: "Elegante teclado mecánico inalámbrico ideal para minimalistas. Cuenta con switches silenciosos y una conexión estable por Bluetooth 5.0 o receptor 2.4Ghz. Su batería de gran capacidad garantiza hasta 2 meses de autonomía.",
    specs: ["Switches Brown (Táctiles, Silenciosos)", "Retroiluminación Blanca (Cálida)", "Triple modo de conexión", "Batería 4000mAh", "Teclas PBT"]
  },
  {
    id: 4,
    name: "Escritorio Elevable Automático",
    category: "Mobiliario",
    price: 349.99,
    originalPrice: 349.99,
    discount: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    vendorName: "StandDesk Solutions",
    vendorRating: 4.7,
    shippingTime: "Envío pesado: 5-7 días",
    description: "Eleva tu bienestar en la oficina con nuestro escritorio elevable gracias a sus potentes motores dobles. Guarda hasta 4 perfiles de altura diferentes en su memoria integrada y despídete de los dolores de espalda por falta de movimiento regular.",
    specs: ["Motores duales silenciosos", "Alturas preestablecidas (4 botones de memoria)", "Capacidad de carga: 120kg", "Tablero de bambú ecológico", "Alarma de sedentarismo"]
  }
];
