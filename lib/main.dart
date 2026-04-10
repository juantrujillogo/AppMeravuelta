import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ventasia_marketplace/theme/app_theme.dart';
import 'package:ventasia_marketplace/screens/login_screen.dart';
import 'package:ventasia_marketplace/logic/automation_engine.dart';

import 'package:ventasia_marketplace/services/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await NotificationService().init();

  runApp(
    ChangeNotifierProvider(
      create: (context) => AutomationEngine(),
      child: const SmartCartAIApp(),
    ),
  );
}

class SmartCartAIApp extends StatelessWidget {
  const SmartCartAIApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SmartCartAI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const LoginScreen(),
    );
  }
}
