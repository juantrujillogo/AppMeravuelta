import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';
import 'package:ventasia_marketplace/logic/automation_engine.dart';

class AutomationSettingsScreen extends StatelessWidget {
  const AutomationSettingsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Watch via provider
    final engine = context.watch<AutomationEngine>();

    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        const Text(
          'Motor de Recuperación',
          
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.primaryBlue),
        ),
        const SizedBox(height: 8),
        const Text(
          'Configura las reglas automáticas estilo chatbot para recuperar carritos abandonados.',
          style: TextStyle(color: AppColors.textSecondary),
        ),
        const SizedBox(height: 24),
        
        _buildRuleCard(
          title: 'Recuperación Rápida (15 min)',
          description: 'Envía un chatbot con 10% de descuento si el cliente abandona por 15 minutos.',
          icon: Icons.timer_outlined,
          value: engine.isQuickRecoveryEnabled,
          onChanged: (val) => context.read<AutomationEngine>().toggleQuickRecovery(val),
        ),
        const SizedBox(height: 16),
        _buildRuleCard(
          title: 'Última Oportunidad (180 min)',
          description: 'Envía un segundo mensaje con 15% de descuento si no hay respuesta en 3 horas.',
          icon: Icons.hourglass_empty_outlined,
          value: engine.isDeepRecoveryEnabled,
          onChanged: (val) => context.read<AutomationEngine>().toggleDeepRecovery(val),
        ),
        
        const SizedBox(height: 40),
        const Text(
          'Simulación (Para pruebas)',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.textMain),
        ),
        const SizedBox(height: 16),
        NeumorphicContainer(
          borderRadius: 16,
          child: Column(
            children: [
              const Text('Usa estos botones para simular el paso del tiempo y disparar las reglas configuradas.', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: engine.isQuickRecoveryEnabled ? () {
                    context.read<AutomationEngine>().simulate15MinTrigger();
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Simulando 15 min... Chat enviado al Comprador.')));
                  } : null,
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.statusPending),
                  child: const Text('Simular +15 min', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
              const SizedBox(height: 8),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: engine.isDeepRecoveryEnabled ? () {
                    context.read<AutomationEngine>().simulate180MinTrigger();
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Simulando 180 min... Chat enviado al Comprador.')));
                  } : null,
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.tagDiscount),
                  child: const Text('Simular +180 min', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        )
      ],
    );
  }

  Widget _buildRuleCard({
    required String title,
    required String description,
    required IconData icon,
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    return NeumorphicContainer(
      padding: const EdgeInsets.all(16),
      borderRadius: 20,
      child: Column(
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppColors.primaryBlue.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: AppColors.primaryBlue),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.textMain),
                ),
              ),
              Switch(
                value: value,
                onChanged: onChanged,
                activeColor: AppColors.primaryBlue,
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(description, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
        ],
      ),
    );
  }
}
