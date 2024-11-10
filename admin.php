<?php
header("Content-Type: application/json");

// Enable CORS for cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection details
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "doctor_appointments"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Handle API requests
$request_method = $_SERVER["REQUEST_METHOD"];
if ($request_method == 'POST') {
    // Read JSON input
    $input = json_decode(file_get_contents("php://input"), true);
    $type = isset($input['type']) ? $input['type'] : '';

    if ($type == 'signup') {
        signupAdmin($conn, $input);
    } elseif ($type == 'login') {
        loginAdmin($conn, $input);
    } else {
        echo json_encode(["error" => "Invalid request type"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

// Function to handle admin signup
function signupAdmin($conn, $input) {
    if (empty($input['username']) || empty($input['password']) || empty($input['email'])) {
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    $username = $input['username'];
    $password = password_hash($input['password'], PASSWORD_DEFAULT);
    $email = $input['email'];

    $stmt = $conn->prepare("INSERT INTO admins (username, password, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $password, $email);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Admin registered successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }
    $stmt->close();
}

// Function to handle admin login
function loginAdmin($conn, $input) {
    if (empty($input['username']) || empty($input['password'])) {
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    $username = $input['username'];
    $password = $input['password'];

    $stmt = $conn->prepare("SELECT id, password FROM admins WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $admin = $result->fetch_assoc();
        if (password_verify($password, $admin['password'])) {
            echo json_encode(["message" => "Login successful"]);
        } else {
            error_log("Invalid password attempt for username: $username"); // Log for debugging
            echo json_encode(["error" => "Invalid username or password"]);
        }
    } else {
        error_log("Invalid username: $username"); // Log for debugging
        echo json_encode(["error" => "Invalid username or password"]);
    }
    $stmt->close();
}

$conn->close();
?>
