import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:service/list.dart';
import 'package:flutter/material.dart';

class Book extends StatefulWidget {
  const Book({super.key});

  @override
  State<Book> createState() => _BookState();
}

class _BookState extends State<Book> {
  final formkey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final dateController = TextEditingController();
  final serviceController = TextEditingController();  // Fixed variable name
  final descriptionController = TextEditingController();  // Fixed variable name
  
  // Function to display the date picker
  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (picked != null) {
      setState(() {
        dateController.text = "${picked.day}/${picked.month}/${picked.year}";
      });
    }
  }

  // Submit form function
  Future<void> _submitForm() async {
    if (formkey.currentState!.validate()) {
      try {
        // Add the form data to Firestore
        await FirebaseFirestore.instance.collection("SERVICE").add({
          "NAME": nameController.text.trim(),
          "DATE": dateController.text.trim(),
          "SERVICE": serviceController.text.trim(),
          "DESCRIPTION": descriptionController.text.trim(),
          "TIMESTAMP": FieldValue.serverTimestamp(),
        });
        
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Service booked successfully!")),
        );
        
        // Clear the form after successful submission
        nameController.clear();
        dateController.clear();
        serviceController.clear();
        descriptionController.clear();
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Error booking service: $e")),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 133, 156, 185),
      appBar: AppBar(
        title: const Text(
          "BOOK NOW!!", 
          style: TextStyle(fontSize: 20, color: Colors.white)
        ),
        backgroundColor: const Color.fromARGB(255, 3, 49, 88),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: formkey,
          child: Column(
            children: <Widget>[
              const SizedBox(height: 20),
              // Name field
              TextFormField(
                controller: nameController,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return "Enter your name";
                  }
                  return null;
                },
                decoration: InputDecoration(
                  filled: true,
                  fillColor: Colors.white,
                  label: const Text(
                    "NAME", 
                    style: TextStyle(fontSize: 20, color: Colors.black)
                  ),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),
              const SizedBox(height: 20),
              // Date field
              TextFormField(
                controller: dateController,
                decoration: InputDecoration(
                  filled: true,
                  fillColor: Colors.white,
                  label: const Text(
                    "DATE", 
                    style: TextStyle(fontSize: 20, color: Colors.black)
                  ),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                  suffixIcon: const Icon(Icons.calendar_today),
                ),
                readOnly: true,
                onTap: () {
                  _selectDate(context);
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return "Please select a date";
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: serviceController,  // Fixed variable name
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return "Enter type of service you need";
                  }
                  return null;
                },
                decoration: InputDecoration(
                  filled: true,
                  fillColor: Colors.white,
                  label: const Text(
                    "Enter Type Of Service You Need",
                    style: TextStyle(fontSize: 20, color: Colors.black),
                  ),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: descriptionController,  // Fixed variable name
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return "Enter description";
                  }
                  return null;
                },
                decoration: InputDecoration(
                  filled: true,
                  fillColor: Colors.white,
                  label: const Text(
                    "Description: ",
                    style: TextStyle(fontSize: 20, color: Colors.black),
                  ),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
                maxLines: 5,
                minLines: 3,
              ),
              const SizedBox(height: 30),
              // Submit button
              ElevatedButton(
                onPressed: _submitForm,  // Call the submit function
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                ),
                child: const Text("GET SERVICE"),
              ),
              const SizedBox(height: 10),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const list()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                ),
                child: const Text("VIEW BOOKED SERVICE"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}