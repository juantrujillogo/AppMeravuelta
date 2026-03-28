import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ventasia_marketplace/theme/app_theme.dart';
import 'package:ventasia_marketplace/screens/login_screen.dart';
import 'package:ventasia_marketplace/logic/automation_engine.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => AutomationEngine(),
      child: const SmartCartAIApp(),
    ),
  );
}

class SmartCartAIApp extends StatelessWidget {
  const SmartCartAIApp({Key? key}) : super(key: key);

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
