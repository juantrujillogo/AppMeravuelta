# Integración Backend con Firebase - VentasIA Marketplace

Para reemplazar la simulación local de `automation_engine.dart` por datos en tiempo real, deberás implementar la siguiente arquitectura en Firebase:

## 1. Cloud Firestore (Colecciones Principales)

### Colección: `users`
- `uid` (String): ID único de autenticación.
- `role` (String): 'comprador' o 'vendedor'.
- `segment` (String): 'VIP', 'Frecuente', 'Nuevo'.

### Colección: `carts`
- `cartId` (String): ID del carrito.
- `buyerId` (String): Referencia al documento en `users`.
- `status` (String): 'activo', 'abandonado_15m', 'abandonado_180m', 'completado'.
- `lastUpdated` (Timestamp): Timestamp de la última modificación (crucial para los timers).
- `totalValue` (Number): Valor actual.

### Colección: `automations`
- `vendorId` (String): Creador de la regla.
- `quickRecoveryActive` (Boolean): Regla de recuperación a los 15 minutos.
- `deepRecoveryActive` (Boolean): Regla de recuperación a las 3 horas.

### Colección: `bot_chats`
- `chatId`, `buyerId`, `messages` (Array de mapas con {text, isDiscount, discountValue, timestamp}).

## 2. Firebase Cloud Functions (El Motor Real de Triggers)
El temporizador del carrito abandonado no debe residir en el cliente (Flutter) para evitar que se pierda si el usuario cierra la app. Debes usar **Cloud Functions**:

*   **Pub/Sub (Cron Job):** Crea una función programada que se ejecute cada 5 minutos.
*   **Lógica del Cron:** Búsqueda en Firestore de los `carts` donde `status == 'activo'`.
    *   Si `(now - lastUpdated) >= 15 min`:
        1. Verifica si la tienda tiene `quickRecoveryActive == true`.
        2. Escribe un nuevo mensaje de oferta (10%) en `bot_chats`.
        3. Envía una Push Notification vía **FCM (Firebase Cloud Messaging)** al teléfono del comprador.
        4. Actualiza el status del carrito a `'abandonado_15m'`.

## 3. Refactorización en Flutter
En el Front-End hemos usado `Provider`. Para conectarlo a Firebase, deberás reemplazar las funciones de simulación (`simulate15MinTrigger`) por llamadas HTTP o Mutaciones a Firestore, y cambiar las Listas locales en el Provider por un `StreamProvider` que escuche directamente los cambios en Firestore utilizando `FirebaseFirestore.instance.collection('carts').snapshots()`.
