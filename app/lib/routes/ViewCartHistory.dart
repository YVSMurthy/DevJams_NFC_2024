import 'dart:convert';

import 'package:app/components/ItemTile.dart';
import 'package:app/routes/PaymentConfirmationPage.dart';
import 'package:flutter/material.dart';
import 'package:nfc_manager/nfc_manager.dart';
import 'package:http/http.dart' as http;
import 'package:qr_flutter/qr_flutter.dart';

class ViewCartHistory extends StatefulWidget {
  Map<String, String> cartInfo;
  List<Map<String, String>> cart;
  ViewCartHistory({super.key, required this.cart, required this.cartInfo});
  State<ViewCartHistory> createState() => _ViewCartHistoryState();
}

class _ViewCartHistoryState extends State<ViewCartHistory> {
  List<ItemTile> _listBuidler(List<Map<String, String>> itemList) {
    List<ItemTile> tiles = [];
    for (final item in itemList) {
      tiles.add(ItemTile(
        info: item,
      ));
    }
    return tiles;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        body: Container(
            child: Column(
          children: [
            Container(
                margin: EdgeInsets.only(top: 44),
                child: Text(
                  "Cart",
                  style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                )),
            Expanded(
                child: ListView(
              children: _listBuidler(widget.cart),
            )),
            Container(
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16)),
                margin: EdgeInsets.only(top: 80),
                width: MediaQuery.of(context).size.width - 100,
                child: Padding(
                    padding: EdgeInsets.all(10),
                    child: QrImageView(
                      data: jsonEncode(widget.cartInfo["hashes"]),
                      version: QrVersions.auto,
                    )))
          ],
        )));
  }
}
