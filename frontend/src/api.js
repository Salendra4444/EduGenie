const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export function apiUrl(path) {
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
