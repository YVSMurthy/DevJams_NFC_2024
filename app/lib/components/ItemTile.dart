import 'package:flutter/material.dart';

class ItemTile extends StatefulWidget {
  final Map<String, String> info;
  ItemTile({super.key, required this.info});

  State<ItemTile> createState() => _ItemTileState();
}

class _ItemTileState extends State<ItemTile> {
  @override
  Widget build(BuildContext build) {
    return Container(
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
                    widget.info['product_name'] ?? "Title",
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
                    "Date-of-Manafacture: ${widget.info['title']}" ??
                        "Date-of-Manafacture: 00-00-0000",
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
                    "Rs.${widget.info['price']}" ?? "price",
                    style: TextStyle(color: Color.fromARGB(255, 152, 152, 152)),
                  ))
            ],
          ),
        ]));
  }
}
