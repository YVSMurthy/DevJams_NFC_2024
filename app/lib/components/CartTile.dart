import 'package:app/routes/ViewCartHistory.dart';
import 'package:flutter/material.dart';

class CartTile extends StatefulWidget {
  final Map<String, String> info;
  final List<Map<String, String>> items;
  CartTile({super.key, required this.info, required this.items});

  State<CartTile> createState() => _CartTileState();
}

class _CartTileState extends State<CartTile> {
  @override
  Widget build(BuildContext build) {
    return GestureDetector(
        onTap: () {
          Navigator.of(context).push(MaterialPageRoute(
              builder: (BuildContext context) =>
                  ViewCartHistory(cart: widget.items, cartInfo: widget.info)));
        },
        child: Container(
            margin: EdgeInsets.fromLTRB(10, 5, 10, 5),
            height: 80,
            width: MediaQuery.sizeOf(context).width - 20,
            decoration: BoxDecoration(
                color: Color.fromARGB(40, 188, 43, 255),
                border: Border.all(
                    width: 2.0, color: Color.fromARGB(255, 188, 43, 255)),
                borderRadius: BorderRadius.circular(8)),
            child: Column(children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                      margin: EdgeInsets.only(left: 20, top: 2),
                      child: Text(
                        widget.info['cart_id'] ?? "CART_ID",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ))
                ],
              ),
              Row(
                children: <Widget>[
                  Container(
                      margin: EdgeInsets.only(left: 20),
                      child: Text(
                        "Date-of-Purchase: ${widget.info['createdOn']}" ??
                            "Date-of-Purchase: 00-00-0000",
                        style: TextStyle(
                            color: const Color.fromARGB(255, 152, 152, 152)),
                      ))
                ],
              ),
              Row(
                children: <Widget>[
                  Container(
                      margin: EdgeInsets.only(left: 20),
                      child: Text(
                        "Total Cost: Rs.${widget.info['totalCost']}" ?? "price",
                        style: TextStyle(
                            color: Color.fromARGB(255, 152, 152, 152)),
                      ))
                ],
              ),
            ])));
  }
}
