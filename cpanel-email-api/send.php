<?php
/**
 * Systematics Education — Email Sending API (SMTP version)
 * Uses direct SMTP connection instead of PHP mail()
 * Upload to: /public_html/email-api/send.php
 */

// ── Configuration ──────────────────────────────────
$API_SECRET  = 'se-mail-key-8x7k2m9p4w';
$SMTP_HOST   = 'mail.systematics.com.pk';
$SMTP_PORT   = 587;
$SMTP_USER   = 'madiha@systematics.com.pk';
$SMTP_PASS   = 'Lahore@786@000';
$FROM_NAME   = 'Systematics Education';
$FROM_EMAIL  = 'madiha@systematics.com.pk';

// ── CORS Headers ───────────────────────────────────
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// ── Verify API Key ─────────────────────────────────
$headers = getallheaders();
$apiKey = $headers['X-API-Key'] ?? $headers['x-api-key'] ?? '';

if ($apiKey !== $API_SECRET) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

// ── Parse request body ─────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['to']) || empty($input['subject']) || empty($input['html'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields: to, subject, html']);
    exit;
}

$to      = filter_var($input['to'], FILTER_VALIDATE_EMAIL);
$subject = $input['subject'];
$html    = $input['html'];

if (!$to) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

// ── Send Email via SMTP ────────────────────────────
function sendSMTP($host, $port, $user, $pass, $fromName, $fromEmail, $to, $subject, $htmlBody) {
    $errno = 0;
    $errstr = '';
    
    // Connect to SMTP server
    $socket = fsockopen($host, $port, $errno, $errstr, 10);
    if (!$socket) {
        return "Connection failed: $errstr ($errno)";
    }
    
    stream_set_timeout($socket, 10);
    $response = fgets($socket, 512);
    
    // EHLO
    fputs($socket, "EHLO systematics.com.pk\r\n");
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response .= $line;
        if (substr($line, 3, 1) == ' ') break;
    }
    
    // STARTTLS
    fputs($socket, "STARTTLS\r\n");
    $response = fgets($socket, 512);
    
    // Enable TLS
    if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        fclose($socket);
        return "TLS handshake failed";
    }
    
    // EHLO again after STARTTLS
    fputs($socket, "EHLO systematics.com.pk\r\n");
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response .= $line;
        if (substr($line, 3, 1) == ' ') break;
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    
    fputs($socket, base64_encode($user) . "\r\n");
    $response = fgets($socket, 512);
    
    fputs($socket, base64_encode($pass) . "\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '235') {
        fclose($socket);
        return "Authentication failed: $response";
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM:<$fromEmail>\r\n");
    $response = fgets($socket, 512);
    
    // RCPT TO
    fputs($socket, "RCPT TO:<$to>\r\n");
    $response = fgets($socket, 512);
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    
    // Build message
    $boundary = md5(time());
    $message  = "From: $fromName <$fromEmail>\r\n";
    $message .= "To: $to\r\n";
    $message .= "Subject: $subject\r\n";
    $message .= "MIME-Version: 1.0\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "X-Mailer: Systematics-Education-Mailer\r\n";
    $message .= "\r\n";
    $message .= $htmlBody . "\r\n";
    $message .= ".\r\n";
    
    fputs($socket, $message);
    $response = fgets($socket, 512);
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    if (substr($response, 0, 3) === '250') {
        return true;
    }
    
    return "Send failed: $response";
}

$result = sendSMTP($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS, $FROM_NAME, $FROM_EMAIL, $to, $subject, $html);

if ($result === true) {
    echo json_encode(['success' => true, 'message' => "Email sent to $to"]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $result]);
}
