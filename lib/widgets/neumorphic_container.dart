import 'package:flutter/material.dart';
import 'package:ventasia_marketplace/theme/app_colors.dart';

class NeumorphicContainer extends StatelessWidget {
  final Widget child;
  final double borderRadius;
  final EdgeInsetsGeometry padding;
  final EdgeInsetsGeometry margin;
  final Color backgroundColor;
  final bool isPressed;

  const NeumorphicContainer({
    Key? key,
    required this.child,
    this.borderRadius = 24.0,
    this.padding = const EdgeInsets.all(20.0),
    this.margin = EdgeInsets.zero,
    this.backgroundColor = AppColors.surface,
    this.isPressed = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin,
      padding: padding,
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
        boxShadow: isPressed
            ? [
                BoxShadow(
                  color: AppColors.shadowDark.withOpacity(0.5),
                  offset: const Offset(insetDistance, insetDistance),
                  blurRadius: 10,
                  spreadRadius: -2,
                ),
                BoxShadow(
                  color: AppColors.shadowLight,
                  offset: const Offset(-insetDistance, -insetDistance),
                  blurRadius: 10,
                  spreadRadius: -2,
                ),
              ]
            : [
                BoxShadow(
                  color: AppColors.shadowDark.withOpacity(0.6),
                  offset: const Offset(8, 8),
                  blurRadius: 16,
                ),
                BoxShadow(
                  color: AppColors.shadowLight,
                  offset: const Offset(-8, -8),
                  blurRadius: 16,
                ),
              ],
      ),
      child: child,
    );
  }

  static const double insetDistance = 4.0;
}
