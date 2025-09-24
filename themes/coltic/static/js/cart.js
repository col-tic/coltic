document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'cart_simple';
  const addBtn = document.getElementById('add-to-cart');
  const qtyInput = document.getElementById('cantidad');
  const overlay = document.getElementById('cart-overlay');
  const closeBtn = document.getElementById('cart-close');
  const cartContents = document.getElementById('cart-contents');
  const productInfo = document.getElementById('product-info');
  const clearBtn = document.getElementById('clear-cart');

  if (!addBtn || !qtyInput || !overlay || !closeBtn || !cartContents || !productInfo || !clearBtn) {
    console.warn("Elementos del carrito no encontrados en DOM");
    return;
  }

  // --- Funciones del carrito ---
  function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    const cart = getCart();
    if (cart.length === 0) {
      cartContents.innerHTML = '<p>Tu carrito está vacío.</p>';
      return;
    }

    let total = 0;
    cartContents.innerHTML = cart.map(item => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      return `
        <div class="card-carrito" data-alias="${item.alias}">
          <img src="${item.image}" alt="${item.title}">
          <div class="info">
            <h3>${item.title}</h3>
            <p>Precio unitario: ${item.price}</p>
            <p>Subtotal: ${subtotal}</p>
            <p>Stock: ${item.stock}</p>
            <div class="cantidad-control">
              <button class="qty-minus">-</button>
              <input type="number" class="cart-qty" value="${item.qty}" min="1" max="${item.stock}">
              <button class="qty-plus">+</button>
            </div>
          </div>
        </div>`;
    }).join('') + `
      <div class="cart-total">Total: ${total}</div>
      <div class="cart-actions">
        <button id="buy-cart" class="btn btn-comprar">Comprar</button>
      </div>`;

    // botones + / -
    cartContents.querySelectorAll('.qty-plus').forEach(btn => {
      btn.onclick = e => {
        const card = e.target.closest('.card-carrito');
        const alias = card.dataset.alias;
        const input = card.querySelector('.cart-qty');
        let val = parseInt(input.value, 10);
        if (val < parseInt(input.max, 10)) {
          input.value = val + 1;
          updateQty(alias, val + 1);
        }
      };
    });

    cartContents.querySelectorAll('.qty-minus').forEach(btn => {
      btn.onclick = e => {
        const card = e.target.closest('.card-carrito');
        const alias = card.dataset.alias;
        const input = card.querySelector('.cart-qty');
        let val = parseInt(input.value, 10);
        if (val > 1) {
          input.value = val - 1;
          updateQty(alias, val - 1);
        }
      };
    });

    // Listener del botón Comprar dentro del carrito
    const buyBtn = document.getElementById('buy-cart');
    if (buyBtn) {
      buyBtn.onclick = () => comprarCarrito();
    }
  }

  function updateQty(alias, qty) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.alias === alias);
    if (idx > -1) {
      const stock = cart[idx].stock || Infinity;
      cart[idx].qty = Math.max(1, Math.min(stock, qty));
      saveCart(cart);
    }
  }

  // --- Añadir al carrito ---
  addBtn.addEventListener('click', (e) => {
    e.preventDefault(); // evita recarga
    const alias = productInfo.dataset.alias;
    const title = productInfo.dataset.title;
    const price = parseFloat(productInfo.dataset.price) || 0;
    const image = productInfo.dataset.image;
    const stock = parseInt(productInfo.dataset.stock, 10) || Infinity;
    const qty = parseInt(qtyInput.value, 10) || 1;

    const cart = getCart();
    const existing = cart.find(i => i.alias === alias);
    if (existing) {
      existing.qty = Math.min(stock, existing.qty + qty);
    } else {
      cart.push({ alias, title, price, qty, image, stock });
    }

    saveCart(cart);
    overlay.classList.remove('hidden'); // abre el carrito
  });

  // --- Cerrar / limpiar carrito ---
  closeBtn.onclick = () => overlay.classList.add('hidden');
  clearBtn.onclick = () => {
    localStorage.removeItem(STORAGE_KEY);
    renderCart();
  };

  // --- Función Comprar ---
  function comprarCarrito() {
    const cart = getCart();
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    // Aquí puedes integrar Supabase para registrar la venta
    alert("Compra simulada. Aquí se podrían registrar las ventas y actualizar stock.");

    localStorage.removeItem(STORAGE_KEY);
    renderCart();
  }

  renderCart();
});
