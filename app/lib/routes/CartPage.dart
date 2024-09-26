import 'dart:convert';

import 'package:app/components/ItemTile.dart';
import 'package:app/routes/PaymentConfirmationPage.dart';
import 'package:flutter/material.dart';
import 'package:nfc_manager/nfc_manager.dart';
import 'package:http/http.dart' as http;

class CartPage extends StatefulWidget {
  List<Map<String, String>> cart;
  Function addHandler;
  Function historyHandler;
  Function truncateHandler;
  CartPage(
      {super.key,
      required this.cart,
      required this.addHandler,
      required this.historyHandler,
      required this.truncateHandler});
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  List<ItemTile> _listBuidler(List<Map<String, String>> itemList) {
    List<ItemTile> tiles = [];
    for (final item in itemList) {
      tiles.add(ItemTile(
        info: item,
      ));
    }
    return tiles;
  }

  Future<List<Map<String, String>>> getHashes() async {
    List<Map<String, String>> hashes = [];

    for (final item in widget.cart) {
      var res = await http.get(Uri.http("192.168.28.149:5050",
          "/getProductHash", {"product_id": item["product_id"]}));

      var parsedResponse = jsonDecode(res.body);
      var mappedResponse = parsedResponse[0];
      Map<String, String> stringifiedMap = {};

      for (final key in mappedResponse.keys) {
        stringifiedMap[key] = mappedResponse[key].toString();
      }

      hashes.add(stringifiedMap);
    }

    return hashes;
  }

  @override
  Widget build(BuildContext context) {
    NfcManager.instance.startSession(onDiscovered: (NfcTag tag) async {
      var ndef = Ndef.from(tag);

      if (ndef != null && ndef.cachedMessage != null) {
        String data = "";
        for (var record in ndef.cachedMessage!.records) {
          data =
              "$data ${String.fromCharCodes(record.payload.sublist(record.payload[0] + 1))}";
        }
        const decoder = JsonDecoder();
        Map decodedData = decoder.convert(data);
        print(decodedData);
        var res = await http.get(Uri.http(
            "192.168.28.149:5050",
            "/getProductById",
            {"product_id": decodedData["product_id"].toString()}));

        var parsedResponse = jsonDecode(res.body) as List;
        Map mappedResponse = parsedResponse[0];
        Map<String, String> stringifiedMap = {};

        for (final key in mappedResponse.keys) {
          stringifiedMap[key] = mappedResponse[key].toString();
        }

        bool unique = (widget.cart
                .where((elem) =>
                    elem["product_id"] == stringifiedMap["product_id"])
                .toList()
                .length ==
            0);

        if (unique) {
          widget.addHandler(stringifiedMap);
          setState(() {});
        }
      }
    });
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
            Row(
              children: <Widget>[
                Container(
                    width: MediaQuery.of(context).size.width - 20,
                    child: FilledButton(
                        onPressed: () async {
                          if (widget.cart.isNotEmpty) {
                            List<Map<String, String>> hashes =
                                await getHashes();
                            Map<String, dynamic> store = {
                              "cart_id": "dh8327hd2",
                              "createdOn": "12-12-2024",
                              "totalCost": "10002",
                              "items":
                                  List<Map<String, String>>.from(widget.cart),
                              "hashes": hashes
                            };
                            widget.historyHandler(store);
                            widget.truncateHandler();
                            widget.cart = [];

                            Navigator.of(context).push(MaterialPageRoute(
                                builder: (BuildContext context) =>
                                    PaymentConfirmationPage(
                                      qrData: hashes,
                                    )));
                          }
                        },
                        child: Text("Checkout")))
              ],
            )
          ],
        )));
  }
}
