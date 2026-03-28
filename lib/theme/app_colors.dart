import 'package:flutter/material.dart';

class AppColors {
  // Primary brand colors
  static const Color primaryBlue = Color(0xFF2563EB); // Vibrant Blue
  static const Color primaryBlueLight = Color(0xFF60A5FA);
  
  // Neutral colors for Neumorphism
  static const Color background = Color(0xFFF3F4F6); // Light gray background
  static const Color surface = Color(0xFFFFFFFF); // White cards
  
  static const Color textMain = Color(0xFF1F2937); // Dark gray
  static const Color textSecondary = Color(0xFF6B7280); // Medium gray
  
  // Accents / Tags (Buyer)
  static const Color tagDiscount = Color(0xFFEF4444); // Red
  static const Color tagFeatured = Color(0xFFEAB308); // Yellow
  
  // Accents / Tags (Vendor)
  static const Color tagVip = Color(0xFF8B5CF6); // Purple
  static const Color tagFrequent = Color(0xFF10B981); // Green
  static const Color successGreen = Color(0xFF10B981); // Green for actions
  
  // Cart Statuses
  static const Color statusPending = Color(0xFFF59E0B); // Amber
  static const Color statusSent = Color(0xFF3B82F6); // Blue
  static const Color statusOpened = Color(0xFF10B981); // Green
  
  // Shadows (Neumorphism)
  // Light source top-left, shadow bottom-right
  static const Color shadowDark = Color(0xFFD1D5DB);
  static const Color shadowLight = Color(0xFFFFFFFF);
}
