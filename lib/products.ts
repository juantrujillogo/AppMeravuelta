export interface Product {
  id: number | string;
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
  },
  {
    id: 5,
    name: "Auriculares Noise Cancelling Pro",
    category: "Tecnología",
    price: 150.00,
    originalPrice: 199.99,
    discount: "25%",
    featured: true,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    vendorName: "SoundMaster",
    vendorRating: 4.8,
    shippingTime: "24 horas hábiles",
    description: "Aíslate del mundo y concéntrate con la cancelación activa de ruido híbrida. Graves profundos y agudos cristalinos gracias a sus drivers de 40mm. Ligeros y con almohadillas de espuma viscoelástica.",
    specs: ["Cancelación de ruido activa", "Batería de 30 horas", "Carga rápida USB-C", "Bluetooth 5.2", "Peso: 250g"]
  },
  {
    id: 6,
    name: "Lámpara de Escritorio Inteligente LED",
    category: "Accesorios",
    price: 45.50,
    originalPrice: 45.50,
    discount: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    vendorName: "SmartHome Tech",
    vendorRating: 4.5,
    shippingTime: "2-3 días hábiles",
    description: "Ilumina tu zona de trabajo con temperatura de color ajustable. Compatible con Alexa y Google Assistant, puedes encenderla, apagarla o regular el brillo con solo usar tu voz.",
    specs: ["Control por voz / App", "Luz cálida y fría", "Sin parpadeos", "Diseño minimalista", "Brazo flexible"]
  },
  {
    id: 7,
    name: "Ratón Inalámbrico Ultra Ligero",
    category: "Accesorios",
    price: 59.90,
    originalPrice: 79.90,
    discount: "25%",
    featured: true,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    vendorName: "KeyTech Store",
    vendorRating: 4.7,
    shippingTime: "24-48 horas hábiles",
    description: "Velocidad y precisión en la palma de tu mano. Con solo 65 gramos de peso y un sensor óptico de 20K DPI, este ratón se desliza perfectamente en cualquier superficie, optimizando tu flujo de trabajo.",
    specs: ["Peso: 65 gramos", "Sensor óptico 20,000 DPI", "Conexión 2.4Ghz sin lag", "Pies de PTFE 100%", "Batería de larga duración"]
  },
  {
    id: 8,
    name: "Soporte Articulado Doble para Monitor",
    category: "Accesorios",
    price: 39.99,
    originalPrice: 39.99,
    discount: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1544061877-3e1e63a1e1fc?auto=format&fit=crop&w=800&q=80",
    vendorName: "ErgoOffice Tech",
    vendorRating: 4.4,
    shippingTime: "3-5 días hábiles",
    description: "Ahorra espacio en tu escritorio suspendiendo tus dos pantallas en el aire. Brazos articulados con pistón de gas para ajustes suaves, permitiendo girar, inclinar y rotar tus monitores libremente.",
    specs: ["Soporte VESA 75/100", "Para monitores hasta 32\"", "Pistón de gas premium", "Gestión de cables oculta", "Construcción en aluminio"]
  },
  {
    id: 9,
    name: "Webcam 4K con Autoenfoque",
    category: "Tecnología",
    price: 110.00,
    originalPrice: 130.00,
    discount: "15%",
    featured: true,
    image: "https://images.unsplash.com/photo-1595562095655-2c8c67d363ab?auto=format&fit=crop&w=800&q=80",
    vendorName: "VisionTech",
    vendorRating: 4.9,
    shippingTime: "24 horas hábiles",
    description: "Luce siempre profesional en tus reuniones virtuales. Lente de cristal gran angular, corrección automática de baja iluminación y micrófonos estéreo duales para capturar tu voz con claridad cristalina.",
    specs: ["Resolución 4K a 30fps", "Micrófonos duales con reducción de ruido", "Autoenfoque rápido", "Tapa de privacidad", "Conexión USB-C plug and play"]
  },
  {
    id: 10,
    name: "Reposamuñecas Ergonómico de Gel",
    category: "Accesorios",
    price: 18.50,
    originalPrice: 18.50,
    discount: null,
    featured: false,
    image: "https://images.unsplash.com/photo-1629851605330-97593c6cc811?auto=format&fit=crop&w=800&q=80",
    vendorName: "StandDesk Solutions",
    vendorRating: 4.6,
    shippingTime: "2-3 días hábiles",
    description: "Cojín reposamuñecas premium con espuma viscoelástica de enfriamiento. Alivia la presión en las muñecas previniendo la fatiga durante largas sesiones de tipeo. Su base de goma antideslizante lo mantiene siempre en su lugar.",
    specs: ["Interior de espuma viscoelástica", "Superficie de tela transpirable", "Base antideslizante", "Diseño curvo anatómico", "Tamaño para teclado completo"]
  }
];
