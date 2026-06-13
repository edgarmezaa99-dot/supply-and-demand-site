const express = require('express');
const path = require('path');
const app = express();

const SHOPIFY_STORE = process.env.SHOPIFY_STORE || 'supplyanddemandllc.myshopify.com';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || '0ce56e4b1883963dad4a6ec024439312';
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── SHOPIFY TOKEN ─────────────────────────────────────────────────
let cachedToken = null;
let tokenExpiry = 0;

async function getShopifyToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;
  const res = await fetch(`https://${SHOPIFY_STORE}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'client_credentials' })
  });
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
  return cachedToken;
}

// ── CHECKOUT API ──────────────────────────────────────────────────
// Build a Shopify cart permalink from variant IDs
// items: [{ variantId, quantity }]
app.post('/api/checkout', (req, res) => {
  const { items } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: 'No items provided' });
  const cartPath = items.map(i => `${i.variantId}:${i.quantity || 1}`).join(',');
  const url = `https://${SHOPIFY_STORE}/cart/${cartPath}`;
  res.json({ url });
});

// ── QUOTE SUBMISSION ──────────────────────────────────────────────
app.post('/api/quote', async (req, res) => {
  const { name, email, phone, product, width, height, finish, notes } = req.body;
  console.log('[Quote]', { name, email, phone, product, width, height, finish, notes });
  // TODO: forward to Telegram / email
  res.json({ ok: true });
});

// ── PAGES ─────────────────────────────────────────────────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/product', (req, res) => res.sendFile(path.join(__dirname, 'product.html')));
app.get('/category', (req, res) => res.sendFile(path.join(__dirname, 'category.html')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Supply & Demand site running: http://localhost:${PORT}`));
