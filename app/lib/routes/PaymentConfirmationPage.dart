import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';

class PaymentConfirmationPage extends StatelessWidget {
  List<Map<String, String>> qrData;
  PaymentConfirmationPage({super.key, required this.qrData});
  @override
  Widget build(BuildContext context) {
    print(qrData);
    return Scaffold(
        body: Container(
      decoration: BoxDecoration(color: const Color.fromARGB(255, 0, 0, 0)),
      child: Center(
        child: Column(
          children: <Widget>[
            Container(
                margin: EdgeInsets.only(top: 100),
                child: const Icon(
                  Icons.check_circle,
                  color: Color.fromARGB(255, 18, 255, 132),
                  size: 140,
                )),
            Container(
              margin: EdgeInsets.only(top: 20),
              child: Text(
                "Payment Successful",
                style: TextStyle(
                    color: Color.fromARGB(255, 18, 255, 132),
                    fontWeight: FontWeight.bold,
                    fontSize: 24),
              ),
            ),
            Container(
                margin: EdgeInsets.only(top: 80),
                width: MediaQuery.of(context).size.width - 100,
                child: QrImageView(
                  data: qrData.toString(),
                  foregroundColor: Colors.white,
                  dataModuleStyle: QrDataModuleStyle(
                      dataModuleShape: QrDataModuleShape.square),
                  eyeStyle: QrEyeStyle(eyeShape: QrEyeShape.square),
                  version: QrVersions.auto,
                  embeddedImageStyle: QrEmbeddedImageStyle(
                      color: const Color.fromARGB(255, 255, 255, 255)),
                ))
          ],
        ),
      ),
    ));
  }
}
