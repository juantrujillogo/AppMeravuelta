import 'package:flutter/material.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';

class VendorCartsScreen extends StatelessWidget {
  const VendorCartsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final statuses = ['Sin enviar', 'Enviado', 'Abierto'];
    final statusColors = [AppColors.statusPending, AppColors.statusSent, AppColors.statusOpened];

    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: 6,
      itemBuilder: (context, index) {
        final statusIndex = index % 3;
        final status = statuses[statusIndex];
        final statusColor = statusColors[statusIndex];
        
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
                      'Carrito #${1042 + index}',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.textMain),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: statusColor.withOpacity(0.1),
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
                const Text('Cliente: Juan Pérez', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                const Text('Valor Total: \$120.00', style: TextStyle(color: AppColors.textMain, fontWeight: FontWeight.bold, fontSize: 14)),
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
                      onPressed: () {},
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
