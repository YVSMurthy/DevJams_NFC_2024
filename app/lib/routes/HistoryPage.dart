import 'package:app/components/CartTile.dart';
import 'package:app/components/ItemTile.dart';
import 'package:flutter/material.dart';

class HistoryPage extends StatefulWidget {
  List<Map<String, dynamic>> history;
  HistoryPage({super.key, required this.history});
  State<HistoryPage> createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {
  List<CartTile> _listBuidler(List<Map<String, dynamic>> cartList) {
    List<CartTile> tiles = [];
    for (final cart in cartList) {
      Map<String, String> info = {
        "cart_id": cart["cart_id"].toString(),
        "createdOn": cart["createdOn"].toString(),
        "totalCost": cart["totalCost"].toString()
      };
      tiles.add(CartTile(info: info, items: cart["items"]));
    }
    return tiles;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        body: Container(
            child: Column(children: <Widget>[
          Container(
              margin: EdgeInsets.only(top: 44),
              child: Text(
                "History",
                style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Colors.white),
              )),
          Expanded(
              child: ListView(
            children: _listBuidler(widget.history),
          )),
        ])));
  }
}
