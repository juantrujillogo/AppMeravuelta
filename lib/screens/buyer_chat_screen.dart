import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';
import 'package:ventasia_marketplace/logic/automation_engine.dart';

class BuyerChatScreen extends StatelessWidget {
  const BuyerChatScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Watch via Provider
    final engine = context.watch<AutomationEngine>();
    final messages = engine.buyerChatMessages;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.surface,
        elevation: 1,
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor: AppColors.primaryBlue.withOpacity(0.2),
              child: const Icon(Icons.support_agent, color: AppColors.primaryBlue),
            ),
            const SizedBox(width: 12),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Soporte VentasIA', style: TextStyle(color: AppColors.textMain, fontSize: 16, fontWeight: FontWeight.bold)),
                Text('En línea', style: TextStyle(color: AppColors.tagFrequent, fontSize: 12)),
              ],
            )
          ],
        ),
        iconTheme: const IconThemeData(color: AppColors.textMain),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.all(20),
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final msg = messages[index];
                  final isBot = msg['sender'] == 'bot';
                  
                  return Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    alignment: isBot ? Alignment.centerLeft : Alignment.centerRight,
                    child: Container(
                      constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
                      child: NeumorphicContainer(
                        padding: const EdgeInsets.all(16),
                        borderRadius: 20,
                        backgroundColor: isBot ? AppColors.surface : AppColors.primaryBlue,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              msg['text'],
                              style: TextStyle(
                                color: isBot ? AppColors.textMain : Colors.white,
                                fontSize: 14,
                              ),
                            ),
                            if (msg['isDiscount'] == true) ...[
                              const SizedBox(height: 12),
                              SizedBox(
                                width: double.infinity,
                                child: ElevatedButton(
                                  onPressed: () {
                                    context.read<AutomationEngine>().applyDiscountAndCompletePurchase(120.0, msg['discountValue']);
                                  },
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.successGreen,
                                    foregroundColor: Colors.white,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                  ),
                                  child: Text(
                                    'Aplicar ${msg['discountValue']}% y Comprar',
                                    style: const TextStyle(fontWeight: FontWeight.bold),
                                  ),
                                ),
                              )
                            ]
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            _buildChatInput(),
          ],
        ),
      ),
    );
  }

  Widget _buildChatInput() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        color: AppColors.surface,
        boxShadow: [BoxShadow(color: AppColors.shadowDark, blurRadius: 10, offset: Offset(0, -2))],
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Escribe un mensaje...',
                filled: true,
                fillColor: AppColors.background,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(24), borderSide: BorderSide.none),
                contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              ),
            ),
          ),
          const SizedBox(width: 12),
          CircleAvatar(
            backgroundColor: AppColors.primaryBlue,
            radius: 24,
            child: IconButton(
              icon: const Icon(Icons.send, color: Colors.white),
              onPressed: () {},
            ),
          )
        ],
      ),
    );
  }
}
