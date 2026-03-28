import 'package:flutter/material.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';
import 'package:ventasia_marketplace/screens/home_screen.dart';
import 'package:ventasia_marketplace/screens/vendor_main_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool isLoginTab = true;
  bool isPasswordObscured = true;
  String selectedRole = 'Comprador';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              // Logo placeholder
              Icon(Icons.shopping_bag_rounded,
                  size: 64, color: AppColors.primaryBlue),
              const SizedBox(height: 16),
              const Text(
                'VentasIA',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primaryBlue,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 40),

              // Login Card using NeumorphicContainer
              NeumorphicContainer(
                child: Column(
                  children: [
                    // Custom Tabs
                    Container(
                      decoration: BoxDecoration(
                        color: AppColors.background,
                        borderRadius: BorderRadius.circular(24.0),
                      ),
                      padding: const EdgeInsets.all(4.0),
                      child: Row(
                        children: [
                          Expanded(
                            child: _buildTab(
                              title: 'Iniciar Sesión',
                              isActive: isLoginTab,
                              onTap: () => setState(() => isLoginTab = true),
                            ),
                          ),
                          Expanded(
                            child: _buildTab(
                              title: 'Registrarse',
                              isActive: !isLoginTab,
                              onTap: () => setState(() => isLoginTab = false),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Inputs
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Correo electrónico',
                        prefixIcon: const Icon(Icons.email_outlined,
                            color: AppColors.textSecondary),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      obscureText: isPasswordObscured,
                      decoration: InputDecoration(
                        hintText: 'Contraseña',
                        prefixIcon: const Icon(Icons.lock_outline,
                            color: AppColors.textSecondary),
                        suffixIcon: IconButton(
                          icon: Icon(
                            isPasswordObscured
                                ? Icons.visibility_off_outlined
                                : Icons.visibility_outlined,
                            color: AppColors.textSecondary,
                          ),
                          onPressed: () {
                            setState(() {
                              isPasswordObscured = !isPasswordObscured;
                            });
                          },
                        ),
                      ),
                    ),

                    if (isLoginTab) ...[
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton(
                          onPressed: () {},
                          child: const Text('¿Olvidaste tu contraseña?'),
                        ),
                      ),
                      const SizedBox(height: 8),
                    ] else ...[
                      const SizedBox(height: 24),
                    ],

                    // Action Button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          // Navigate depending on selected role
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                                builder: (context) => selectedRole == 'Vendedor'
                                    ? const VendorMainScreen()
                                    : const HomeScreen()),
                          );
                        },
                        child: Text(
                          isLoginTab ? 'Ingresar a mi cuenta' : 'Crear cuenta',
                          style: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 48),

              // Role selection (Quick access)
              const Text(
                'Acceso rápido por rol',
                style: TextStyle(
                    color: AppColors.textSecondary,
                    fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildRoleButton('Comprador', Icons.person_outline),
                  const SizedBox(width: 16),
                  _buildRoleButton('Vendedor', Icons.storefront_outlined),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTab(
      {required String title,
      required bool isActive,
      required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: isActive ? AppColors.surface : Colors.transparent,
          borderRadius: BorderRadius.circular(20.0),
          boxShadow: isActive
              ? [
                  BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 4,
                      offset: const Offset(0, 2)),
                ]
              : [],
        ),
        alignment: Alignment.center,
        child: Text(
          title,
          style: TextStyle(
            color: isActive ? AppColors.primaryBlue : AppColors.textSecondary,
            fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  Widget _buildRoleButton(String role, IconData icon) {
    final isSelected = selectedRole == role;
    return GestureDetector(
      onTap: () => setState(() => selectedRole = role),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.primaryBlue.withOpacity(0.1)
              : AppColors.surface,
          borderRadius: BorderRadius.circular(24.0),
          border: Border.all(
            color: isSelected ? AppColors.primaryBlue : AppColors.background,
            width: 2,
          ),
        ),
        child: Row(
          children: [
            Icon(icon,
                size: 20,
                color: isSelected
                    ? AppColors.primaryBlue
                    : AppColors.textSecondary),
            const SizedBox(width: 8),
            Text(
              role,
              style: TextStyle(
                color: isSelected
                    ? AppColors.primaryBlue
                    : AppColors.textSecondary,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
