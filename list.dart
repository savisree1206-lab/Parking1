import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class list extends StatefulWidget {
  const list({super.key});

  @override
  State<list> createState() => _listState();
}

class _listState extends State<list> {
  // Controllers for edit dialog
  final TextEditingController _editNameController = TextEditingController();
  final TextEditingController _editDateController = TextEditingController();
  final TextEditingController _editServiceController = TextEditingController();
  final TextEditingController _editDescriptionController = TextEditingController();

  // Function to show edit dialog
  void _showEditDialog(DocumentSnapshot doc) {
    var data = doc.data() as Map<String, dynamic>;
    
    // Pre-fill the controllers with current data
    _editNameController.text = data['NAME'] ?? '';
    _editDateController.text = data['DATE'] ?? '';
    _editServiceController.text = data['SERVICE'] ?? '';
    _editDescriptionController.text = data['DESCRIPTION'] ?? '';

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Edit Service'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: _editNameController,
                  decoration: const InputDecoration(
                    labelText: 'Name',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _editDateController,
                  decoration: const InputDecoration(
                    labelText: 'Date',
                    border: OutlineInputBorder(),
                    suffixIcon: Icon(Icons.calendar_today),
                  ),
                  readOnly: true,
                  onTap: () => _selectEditDate(context),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _editServiceController,
                  decoration: const InputDecoration(
                    labelText: 'Service Type',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _editDescriptionController,
                  decoration: const InputDecoration(
                    labelText: 'Description',
                    border: OutlineInputBorder(),
                  ),
                  maxLines: 3,
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () => _updateService(doc.id),
              child: const Text('Update'),
            ),
          ],
        );
      },
    );
  }

  // Function to select date for edit dialog
  Future<void> _selectEditDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (picked != null) {
      setState(() {
        _editDateController.text = "${picked.day}/${picked.month}/${picked.year}";
      });
    }
  }

  // Function to update service in Firestore
  Future<void> _updateService(String docId) async {
    try {
      await FirebaseFirestore.instance.collection("SERVICE").doc(docId).update({
        "NAME": _editNameController.text.trim(),
        "DATE": _editDateController.text.trim(),
        "SERVICE": _editServiceController.text.trim(),
        "DESCRIPTION": _editDescriptionController.text.trim(),
        "UPDATED_TIMESTAMP": FieldValue.serverTimestamp(),
      });

      Navigator.of(context).pop(); // Close dialog
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Service updated successfully!")),
      );

      // Clear controllers
      _editNameController.clear();
      _editDateController.clear();
      _editServiceController.clear();
      _editDescriptionController.clear();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error updating service: $e")),
      );
    }
  }

  // Function to delete service
  Future<void> _deleteService(String docId, String serviceName) async {
    // Show confirmation dialog
    bool? confirmDelete = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Delete Service'),
          content: Text('Are you sure you want to delete the service "$serviceName"?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.of(context).pop(true),
              style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
              child: const Text('Delete', style: TextStyle(color: Colors.white)),
            ),
          ],
        );
      },
    );

    if (confirmDelete == true) {
      try {
        await FirebaseFirestore.instance.collection("SERVICE").doc(docId).delete();
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Service deleted successfully!")),
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Error deleting service: $e")),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "BOOKED SERVICES",
          style: TextStyle(fontSize: 20, color: Colors.white),
        ),
        backgroundColor: const Color.fromARGB(255, 3, 25, 83),
        centerTitle: true,
      ),
      backgroundColor: const Color.fromARGB(255, 144, 185, 217),
      body: StreamBuilder<QuerySnapshot>(
        stream: FirebaseFirestore.instance
            .collection("SERVICE")
            .orderBy("TIMESTAMP", descending: true) // Order by timestamp
            .snapshots(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          
          if (snapshot.hasError) {
            return Center(child: Text("Error: ${snapshot.error}"));
          }
          
          if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.inbox, size: 80, color: Colors.grey),
                  Text(
                    "No services booked yet",
                    style: TextStyle(fontSize: 18, color: Colors.grey),
                  ),
                ],
              ),
            );
          }
          
          return ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: snapshot.data?.docs.length,
            itemBuilder: (context, index) {
              var doc = snapshot.data!.docs[index];
              var docData = doc.data() as Map<String, dynamic>;
              
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 5),
                elevation: 3,
                child: Container(
                  padding: const EdgeInsets.all(15),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Header with name and action buttons
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              docData['NAME'] ?? 'No Name',
                              style: const TextStyle(
                                fontSize: 18, 
                                fontWeight: FontWeight.bold,
                                color: Color.fromARGB(255, 3, 25, 83),
                              ),
                            ),
                          ),
                          Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              // Edit Button
                              IconButton(
                                onPressed: () => _showEditDialog(doc),
                                icon: const Icon(Icons.edit, color: Colors.blue),
                                tooltip: 'Edit Service',
                              ),
                              // Delete Button
                              IconButton(
                                onPressed: () => _deleteService(
                                  doc.id, 
                                  docData['SERVICE']?.toString() ?? 'Unknown Service'
                                ),
                                icon: const Icon(Icons.delete, color: Colors.red),
                                tooltip: 'Delete Service',
                              ),
                            ],
                          ),
                        ],
                      ),
                      const Divider(),
                      // Service details
                      const SizedBox(height: 5),
                      Row(
                        children: [
                          const Icon(Icons.calendar_today, size: 16, color: Colors.grey),
                          const SizedBox(width: 8),
                          Text(
                            "Date: ${docData['DATE']?.toString() ?? 'No Date'}",
                            style: const TextStyle(fontSize: 14),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          const Icon(Icons.build, size: 16, color: Colors.grey),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              "Service: ${docData['SERVICE']?.toString() ?? 'No Service'}",
                              style: const TextStyle(fontSize: 14),
                            ),
                          ),
                        ],
                      ),
                      // Description if available
                      if (docData['DESCRIPTION'] != null && 
                          docData['DESCRIPTION'].toString().isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(top: 8),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Icon(Icons.description, size: 16, color: Colors.grey),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  "Description: ${docData['DESCRIPTION']}",
                                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                                ),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }

  @override
  void dispose() {
    // Dispose controllers to prevent memory leaks
    _editNameController.dispose();
    _editDateController.dispose();
    _editServiceController.dispose();
    _editDescriptionController.dispose();
    super.dispose();
  }
}