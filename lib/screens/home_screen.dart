import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';
import 'package:ventasia_marketplace/widgets/neumorphic_container.dart';
import 'package:ventasia_marketplace/logic/automation_engine.dart';
import 'package:ventasia_marketplace/screens/buyer_chat_screen.dart';
import 'package:ventasia_marketplace/screens/login_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Map<String, dynamic>> _dummyProducts = [
    {
      'name': 'Auriculares Inalámbricos Pro Max',
      'provider': 'AudioTech',
      'price': 89.99,
      'rating': '4.8',
      'reviews': 120,
      'discount': '-13%',
      'image': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      'name': 'Smartwatch Serie 7',
      'provider': 'TechWear',
      'price': 199.99,
      'rating': '4.9',
      'reviews': 340,
      'discount': '-20%',
      'image': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      'name': 'Cámara DSLR Alpha',
      'provider': 'PhotoPro',
      'price': 749.50,
      'rating': '4.7',
      'reviews': 56,
      'discount': '-5%',
      'image': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      'name': 'Zapatillas Runner X',
      'provider': 'SpeedFit',
      'price': 59.90,
      'rating': '4.5',
      'reviews': 89,
      'discount': '-30%',
      'image': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      'name': 'Mochila Minimalista',
      'provider': 'BagStore',
      'price': 34.99,
      'rating': '4.6',
      'reviews': 210,
      'discount': '',
      'image': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      'name': 'Gafas de Sol Clásicas',
      'provider': 'SunStyle',
      'price': 24.99,
      'rating': '4.4',
      'reviews': 45,
      'discount': '',
      'image': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
  ];

  @override
  Widget build(BuildContext context) {
    // Array of screens based on current index
    final List<Widget> screens = [
      _buildHomeContent(),
      _buildFavoritesContent(),
      const BuyerChatScreen(), // El Carrito ahora muestra el Chatbot
      _buildProfileContent(),
    ];

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: screens[_currentIndex],
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

  // ========== TABS ==========

  Widget _buildHomeContent() {
    return CustomScrollView(
      slivers: [
        _buildHeader(),
        _buildSearchAndFilter(),
        _buildBenefitsList(),
        _buildSectionTitle('Productos Destacados'),
        _buildProductGrid(),
        const SliverToBoxAdapter(child: SizedBox(height: 24)),
      ],
    );
  }

  Widget _buildFavoritesContent() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.favorite_border, size: 64, color: AppColors.textSecondary),
          SizedBox(height: 16),
          Text('Aún no tienes favoritos', style: TextStyle(color: AppColors.textSecondary)),
        ],
      ),
    );
  }

  Widget _buildProfileContent() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircleAvatar(
            radius: 50,
            backgroundColor: AppColors.primaryBlue,
            child: Icon(Icons.person, size: 50, color: Colors.white),
          ),
          const SizedBox(height: 16),
          const Text('Comprador Demo', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.textMain)),
          const SizedBox(height: 32),
          ElevatedButton.icon(
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const LoginScreen()),
              );
            },
            icon: const Icon(Icons.logout),
            label: const Text('Cerrar Sesión para entrar como Vendedor'),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.surface,
              foregroundColor: AppColors.statusOpened,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            ),
          )
        ],
      ),
    );
  }

  // ========== UI COMPONENTS ==========

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
                  style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold, height: 1.2),
                ),
                Consumer<AutomationEngine>(
                  builder: (context, engine, child) {
                    return GestureDetector(
                      onTap: () {
                        if (engine.unreadBuyerNotifications > 0 || engine.buyerNotifications.isNotEmpty) {
                          _showNotificationsDialog(context, engine);
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('No tienes notificaciones nuevas.')));
                        }
                      },
                      child: Stack(
                        children: [
                          CircleAvatar(
                            backgroundColor: Colors.white.withValues(alpha: 0.2),
                            child: const Icon(Icons.notifications_none, color: Colors.white),
                          ),
                          if (engine.unreadBuyerNotifications > 0)
                            Positioned(
                              right: 0,
                              top: 0,
                              child: Container(
                                padding: const EdgeInsets.all(4),
                                decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
                                child: Text(
                                  '${engine.unreadBuyerNotifications}',
                                  style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                        ],
                      ),
                    );
                  },
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
                  child: const Text('+10k Productos', style: TextStyle(color: AppColors.primaryBlue, fontWeight: FontWeight.bold, fontSize: 12)),
                ),
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(16)),
                  child: const Row(
                    children: [
                      Icon(Icons.local_shipping_outlined, color: Colors.white, size: 14),
                      SizedBox(width: 4),
                      Text('Envío Gratis', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
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
                    BoxShadow(color: AppColors.shadowDark.withValues(alpha: 0.2), blurRadius: 10, offset: const Offset(0, 4)),
                  ],
                ),
                child: const TextField(
                  decoration: InputDecoration(
                    hintText: 'Buscar productos...',
                    prefixIcon: Icon(Icons.search, color: AppColors.textSecondary),
                    filled: false,
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
              decoration: BoxDecoration(color: AppColors.primaryBlue, borderRadius: BorderRadius.circular(20)),
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
              child: SizedBox(
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
                        style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.textSecondary),
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
            Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.textMain)),
            const Text('Ver todo', style: TextStyle(color: AppColors.primaryBlue, fontWeight: FontWeight.w600)),
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
          childAspectRatio: 0.60,
        ),
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            return _buildProductCard(index);
          },
          childCount: _dummyProducts.length,
        ),
      ),
    );
  }

  Widget _buildProductCard(int index) {
    final product = _dummyProducts[index];
    final hasDiscount = (product['discount'] as String).isNotEmpty;

    return GestureDetector(
      onTap: () {
        // Al darle clic al producto simulamos un carrito abandonado.
        context.read<AutomationEngine>().abandonCart(product['name'], product['price']);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('¡${product['name']} agregado a tu Carrito!'),
            backgroundColor: AppColors.successGreen,
            duration: const Duration(seconds: 2),
          ),
        );
      },
      child: NeumorphicContainer(
        padding: EdgeInsets.zero,
        borderRadius: 24,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              flex: 5,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                    child: Image.network(
                      product['image'],
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                         return const Center(child: Icon(Icons.image_outlined, size: 48, color: AppColors.shadowDark));
                      },
                    ),
                  ),
                  if (hasDiscount)
                    Positioned(
                      top: 8,
                      left: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                        decoration: BoxDecoration(color: AppColors.tagDiscount, borderRadius: BorderRadius.circular(12)),
                        child: Text(product['discount'], style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                    ),
                  if (index == 0) // Destacado demo
                    Positioned(
                      top: 8,
                      right: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
                        decoration: BoxDecoration(color: AppColors.tagFeatured, borderRadius: BorderRadius.circular(12)),
                        child: const Text('Destacado', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                    ),
                ],
              ),
            ),
            Expanded(
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      product['name'],
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.textMain, fontSize: 12),
                    ),
                    Row(
                      children: [
                        const Icon(Icons.star, color: AppColors.tagFeatured, size: 12),
                        const SizedBox(width: 4),
                        Text('${product['rating']} (${product['reviews']})', style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                      ],
                    ),
                    Text('Por ${product['provider']}', maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                    Text(
                      '\$${product['price']}',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.primaryBlue, fontSize: 15),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showNotificationsDialog(BuildContext context, AutomationEngine engine) {
    // Marcar como leídas al abrir
    engine.markNotificationsAsRead();
    
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Notificaciones', style: TextStyle(fontWeight: FontWeight.bold)),
          backgroundColor: AppColors.surface,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          content: SizedBox(
            width: double.maxFinite,
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: engine.buyerNotifications.length,
              itemBuilder: (context, index) {
                return ListTile(
                  leading: const CircleAvatar(
                    backgroundColor: AppColors.tagDiscount,
                    child: Icon(Icons.percent, color: Colors.white, size: 16),
                  ),
                  title: Text(engine.buyerNotifications[index], style: const TextStyle(fontSize: 14)),
                  contentPadding: const EdgeInsets.symmetric(vertical: 4),
                );
              },
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cerrar'),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.primaryBlue, foregroundColor: Colors.white),
              onPressed: () {
                Navigator.pop(context);
                setState(() {
                  _currentIndex = 2; // Ir al carrito/chat
                });
              },
              child: const Text('Ver Oferta'),
            ),
          ],
        );
      },
    );
  }
}
