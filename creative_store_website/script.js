/*
  NOIR & CO. — STORE SETUP
  Edit product names, categories, descriptions, images, units, size options and prices here.
  Each product can use either g or ml. Prices are sample values.
*/
const STORE_CONFIG = {
  currency: "$",
  giftCardEmail: "aladejesu02@gmail.com",
  usdtAddress: "TKXi5gzaNLeboG1pozXN2h487PYknTMHAS",
  usdtNetwork: "TRC20",
  deliveryFee: 3,
  products: [
    { id: 1, name: "Premium Cannabis Buds", category: "CANNABIS", description: "A close-up presentation of green cannabis flower buds.", image: "images/1.jpg", unit: "g", sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
    { id: 2, name: "Exotic Cannabis Collection", category: "CANNABIS", description: "A collection of cannabis flower buds presented in a detailed close-up.", image: "images/2.jpg", unit: "g",  sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
    { id: 3, name: "Cannabis Reserve", category: "CANNABIS", description: "A featured item from the limited product collection..", image: "images/3.jpg", unit: "g",  sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
    { id: 4, name: "Never Fake Poppers", category: "POPPERS", description: "Never Fake branded bottle featuring its distinctive red and yellow packaging.", image: "images/4.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 5, name: "Rush Poppers Collection", category: "POPPERS", description: "A visual collection of Rush and Power-Pak branded bottles.", image: "images/5.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 6, name: "Never Fake Original", category: "POPPERS", description: "Never Fake branded packaging with its signature red and yellow design", image: "images/6.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 7, name: "Classic Poppers Bottles", category: "POPPERS", description: "A collection of dark glass bottles displayed together.", image: "images/7.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 8, name: "Never Fake Edition", category: "POPPERS", description: "A branded bottle and packaging display", image: "images/8.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 9, name: "Premium Poppers Collection", category: "POPPERS", description: "A selection of dark glass bottles in a coordinated display.", image: "images/9.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 10, name: "Power-Pak Original", category: "POPPERS", description: "Power-Pak branded product featuring distinctive red and yellow packaging.", image: "images/10.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 11, name: "Premium Green Buds", category: "CANNABIS", description: "A close-up display of green botanical flower buds alongside a storage jar", image: "images/11.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 12, name: "Exotic Bud Collection", category: "CANNABIS", description: "A detailed presentation of botanical flower buds", image: "images/12.jpg", unit: "ml",  sizes: [{ amount: 10, price: 15 }, { amount: 30, price: 30 }] },
    { id: 13, name: "Herbal Cannabis Selection", category: "CANNABIS", description: "A close-up botanical presentation featuring dried flower material.", image: "images/13.jpg", unit: "g",  sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
    { id: 14, name: "Cannabis Pack", category: "CANNABIS", description: "A packaged botanical product display.", image: "images/14.jpg", unit: "g",  sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
    { id: 15, name: "Botanical Bud Collection", category: "CANNABIS", description: "A tabletop display featuring botanical material and glass containers.", image: "images/15.jpg", unit: "g",  sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
    { id: 16, name: "Premium Flower Collection", category: "CANNABIS", description: "A detailed display of green botanical flower buds", image: "images/17.jpg", unit: "g",  sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
    { id: 17, name: "Cannabis Jar Collection", category: "CANNABIS", description: "A close-up display featuring a glass jar and botanical material", image: "images/bag-08.jpg", unit: "g",  sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
    { id: 18, name: "Exotic Herbal Collection", category: "CANNABIS", description: "A packaged botanical product collection.", image: "images/18.jpg", unit: "g",  sizes: [{ amount: 10, price: 60 }, { amount: 25, price: 130 }, { amount: 50, price: 300 }, { amount: 100, price: 620 }] },
  ]
};
const $ = selector => document.querySelector(selector);
let cart = [];

const DELIVERY_FEE = STORE_CONFIG.deliveryFee;

function money(value) {
  return STORE_CONFIG.currency + Number(value).toFixed(2);
}

function imageMarkup(src, alt, className = "") {
  return `<img class="${className}" src="${src}" alt="${alt}" onerror="this.style.display='none';this.parentElement.classList.add('image-placeholder')">`;
}

function renderProducts() {
  $("#productTotal").textContent =
    `${STORE_CONFIG.products.length} ITEMS / OUR COLLECTION`;

  $("#productGrid").innerHTML = STORE_CONFIG.products.map(product => `
    <article class="product-card" data-product="${product.id}">
      <div class="product-image">
        ${imageMarkup(product.image, product.name)}
        <span class="product-badge">${product.category}</span>
      </div>

      <div class="product-info">
        <div class="product-title-line">
          <h3>${product.name}</h3>
          <span class="product-price" id="price-${product.id}">
            ${money(product.sizes[0].price)}
          </span>
        </div>

        <p class="product-description">${product.description}</p>

        <div class="product-controls">
          <label>
            <span class="quantity-label">${product.unit.toUpperCase()} SIZE</span>
            <select class="size-select" data-id="${product.id}">
              ${product.sizes.map((size, i) => `
                <option value="${i}">
                  ${size.amount}${product.unit} — ${money(size.price)}
                </option>
              `).join("")}
            </select>
          </label>

          <label>
            <span class="quantity-label">QUANTITY</span>
            <input class="quantity-input" type="number"
              min="1" max="99" value="1">
          </label>
        </div>

        <button class="add-button" data-add="${product.id}">
          ADD TO BAG ＋
        </button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".size-select").forEach(select => {
    select.addEventListener("change", () => {
      const product = STORE_CONFIG.products.find(
        p => p.id === Number(select.dataset.id)
      );

      $("#price-" + product.id).textContent =
        money(product.sizes[Number(select.value)].price);
    });
  });

  document.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () =>
      addToCart(Number(button.dataset.add), button)
    );
  });
}

function addToCart(id, button) {
  const product = STORE_CONFIG.products.find(p => p.id === id);
  const card = button.closest(".product-card");

  const size = product.sizes[
    Number(card.querySelector(".size-select").value)
  ];

  const quantity = Math.max(
    1,
    Math.min(99, Number(card.querySelector(".quantity-input").value) || 1)
  );

  const existing = cart.find(item =>
    item.id === id &&
    item.amount === size.amount &&
    item.unit === product.unit
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id,
      name: product.name,
      image: product.image,
      amount: size.amount,
      unit: product.unit,
      price: size.price,
      quantity
    });
  }

  renderCart();

  button.textContent = "ADDED ✓";

  setTimeout(() => {
    button.textContent = "ADD TO BAG ＋";
  }, 1000);
}

function total() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

function renderCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  $("#cartCount").textContent = count;
  $("#floatingCartCount").textContent = count;
  $("#drawerCount").textContent = `(${count})`;
  $("#cartSubtotal").textContent = money(total());

  $("#cartItems").innerHTML = cart.length
    ? cart.map((item, index) => `
      <div class="cart-item">
        ${imageMarkup(item.image, item.name, "cart-thumb")}

        <div>
          <h4>${item.name}</h4>
          <p>${item.amount}${item.unit} · Qty ${item.quantity}</p>
          <strong>${money(item.price * item.quantity)}</strong>
        </div>

        <button class="remove-item" data-remove="${index}">
          ✕
        </button>
      </div>
    `).join("")
    : '<div class="empty-bag">Your bag is waiting for something good. ✳</div>';

  document.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      cart.splice(Number(btn.dataset.remove), 1);
      renderCart();
    });
  });
}

function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#backdrop").classList.add("show");
}

function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#backdrop").classList.remove("show");
}

// DELIVERY FEE CALCULATION

function updateDeliveryFee() {
  const address = $('textarea[name="address"]').value.trim();

  const feeRow = $("#deliveryFeeRow");

  if (address.length > 0) {
    feeRow.hidden = false;

    $("#deliveryFeeAmount").textContent =
      money(DELIVERY_FEE);

    $("#checkoutTotal").textContent =
      money(total() + DELIVERY_FEE);
  } else {
    feeRow.hidden = true;

    $("#checkoutTotal").textContent =
      money(total());
  }
}

function renderCheckoutSummary() {
  $("#checkoutItems").innerHTML = cart.map(item => `
    <div class="summary-row">
      <span>
        ${item.name}
        <small>${item.amount}${item.unit} × ${item.quantity}</small>
      </span>
      <b>${money(item.price * item.quantity)}</b>
    </div>
  `).join("");

  $("#checkoutSubtotal").textContent = money(total());

  updateDeliveryFee();
}

// CART EVENTS

$("#cartTrigger").addEventListener("click", openCart);
$("#floatingBagTrigger").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#backdrop").addEventListener("click", closeCart);

$("#checkoutButton").addEventListener("click", () => {
  if (!cart.length) {
    return alert("Your bag is empty. Add a product first.");
  }

  closeCart();

  renderCheckoutSummary();

  $("#checkoutModal").classList.add("show");
});

$("#closeCheckout").addEventListener("click", () => {
  $("#checkoutModal").classList.remove("show");
});

// ADDRESS INPUT

$('textarea[name="address"]').addEventListener(
  "input",
  updateDeliveryFee
);

// PAYMENT SELECTION

document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener("change", () => {
    $("#giftCardPanel").hidden =
      radio.value !== "giftcard" || !radio.checked;

    $("#cryptoPanel").hidden =
      radio.value !== "crypto" || !radio.checked;

    $("#giftCardFile").required =
      radio.value === "giftcard" && radio.checked;

    $("#cryptoProofFile").required =
      radio.value === "crypto" && radio.checked;
  });
});

// FILE UPLOAD

function bindFileName(inputId, outputId) {
  $(inputId).addEventListener("change", event => {
    const file = event.target.files[0];

    $(outputId).textContent = file
      ? `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`
      : "PNG, JPG, WEBP or PDF · max 5MB";
  });
}

bindFileName("#giftCardFile", "#giftCardFileName");
bindFileName("#cryptoProofFile", "#cryptoFileName");

// COPY WALLET

$("#copyWallet").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(STORE_CONFIG.usdtAddress);

    $("#copyWallet").textContent = "Copied ✓";

    setTimeout(() => {
      $("#copyWallet").textContent = "Copy";
    }, 1400);
  } catch {
    alert("Copy is unavailable here. Please select and copy the wallet address.");
  }
});


// PLACE ORDER

$("#orderForm").addEventListener("submit", async event => {
  event.preventDefault();

  if (!cart.length) {
    alert("Your bag is empty.");
    return;
  }

  const form = event.currentTarget;
  const formData = new FormData(form);

  // Remove the original file fields to avoid duplicate uploads.
  formData.delete("giftCardImage");
  formData.delete("cryptoProof");

  const payment = formData.get("payment");
  const address = String(formData.get("address") || "").trim();

  if (!address) {
    alert("Please enter your delivery address.");
    return;
  }

  if (!payment) {
    alert("Please select a payment method.");
    return;
  }

  // Declare proof BEFORE using it.
  const proof = payment === "giftcard"
    ? $("#giftCardFile").files[0]
    : payment === "crypto"
      ? $("#cryptoProofFile").files[0]
      : null;

  if (!proof) {
    alert(
      payment === "giftcard"
        ? "Please upload your gift card image."
        : "Please upload your USDT payment proof."
    );
    return;
  }

  if (proof.size > 5 * 1024 * 1024) {
    alert("The selected file is larger than 5MB.");
    return;
  }

  if (![
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf"
  ].includes(proof.type)) {
    alert("Please upload a JPG, PNG, WEBP or PDF file.");
    return;
  }

  const subtotal = total();
  const deliveryFee = DELIVERY_FEE;

  const order = {
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address,
    note: formData.get("note"),
    payment,
    usdtNetwork: STORE_CONFIG.usdtNetwork,
    usdtAddress: STORE_CONFIG.usdtAddress,
    items: cart,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  };

  formData.set("order", JSON.stringify(order));
  formData.set("paymentFile", proof);

  const submitButton = form.querySelector(
    'button[type="submit"]'
  );

  submitButton.disabled = true;
  submitButton.textContent = "SENDING ORDER…";

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "The order could not be sent."
      );
    }

    $("#confirmationText").textContent =
      `Thank you, ${order.customerName}. Your order and payment file have been sent to the store.`;

    $("#paymentInstructions").innerHTML = `
      <b>Order submitted successfully</b>
      <br>Subtotal: ${money(order.subtotal)}
      <br>Delivery fee: ${money(order.deliveryFee)}
      <br><strong>Total: ${money(order.total)}</strong>
      <br>Payment method: ${
        payment === "giftcard" ? "Gift card" : "USDT"
      }
      <br>The store will contact you on ${order.phone}.
    `;

    $("#checkoutModal").classList.remove("show");
    $("#confirmation").classList.add("show");

  } catch (error) {
    console.error("ORDER ERROR:", error);
    alert(error.message + "\n\nPlease try again.");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML =
      'Place order <span>↗</span>';
  }
});


// CONFIRMATION

function closeConfirmation() {
  $("#confirmation").classList.remove("show");

  cart = [];

  renderCart();

  $("#orderForm").reset();

  updateDeliveryFee();
}

$("#closeConfirmation").addEventListener(
  "click",
  closeConfirmation
);

// INITIALIZE

renderProducts();
renderCart();