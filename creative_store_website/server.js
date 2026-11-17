
require("dotenv").config({
  path: require("path").join(__dirname, ".env")
});

const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const DELIVERY_FEE = 3;

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf"
];

// FILE UPLOAD CONFIGURATION
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, WEBP and PDF files are accepted."));
    }
  }
});

// GMAIL SMTP CONFIGURATION
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// VERIFY EMAIL CONNECTION
transporter.verify((error) => {
  if (error) {
    console.error("SMTP CONNECTION FAILED:", error.message);
  } else {
    console.log("SMTP CONNECTION SUCCESSFUL!");
  }
});

// SERVE WEBSITE
app.use(express.static(__dirname));

// PLACE ORDER
app.post(
  "/api/orders",
  upload.single("paymentFile"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please attach your gift card or payment proof."
        });
      }

      let order;

      try {
        order = JSON.parse(req.body.order || "{}");
      } catch {
        return res.status(400).json({
          message: "Invalid order information."
        });
      }

      // REQUIRED FIELDS
      const required = [
        "customerName",
        "phone",
        "address",
        "payment"
      ];

      if (
        required.some(key =>
          !String(order[key] || "").trim()
        )
      ) {
        return res.status(400).json({
          message: "Please complete your name, phone, address and payment method."
        });
      }

      // VALIDATE PAYMENT
      if (!["giftcard", "crypto"].includes(order.payment)) {
        return res.status(400).json({
          message: "Please choose a valid payment method."
        });
      }

      // VALIDATE ITEMS
      if (!Array.isArray(order.items) || !order.items.length) {
        return res.status(400).json({
          message: "Your order must contain at least one item."
        });
      }

      // VALIDATE AND CALCULATE SUBTOTAL
      const subtotal = order.items.reduce((sum, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        const amount = Number(item.amount);

        if (
          !Number.isFinite(price) ||
          price < 0 ||
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          quantity > 99 ||
          !Number.isFinite(amount) ||
          amount <= 0 ||
          typeof item.name !== "string" ||
          !item.name.trim() ||
          !["g", "ml"].includes(item.unit)
        ) {
          throw new Error("Invalid product pricing, size or quantity.");
        }

        return sum + price * quantity;
      }, 0);

      // DELIVERY FEE
      const deliveryFee = DELIVERY_FEE;
      const finalTotal = subtotal + deliveryFee;

      // SAFE ATTACHMENT NAME
      const safeName = path.basename(req.file.originalname)
        .replace(/[^a-zA-Z0-9._-]/g, "_");

      // ORDER ITEMS
      const itemLines = order.items.map(item =>
        `${item.name} — ${Number(item.amount)}${item.unit} × ${Number(item.quantity)} — $${(
          Number(item.price) * Number(item.quantity)
        ).toFixed(2)}`
      ).join("\n");

      const paymentLabel =
        order.payment === "giftcard"
          ? "Gift card upload"
          : "USDT payment proof";

      // EMAIL CONTENT
      const body = [
        "NEW WEBSITE ORDER",
        "",
        `Customer: ${order.customerName}`,
        `Phone: ${order.phone}`,
        `Email: ${order.email || "Not provided"}`,
        `Delivery address: ${order.address}`,
        `Delivery note: ${order.note || "None"}`,
        "",
        "ITEMS:",
        itemLines,
        "",
        `Subtotal: $${subtotal.toFixed(2)}`,
        `Delivery fee: $${deliveryFee.toFixed(2)}`,
        `TOTAL INCLUDING DELIVERY: $${finalTotal.toFixed(2)}`,
        "",
        `Payment method: ${order.payment}`,
        order.payment === "crypto"
          ? `USDT network: ${order.usdtNetwork || "Not specified"}`
          : "",
        order.payment === "crypto"
          ? `USDT address: ${order.usdtAddress || "Not configured"}`
          : "",
        `Attached file: ${safeName} (${paymentLabel})`,
        "",
        "IMPORTANT: Payment has NOT been automatically verified. Review the attachment and confirm manually."
      ].filter(Boolean).join("\n");

      // SEND ORDER EMAIL
      await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: process.env.STORE_EMAIL,
        replyTo: order.email || undefined,
        subject: `New store order — ${order.customerName}`,
        text: body,
        attachments: [
          {
            filename: safeName,
            content: req.file.buffer,
            contentType: req.file.mimetype
          }
        ]
      });

      console.log("ORDER EMAIL SENT:", order.customerName);

      return res.json({
        success: true,
        message: "Your order has been emailed to the store.",
        subtotal,
        deliveryFee,
        total: finalTotal
      });

    } catch (error) {
      console.error("Order submission failed:", error.message);

      return res.status(500).json({
        message: "We could not email your order. Please try again."
      });
    }
  }
);

// UPLOAD AND MULTER ERROR HANDLING
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "The upload is too large. Maximum file size is 5MB."
      });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Unexpected upload field. Please check the payment file field name."
      });
    }

    return res.status(400).json({
      message: err.message
    });
  }

  return res.status(400).json({
    message: err.message || "Invalid upload."
  });
});

// CHECK EMAIL SETTINGS
if (
  !process.env.STORE_EMAIL ||
  !process.env.SMTP_HOST ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASS
) {
  console.warn("Email settings are incomplete. Configure .env.");
}

// START SERVER
app.listen(PORT, () => {
  console.log(`Store running at http://localhost:${PORT}`);
});
