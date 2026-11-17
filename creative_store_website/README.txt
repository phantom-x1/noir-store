NOIR & CO. STORE WEBSITE — UPDATED PAYMENT UPLOAD + EMAIL BACKEND

WHAT'S NEW
- Selecting Gift card reveals a gift-card image/PDF upload.
- Selecting Crypto reveals your USDT wallet address and a copy button, plus payment-proof upload.
- Uploads are required for the selected payment method.
- Placing an order sends customer details, delivery address, cart, total and uploaded payment file as an email attachment to your store email.

IMPORTANT: THE WEBSITE NOW NEEDS ITS NODE BACKEND TO SEND EMAILS.
Opening index.html directly is not enough. Run it through the Node server:

1. Install Node.js on your computer (if it is not installed).
2. Open this project folder in VS Code.
3. Open Terminal → New Terminal.
4. Run: npm install
5. Copy .env.example to a new file named .env.
6. Edit .env with your receiving email and SMTP details from your email provider.
   - STORE_EMAIL is where customer orders should arrive.
   - SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS are the sending email account's SMTP settings.
   - Use an email app password where your provider requires it, not your normal account password.
7. In script.js, edit STORE_CONFIG:
   - giftCardEmail (displayed to customers for gift-card instructions)
   - usdtAddress
   - usdtNetwork
   - product names, image paths, gram sizes and prices
8. Run: npm start
9. Open: http://localhost:3000

PRODUCT IMAGES
Add images into the images folder:
- hero.jpg
- product-1.jpg
- product-2.jpg
- product-3.jpg
Update product image paths in script.js when adding more products.

PAYMENT UPLOADS
- Gift card selection shows a gift card file upload.
- USDT selection shows the configured wallet address and a payment-proof upload.
- Accepted files: JPG, PNG, WEBP and PDF, up to 5MB.
- Uploaded file is attached to the order email.
- The backend does not verify gift cards or blockchain transactions. Check payments yourself before fulfilling orders.

SECURITY / PRODUCTION
- Do not publish .env or expose SMTP credentials.
- Use HTTPS when hosting the store.
- Use a proper production hosting provider that supports Node.js and environment variables.
- Add spam/rate limiting, order persistence and stronger server-side validation before taking public orders.
- Do not ask buyers for gift-card redemption passwords/PINs or wallet seed phrases/private keys.
- Confirm the exact USDT network and wallet address before publishing.
