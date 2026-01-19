export function generateReceiptCode() {
  return "RCPT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}
