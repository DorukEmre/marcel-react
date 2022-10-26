const allowedOrigins = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://127.0.0.1:4173',
  'http://localhost:4173',
  'http://localhost:9191',
  // Render
  'http://18.156.158.53',
  'http://18.156.42.200',
  'http://52.59.103.54',
  'https://18.156.158.53',
  'https://18.156.42.200',
  'https://52.59.103.54',
  'https://marcel-react.onrender.com',
  // Cyclic
  'https://long-blue-sawfish-cuff.cyclic.app',
  // railway.app
  'https://marcel-the-outdoor-cat.up.railway.app/',
]

module.exports = allowedOrigins
