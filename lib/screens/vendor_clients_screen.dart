import 'package:flutter/material.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';

class VendorClientsScreen extends StatelessWidget {
  const VendorClientsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: 10,
      itemBuilder: (context, index) {
        final isVip = index % 3 == 0;
        return Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: NeumorphicContainer(
            padding: const EdgeInsets.all(16),
            borderRadius: 16,
            child: Row(
              children: [
                CircleAvatar(
                  radius: 24,
                  backgroundColor: AppColors.primaryBlue.withOpacity(0.1),
                  child: const Icon(Icons.person, color: AppColors.primaryBlue),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Cliente ${index + 1}',
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.textMain),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'cliente${index + 1}@email.com',
                        style: const TextStyle(color: AppColors.textSecondary, fontSize: 12),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: isVip ? AppColors.tagVip.withOpacity(0.1) : AppColors.tagFrequent.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isVip ? AppColors.tagVip : AppColors.tagFrequent,
                    ),
                  ),
                  child: Text(
                    isVip ? 'VIP' : 'Frecuente',
                    style: TextStyle(
                      color: isVip ? AppColors.tagVip : AppColors.tagFrequent,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
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
