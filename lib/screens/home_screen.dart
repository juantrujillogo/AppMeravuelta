import 'package:flutter/material.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            _buildHeader(),
            _buildSearchAndFilter(),
            _buildBenefitsList(),
            _buildSectionTitle('Productos Destacados'),
            _buildProductGrid(),
            const SliverToBoxAdapter(child: SizedBox(height: 24)),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        selectedItemColor: AppColors.primaryBlue,
        unselectedItemColor: AppColors.textSecondary,
        showUnselectedLabels: true,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_filled), label: 'Inicio'),
          BottomNavigationBarItem(icon: Icon(Icons.favorite_border), label: 'Favoritos'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart_outlined), label: 'Carrito'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Perfil'),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return SliverToBoxAdapter(
      child: Container(
        padding: const EdgeInsets.all(24.0),
        decoration: const BoxDecoration(
          color: AppColors.primaryBlue,
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(32),
            bottomRight: Radius.circular(32),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'VentasIA\nMarketplace',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    height: 1.2,
                  ),
                ),
                CircleAvatar(
                  backgroundColor: Colors.white.withOpacity(0.2),
                  child: const Icon(Icons.notifications_none, color: Colors.white),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Text(
                    '+10k Productos',
                    style: TextStyle(
                      color: AppColors.primaryBlue,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.local_shipping_outlined, color: Colors.white, size: 14),
                      SizedBox(width: 4),
                      Text(
                        'Envío Gratis',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchAndFilter() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 24, 20, 16),
        child: Row(
          children: [
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24.0),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.shadowDark.withOpacity(0.2),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: const TextField(
                  decoration: InputDecoration(
                    hintText: 'Buscar productos...',
                    prefixIcon: Icon(Icons.search, color: AppColors.textSecondary),
                    filled: false, // Override theme
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(vertical: 16),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.primaryBlue,
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Icon(Icons.tune, color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBenefitsList() {
    final benefits = [
      {'icon': Icons.local_shipping_outlined, 'title': 'Envío Gratis'},
      {'icon': Icons.security_outlined, 'title': 'Compra Segura'},
      {'icon': Icons.assignment_return_outlined, 'title': 'Devoluciones'},
      {'icon': Icons.support_agent_outlined, 'title': 'Soporte 24/7'},
    ];

    return SliverToBoxAdapter(
      child: SizedBox(
        height: 100,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 20),
          itemCount: benefits.length,
          itemBuilder: (context, index) {
            final benefit = benefits[index];
            return Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Container(
                width: 100,
                child: NeumorphicContainer(
                  padding: const EdgeInsets.all(12),
                  borderRadius: 20,
                  margin: const EdgeInsets.symmetric(vertical: 4),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(benefit['icon'] as IconData, color: AppColors.primaryBlue),
                      const SizedBox(height: 8),
                      Text(
                        benefit['title'] as String,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 24, 20, 16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.textMain,
              ),
            ),
            const Text(
              'Ver todo',
              style: TextStyle(
                color: AppColors.primaryBlue,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProductGrid() {
    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      sliver: SliverGrid(
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          childAspectRatio: 0.60, // Adjusted aspect ratio for longer text
        ),
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            return _buildProductCard(index);
          },
          childCount: 6,
        ),
      ),
    );
  }

  Widget _buildProductCard(int index) {
    return NeumorphicContainer(
      padding: EdgeInsets.zero,
      borderRadius: 24,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image and badges
          Expanded(
            flex: 4,
            child: Stack(
              children: [
                Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                  ),
                  child: const Center(
                    child: Icon(Icons.image_outlined, size: 48, color: AppColors.shadowDark),
                  ),
                ),
                Positioned(
                  top: 8,
                  left: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.tagDiscount,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Text(
                      '-13%',
                      style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
                Positioned(
                  top: 8,
                  right: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.tagFeatured,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Text(
                      'Destacado',
                      style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Product details
          Expanded(
            flex: 5,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(12, 12, 12, 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Auriculares Inalámbricos Pro Max',
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: AppColors.textMain,
                      fontSize: 13,
                    ),
                  ),
                  const Row(
                    children: [
                      Icon(Icons.star, color: AppColors.tagFeatured, size: 14),
                      SizedBox(width: 4),
                      Text('4.8 (120)', style: TextStyle(fontSize: 11, color: AppColors.textSecondary)),
                    ],
                  ),
                  const Text('Por AudioTech', maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                  const Text(
                    '\$89.99',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: AppColors.primaryBlue,
                      fontSize: 16,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
