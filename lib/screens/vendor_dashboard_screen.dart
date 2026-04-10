import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';
import 'package:ventasia_marketplace/logic/automation_engine.dart';

class VendorDashboardScreen extends StatelessWidget {
  const VendorDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Escucha cambios del provider automáticamente
    final engine = context.watch<AutomationEngine>();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Panel General',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.textMain),
          ),
          const SizedBox(height: 20),
          // 4 KPIs Grid
          GridView.count(
            physics: const NeverScrollableScrollPhysics(),
            shrinkWrap: true,
            crossAxisCount: 2,
            mainAxisSpacing: 16,
            crossAxisSpacing: 16,
            childAspectRatio: 1.2,
            children: [
              _buildKpiCard('Ingresos', '\$${engine.totalRevenue.toStringAsFixed(0)}', '+15%', Icons.attach_money),
              _buildKpiCard('Carritos (Aban.)', '${engine.abandonedCarts}', '+8%', Icons.shopping_cart_outlined),
              _buildKpiCard('Recuperados', '${engine.recoveredCarts}', '+\$${engine.recoveredRevenue.toStringAsFixed(0)}', Icons.autorenew, isGreen: true),
              _buildKpiCard('Clientes', '850', '+24', Icons.people_outline),
            ],
          ),
          const SizedBox(height: 24),
          const Text(
            'Rendimiento',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.textMain),
          ),
          const SizedBox(height: 16),
          _buildChartAreaPlaceholder(),
          const SizedBox(height: 16),
          _buildChartPiePlaceholder(),
        ],
      ),
    );
  }

  Widget _buildKpiCard(String title, String value, String change, IconData icon, {bool isGreen = false}) {
    return NeumorphicContainer(
      padding: const EdgeInsets.all(16),
      borderRadius: 20,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: AppColors.textSecondary, size: 20),
              Text(
                change,
                style: TextStyle(
                  color: isGreen ? AppColors.tagFrequent : AppColors.primaryBlue,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
              const SizedBox(height: 4),
              Text(
                value,
                style: const TextStyle(color: AppColors.textMain, fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildChartAreaPlaceholder() {
    return NeumorphicContainer(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Ingresos (Últimos 7 días)', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textMain)),
          const SizedBox(height: 16),
          Container(
            height: 120,
            width: double.infinity,
            decoration: BoxDecoration(
              color: AppColors.primaryBlue.withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.primaryBlueLight.withValues(alpha: 0.5), width: 2),
            ),
            child: const Center(
              child: Icon(Icons.show_chart, color: AppColors.primaryBlue, size: 48),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChartPiePlaceholder() {
    return NeumorphicContainer(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Tasa de Conversión', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.textMain)),
          const SizedBox(height: 16),
          Center(
            child: Container(
              height: 120,
              width: 120,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.tagFrequent.withValues(alpha: 0.05),
                border: Border.all(color: AppColors.tagFrequent, width: 8),
              ),
              child: const Center(
                child: Icon(Icons.pie_chart, color: AppColors.tagFrequent, size: 40),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
