import 'package:flutter/material.dart';

class AutomationEngine extends ChangeNotifier {
  // Settings
  bool isQuickRecoveryEnabled = true;
  bool isDeepRecoveryEnabled = false;

  // Dashboard Metrics
  double totalRevenue = 12450.0;
  double recoveredRevenue = 0.0;
  int abandonedCarts = 142;
  int recoveredCarts = 34;

  // Buyer Simulation State
  List<Map<String, dynamic>> buyerChatMessages = [
    {
      "sender": "bot",
      "text":
          "¡Hola! Notamos que dejaste algunos artículos geniales en tu carrito.",
      "isDiscount": false,
      "discountValue": 0,
    },
  ];

  void toggleQuickRecovery(bool value) {
    isQuickRecoveryEnabled = value;
    notifyListeners();
  }

  void toggleDeepRecovery(bool value) {
    isDeepRecoveryEnabled = value;
    notifyListeners();
  }

  // Simulates 15 min abandoned cart delay
  void simulate15MinTrigger() {
    if (!isQuickRecoveryEnabled) return;
    buyerChatMessages.add({
      "sender": "bot",
      "text":
          "¡No te lo pierdas! Aquí tienes un 10% de descuento para completar tu compra ahora.",
      "isDiscount": true,
      "discountValue": 10,
    });
    notifyListeners();
  }

  // Simulates 180 min (3 hours) abandoned cart delay
  void simulate180MinTrigger() {
    if (!isQuickRecoveryEnabled) return;
    buyerChatMessages.add({
      "sender": "bot",
      "text":
          "¡Última oportunidad especial! Tienes un 15% de descuento. Válido por 1 hora.",
      "isDiscount": true,
      "discountValue": 15,
    });
    notifyListeners();
  }

  // Buyer accepts the discount
  void applyDiscountAndCompletePurchase(double cartValue, int discountPercent) {
    final finalPrice = cartValue * (1 - (discountPercent / 100));

    // Update Vendor Metrics
    totalRevenue += finalPrice;
    recoveredRevenue += finalPrice;
    recoveredCarts += 1;
    abandonedCarts -= 1;

    // Update Chat
    buyerChatMessages.add({
      "sender": "user",
      "text":
          "He aplicado el descuento de $discountPercent% y completado la compra.",
      "isDiscount": false,
      "discountValue": 0,
    });
    notifyListeners();
  }
}
