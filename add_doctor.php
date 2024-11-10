<?php
header("Content-Type: application/json");

// Database credentials
$servername = "localhost";
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "doctor_appointments"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Check request method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if required POST fields are present
    if (isset($_POST['name']) && isset($_POST['specialty']) && isset($_POST['availability'])) {
        $name = $_POST['name'];
        $specialty = $_POST['specialty'];
        $availability = $_POST['availability'];

        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO doctors (name, specialty, availability) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $specialty, $availability);

        // Execute statement
        if ($stmt->execute()) {
            echo json_encode(["message" => "Doctor added successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }

        // Close statement
        $stmt->close();
    } else {
        echo json_encode(["error" => "Missing required fields"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Provide a simple response for direct browser access
    echo json_encode(["message" => "Direct access for testing purposes. Use POST method to add doctor."]);
} else {
    // Handle other request methods
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method"]);
}

// Close connection
$conn->close();
?>
