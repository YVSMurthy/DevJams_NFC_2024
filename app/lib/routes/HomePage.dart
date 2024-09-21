import 'package:app/routes/CartPage.dart';
import 'package:app/routes/HistoryPage.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  HomePage({super.key});
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final List<Map<String, String>> currentCart = [];
  final List<Map<String, dynamic>> history = [];
  int _selectedIndex = 0;

  void addToCart(Map<String, String> item) {
    currentCart.add(item);
    print(currentCart[0]);
  }

  void addCartToHistory(Map<String, dynamic> cart) {
    history.add(cart);
  }

  void truncateCart() {
    currentCart.clear();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> _widgetOptions = <Widget>[
      CartPage(
        cart: currentCart,
        addHandler: addToCart,
        historyHandler: addCartToHistory,
        truncateHandler: truncateCart,
      ),
      HistoryPage(
        history: history,
      )
    ];
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 0, 0, 0),
      body: _widgetOptions.elementAt(_selectedIndex),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              icon: Icon(Icons.shopping_bag), label: "Carts"),
          BottomNavigationBarItem(icon: Icon(Icons.history), label: "History")
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Color.fromARGB(255, 188, 43, 255),
        backgroundColor: const Color.fromARGB(115, 51, 51, 51),
        unselectedItemColor: Colors.white,
        onTap: (int index) {
          setState(() {
            _selectedIndex = index;
          });
        },
      ),
    );
  }
}
