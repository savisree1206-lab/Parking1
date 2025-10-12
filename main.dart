 //import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:service/Book.dart';
import 'package:service/firebase_options.dart';
//import 'package:service/service.dart';
//import 'package:service/book.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const ServiceApp());
}
class ServiceApp extends StatelessWidget {
  const ServiceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: StreamBuilder(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.data != null) {
            return const Book();
          }
          return const service();
        },
      ),
      //debugShowCheckedModeBanner: false,
      
      //const service(),
    );
  }
}
class service extends StatefulWidget {
  const service({super.key});

  @override
  State<service> createState() => serviceState();
}

class serviceState extends State<service> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: Text("BOOK YOUR SERVICE", style: TextStyle(fontSize: 20, color: Colors.white)),
          backgroundColor: const Color.fromARGB(255, 3, 25, 83),
          centerTitle: true,
        ),
        backgroundColor: const Color.fromARGB(255, 11, 94, 162),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Three images side by side
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.network(
                    'https://plus.unsplash.com/premium_photo-1683141410787-c4dbd2220487?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D',
                    height: 250,
                    width: 420,
                  ),
                  SizedBox(width: 10),
                  Image.network(
                    'https://media.istockphoto.com/id/1345962789/photo/electrician-engineer-uses-a-multimeter-to-test-the-electrical-installation-and-power-line.jpg?s=612x612&w=0&k=20&c=JZg0nF2yW9Kc-XCNNzYWXKQ8zRUsfO7t0WAZIiS3cbk=',
                    height: 250,
                    width: 420,
                  ),
                  SizedBox(width: 10),
                  Image.network(
                    'https://t4.ftcdn.net/jpg/04/40/51/95/360_F_440519588_f6mFYPkrD1IgRAOuTrmViRP953iQQ4HH.jpg',
                    height: 250,
                    width: 420,
                  ),
                ],
              ),
              
              SizedBox(height: 30),
              
              // Book Now Button
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => Book()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                ),
                child: Text("Book Now", style: TextStyle(fontSize: 18)),
              )
            ],
          ),
        ),
      ),
    );
  }
}

// class Book extends StatefulWidget {
//   const Book({super.key});

//   @override
//   State<Book> createState() => _BookState();
// }

// class _BookState extends State<Book> {
//   final formkey = GlobalKey<FormState>();
//   final nameController = TextEditingController();
//   final dateController = TextEditingController();
//   final servicecontroller=TextEditingController();
//   final descriptioncontroller=TextEditingController();
//   // Function to display the date picker
//   Future<void> _selectDate(BuildContext context) async {
//     final DateTime? picked = await showDatePicker(
//       context: context,
//       initialDate: DateTime.now(),
//       firstDate: DateTime(2000),
//       lastDate: DateTime(2100),
//     );
//     if (picked != null) {
//       setState(() {
//         dateController.text = "${picked.day}/${picked.month}/${picked.year}";
//       });
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Color.fromARGB(255, 133, 156, 185),
//       appBar: AppBar(
//         title: Text("BOOK NOW!!", style: TextStyle(fontSize: 20, color: Colors.white)),
//         backgroundColor: const Color.fromARGB(255, 3, 49, 88),
//         centerTitle: true,
//       ),
//       body: SingleChildScrollView(
//         child: Form(
//           key: formkey,
//           child: Column(
//             children: <Widget>[
//               SizedBox(height: 20),
//               // Name field
//               TextFormField(
//                 controller: nameController,
//                 validator: (value) {
//                   if (value == null || value.isEmpty) {
//                     return "Enter your name";
//                   }
//                   return null;
//                 },
//                 decoration: InputDecoration(
//                   filled: true,
//                   fillColor: Colors.white,
//                   label: Text("NAME", style: TextStyle(fontSize: 20, color: Colors.black)),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
//                 ),
//               ),
//               SizedBox(height: 20),
//               // Date field
//               TextFormField(
//                 controller: dateController,
//                 decoration: InputDecoration(
//                   filled: true,
//                   fillColor: Colors.white,
//                   label: Text("DATE", style: TextStyle(fontSize: 20, color: Colors.black)),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
//                   suffixIcon: Icon(Icons.calendar_today),
//                 ),
//                 readOnly: true,
//                 onTap: () {
//                   _selectDate(context); // Show the date picker
//                 },
//                 validator: (value) {
//                   if (value == null || value.isEmpty) {
//                     return "Please select a date";
//                   }
//                   return null;
//                 },
//               ),
//               SizedBox(height: 30),
//               TextFormField(
//                 controller: servicecontroller,
//                 validator: (value) {
//                   if (value == null || value.isEmpty) {
//                     return "Enter type of service you need";
//                   }
//                   return null;
//                 },
//                 decoration: InputDecoration(
//                   filled: true,
//                   fillColor: Colors.white,
//                   label: Text("Enter Type Of Service You Need",style: TextStyle(fontSize: 20,color: Colors.black),),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.circular(60)),
//                 ),
//               ),
//               SizedBox(height: 30),
//               TextFormField(
//                 controller: descriptioncontroller,
//                 validator: (value) {
//                   if (value == null || value.isEmpty) {
//                     return "Enter description";
//                   }
//                   return null;
//                 },
//                 decoration: InputDecoration(
//                   filled: true,
//                   fillColor: Colors.white,
//                   label: Text("Description: ",style: TextStyle(fontSize: 20,color: Colors.black),),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.circular(60)),
//                 ),
//                 maxLines: 5, // Increase from the default value (usually 1)
//                 minLines: 3
//               ),
//               SizedBox(height: 30,),
//               // Submit button
//               ElevatedButton(
//                 onPressed: () {
//                   if (formkey.currentState!.validate()) {
//                     ScaffoldMessenger.of(context).showSnackBar(
//                       SnackBar(content: Text("Form submitted successfully")),
//                     );
//                   }
//                 },
//                 child: Text("GET SERVICE"),
//               ),
//               ElevatedButton(
//                 onPressed: () {
//                   Navigator.push(
//                     context,
//                     MaterialPageRoute(builder: (context) => list()),
//                   );
//                 },
//                 child: Text("VIEW BOOKED SERVICE"),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
// class list extends StatefulWidget {
//   const list({super.key});

//   @override
//   State<list> createState() => _listState();
// }

// class _listState extends State<list> {
//   @override
//   Widget build(BuildContext context) {
//     FirebaseFirestore.instance.collection("service").get();
//     return MaterialApp(
//       home: Scaffold(
//         appBar: AppBar(
//           title: Text("BOOKED SERVICES",style: TextStyle(fontSize: 20,color: Colors.white),),
//           backgroundColor: const Color.fromARGB(255, 3, 25, 83),
//           centerTitle: true,
//           ),
//           backgroundColor: const Color.fromARGB(255, 144, 185, 217),
//           body: Center(
//             child: Column(
//               children: [
//                 //StreamBuilder(stream: stream, builder: builder)
//                  StreamBuilder(
//               // future: FirebaseFirestore.instance.collection("product").get(), when we want we can click
//               stream: FirebaseFirestore.instance
//                   .collection("SERVICE")
//                   // .where("ProductID", isEqualTo: "03")
//                   .snapshots(),
//               builder: (context, snapshot) {
//                 if (snapshot.connectionState == ConnectionState.waiting) {
//                   return const Center(child: CircularProgressIndicator());
//                 }
//                 if (!snapshot.hasData) {
//                   return const Text("No Data Found");
//                 }
//                 return Expanded(
//                   child: ListView.builder(
//                     itemCount: snapshot.data?.docs.length,
//                     itemBuilder: (context, index) {
//                       return Dismissible(//it says the action when drag start to end or end to start 
//                         key: ValueKey(index),
//                         onDismissed: (direction) async {
//                           if (direction == DismissDirection.startToEnd) {
//                             await FirebaseFirestore.instance
//                                 .collection("SERVICE")
//                                 .doc(snapshot.data!.docs[index].id)
//                                  //.delete()
//                                 .update({
//                                   "DATE": "20-9-25",
//                                   "SERVICE": "MEDICAL SERVICE",
//                                 });
//                           }
//                         },
//                         child: Row(
//                           children: [
//                             SizedBox(height: 10, width: 30),
//                             Text(
//                               snapshot.data?.docs[index].data()['DATE'],
//                             ),
//                             SizedBox(width: 30),
//                             Text(
//                               snapshot.data?.docs[index].data()['SERVICE'],
//                             ),
//                           ],
//                         ),
//                       );
//                     },
//                   ),
//                 );
//               },
//             ),
//               ],
//             ),
//           ),
//       ),
//     );
//   }
// }