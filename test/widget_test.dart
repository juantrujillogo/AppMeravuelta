// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

import 'package:ventasia_marketplace/main.dart';
import 'package:ventasia_marketplace/logic/automation_engine.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    // Wrap the app in the same providers as in main.dart
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (context) => AutomationEngine(),
        child: const SmartCartAIApp(),
      ),
    );

    // Allow the widget tree to settle.
    await tester.pumpAndSettle();

    // Verify that the main app widget is in the widget tree.
    expect(find.byType(SmartCartAIApp), findsOneWidget);
  });
}
