# Requerimientos e Historias de Usuario - VentasIA Marketplace

Con base en el código desarrollado en Flutter y los objetivos del proyecto (un marketplace doble (B2C) con un motor de recuperación de ventas basado en inteligencia artificial y un estilo visual Neumórfico), aquí están los requerimientos e historias de usuario.

---

## 1. Requerimientos Funcionales

*   **RF01 (Autenticación):** El sistema debe permitir el inicio de sesión y registro de dos perfiles distintos: **Compradores** y **Vendedores**.
*   **RF02 (Enrutamiento):** El sistema debe identificar el rol seleccionado por el usuario en la etapa de login y redirigirlo a la interfaz correspondiente (`HomeScreen` o `VendorMainScreen`).
*   **RF03 (Panel de Comprador):** El sistema debe proporcionar al comprador una pantalla inicial con:
    *   Buscador de productos y botón de filtros.
    *   Carrusel o listado de beneficios (ej. Envío Gratis, Compra Segura).
    *   Cuadrícula de productos destacados mostrando precio, valoración, descuentos y nombre del producto.
*   **RF04 (Navegación del Comprador):** El comprador debe contar con un menú de navegación inferior que le permita moverse entre: Inicio, Favoritos, Carrito y Perfil personal.
*   **RF05 (Panel de Vendedor):** El sistema debe proporcionar al vendedor un panel de control (Dashboard) para monitorear sus métricas generales.
*   **RF06 (Gestión del Vendedor):** El vendedor debe poder navegar a pantallas específicas para observar su cartera de "Clientes" y auditar los "Carritos" de compra (activos o abandonados).
*   **RF07 (Motor de Automatización VentasIA):** El sistema debe proveer al vendedor un módulo dedicado (Automation Settings) para configurar y monitorear el chatbot de IA, el cual se encarga de contactar clientes para recuperación de ventas.

---

## 2. Requerimientos No Funcionales

*   **RNF01 (Interfaz y Experiencia de Usuario - UI/UX):** La aplicación debe aplicar un lenguaje de diseño **Neumórfico** (`NeumorphicContainer`), utilizando paletas de colores suaves, sombras y bordes redondeados para simular relieve 3D.
*   **RNF02 (Multiplataforma):** El framework de desarrollo debe ser **Flutter**, asegurando compatibilidad nativa para exportar el proyecto a Android, iOS y Web usando una única base de código.
*   **RNF03 (Escalabilidad de Código):** La arquitectura del software debe mantener una separación limpia de responsabilidades dividiendo el código en `screens` (vistas), `widgets` (componentes reutilizables), `theme` (estilos globales) y `logic` (motores virtuales).

---

## 3. Historias de Usuario (User Stories)

### 🧑‍🛍️ Epic 1: Experiencia del Comprador

**HU01 - Acceso Rápido por Rol**
> **Como** comprador,
> **Quiero** poder identificar y seleccionar fácilmente mi perfil "Comprador" en la pantalla de inicio de sesión,
> **Para** que la aplicación configure mi entorno y me muestre el catálogo de compras de inmediato.
> *Criterio de Aceptación:* La pantalla de login debe tener botones de selección de rol interactivos. Al ingresar con éxito, el sistema debe llevarme a la pantalla `HomeScreen`.

**HU02 - Exploración de Catálogo**
> **Como** comprador,
> **Quiero** ver un listado dinámico de los "Productos Destacados" con su respectivo descuento y calificación,
> **Para** tomar una decisión de compra rápida e informada.
> *Criterio de Aceptación:* La vista de inicio debe cargar una grilla (grid) de 2 columnas donde cada tarjeta neumórfica detalle el producto claramente.

**HU03 - Navegación entre Servicios de Compra**
> **Como** comprador,
> **Quiero** tener un menú inferior siempre visible,
> **Para** poder saltar fácilmente de mis búsquedas al "Carrito" o a mis "Favoritos" en un solo toque.
> *Criterio de Aceptación:* La barra inferior (`BottomNavigationBar`) debe reaccionar de forma visual a mis toques y cambiar el contenido de la pantalla al instante.

### 🏪 Epic 2: Herramientas del Vendedor

**HU04 - Redirección al Entorno de Negocios**
> **Como** vendedor,
> **Quiero** que el sistema reconozca mi rol al ingresar,
> **Para** que se me muestre el panel de comercio (`VendorMainScreen`) en lugar de ver la clásica pantalla de compras.
> *Criterio de Aceptación:* Al tocar "Ingresar" con el perfil de Vendedor marcado, se debe cargar el App Bar de "Panel Vendedor" con acceso a métricas exclusivas.

**HU05 - Seguimiento de Carritos (Preparación para IA)**
> **Como** vendedor,
> **Quiero** poder ver una sección específicamente dedicada a "Carritos",
> **Para** evaluar cuáles clientes dejaron compras a la mitad y necesitan un seguimiento.
> *Criterio de Aceptación:* La barra del vendedor debe incluir un ícono de carritos que lleve a `VendorCartsScreen`.

**HU06 - Automatización Inteligente (Motor VentasIA)**
> **Como** vendedor,
> **Quiero** tener acceso directo al Motor de Ventas (El Chatbot de Automatización),
> **Para** que la inteligencia artificial se encargue de interactuar y recuperar aquellas ventas perdidas sin que yo deba hacerlo manualmente.
> *Criterio de Aceptación:* El panel de navegación inferior debe poseer un ícono de carga/motor ("Bolt/Rayo") que abra directamente `AutomationSettingsScreen`.
