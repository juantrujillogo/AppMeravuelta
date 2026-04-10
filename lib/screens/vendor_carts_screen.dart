import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';
import 'package:ventasia_marketplace/services/notification_service.dart';
import 'package:ventasia_marketplace/logic/automation_engine.dart';

class VendorCartsScreen extends StatelessWidget {
  const VendorCartsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final engine = context.watch<AutomationEngine>();
    final pendingCarts = engine.pendingCarts;

    if (pendingCarts.isEmpty) {
      return const Center(
        child: Text('No hay carritos abandonados.', style: TextStyle(color: AppColors.textSecondary)),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: pendingCarts.length,
      itemBuilder: (context, index) {
        final cart = pendingCarts[index];
        final status = cart['status'] as String;
        
        final statusColor = status == 'Enviado' ? AppColors.statusSent : AppColors.statusPending;
        
        return Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: NeumorphicContainer(
            padding: const EdgeInsets.all(16),
            borderRadius: 16,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Carrito #${cart['id']}',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.textMain),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: statusColor.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: statusColor),
                      ),
                      child: Text(
                        status,
                        style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text('Cliente: ${cart['client']}', style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                Text('Producto: ${cart['product']}', style: const TextStyle(color: AppColors.textMain, fontSize: 13)),
                Text('Valor Total: \$${cart['value']}', style: const TextStyle(color: AppColors.textMain, fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 16),
                if (status == 'Sin enviar')
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.successGreen,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        elevation: 0,
                      ),
                      onPressed: () {
                        // Acciones principales: Enviar descuento por AutomationEngine y emitir notificación
                        engine.sendDiscountToCart(index, 10);
                        NotificationService().showNotification(
                          id: index,
                          title: '¡Descuento Recibido!',
                          body: '¡Hola! Revisa tu carrito, te enviamos un 10% de descuento.',
                        );
                      },
                      icon: const Icon(Icons.send_rounded, size: 18),
                      label: const Text('Enviar descuento (10%)', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}
