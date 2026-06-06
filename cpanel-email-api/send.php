<?php
/**
 * Systematics Education — Email Sending API
 * This file sends emails using the local cPanel mail server.
 * Protected by a secret API key.
 * 
 * Upload to: /public_html/email-api/send.php
 */

// ── Configuration ──────────────────────────────────
$API_SECRET = 'se-mail-key-8x7k2m9p4w'; // Must match your Vercel env var
$FROM_NAME  = 'Systematics Education';
$FROM_EMAIL = 'info@systematics.com.pk';

// ── CORS Headers (allow Vercel to call this) ───────
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── Only POST allowed ──────────────────────────────
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
$subject = strip_tags($input['subject']);
$html    = $input['html'];

if (!$to) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

// ── Send Email ─────────────────────────────────────
$headers_mail  = "MIME-Version: 1.0\r\n";
$headers_mail .= "Content-type: text/html; charset=UTF-8\r\n";
$headers_mail .= "From: {$FROM_NAME} <{$FROM_EMAIL}>\r\n";
$headers_mail .= "Reply-To: {$FROM_EMAIL}\r\n";
$headers_mail .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $html, $headers_mail);

if ($sent) {
    echo json_encode(['success' => true, 'message' => "Email sent to {$to}"]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
