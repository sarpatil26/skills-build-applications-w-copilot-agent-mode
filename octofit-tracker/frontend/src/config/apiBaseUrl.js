const hostname = window.location.hostname;

export const apiBaseUrl = hostname.includes("github.dev")
  ? window.location.origin.replace("-5173", "-8000")
  : "http://localhost:8000";