<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (adjust as needed)
header("Access-Control-Allow-Methods: POST"); // Allow only POST requests

$servername = "localhost";
$username = "root"; // Update with your database username
$password = ""; // Update with your database password
$dbname = "doctor_appointments"; // Update with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Log the request method for debugging
error_log("Request method: " . $_SERVER["REQUEST_METHOD"]);

// Handle API requests
$request_method = $_SERVER["REQUEST_METHOD"];
switch ($request_method) {
    case 'POST':
        if (strpos($_SERVER['REQUEST_URI'], '/signup') !== false) {
            signup($conn);
        } elseif (strpos($_SERVER['REQUEST_URI'], '/login') !== false) {
            login($conn);
        } else {
            echo json_encode(["error" => "Invalid endpoint"]);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        break;
}

// Function to handle user signup
function signup($conn) {
    $username = $_POST['username'] ?? null;
    $password = $_POST['password'] ?? null;
    $email = $_POST['email'] ?? null;

    // Check if all required fields are provided
    if (is_null($username) || is_null($password) || is_null($email)) {
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and execute the statement
    $stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $hashed_password, $email);
    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }
    $stmt->close();
}

// Function to handle user login
function login($conn) {
    $username = $_POST['username'] ?? null;
    $password = $_POST['password'] ?? null;

    // Check if all required fields are provided
    if (is_null($username) || is_null($password)) {
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    // Prepare and execute the statement
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    // Check if the user exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            echo json_encode(["message" => "Login successful"]);
        } else {
            echo json_encode(["error" => "Invalid password"]);
        }
    } else {
        echo json_encode(["error" => "User not found"]);
    }
    $stmt->close();
}

$conn->close();
?>
