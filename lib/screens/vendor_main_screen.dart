import 'package:flutter/material.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/screens/vendor_dashboard_screen.dart';
import 'package:ventasia_marketplace/screens/vendor_clients_screen.dart';
import 'package:ventasia_marketplace/screens/vendor_carts_screen.dart';
import 'package:ventasia_marketplace/screens/automation_settings_screen.dart';
import 'package:ventasia_marketplace/screens/login_screen.dart';

class VendorMainScreen extends StatefulWidget {
  const VendorMainScreen({Key? key}) : super(key: key);

  @override
  State<VendorMainScreen> createState() => _VendorMainScreenState();
}

class _VendorMainScreenState extends State<VendorMainScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const VendorDashboardScreen(),
    const VendorClientsScreen(),
    const VendorCartsScreen(),
    const AutomationSettingsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        elevation: 0,
        title: const Text(
          'Panel Vendedor',
          style: TextStyle(color: AppColors.primaryBlue, fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: AppColors.textSecondary),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const LoginScreen()),
              );
            },
          ),
        ],
      ),
      body: SafeArea(
        child: _screens[_currentIndex],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        selectedItemColor: AppColors.primaryBlue,
        unselectedItemColor: AppColors.textSecondary,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard_outlined), label: 'Panel'),
          BottomNavigationBarItem(icon: Icon(Icons.people_outline), label: 'Clientes'),
          BottomNavigationBarItem(icon: Icon(Icons.remove_shopping_cart_outlined), label: 'Carritos'),
          BottomNavigationBarItem(icon: Icon(Icons.bolt_outlined), label: 'Motor'),
        ],
      ),
    );
  }
}
