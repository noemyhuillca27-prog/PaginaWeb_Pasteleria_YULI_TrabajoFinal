document.addEventListener("DOMContentLoaded", () => {

  let cart = [];

  const cartCountEl = document.getElementById('cartCount');
  const cartModal = document.getElementById('cartModal');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const openCartBtn = document.getElementById('openCartBtn');
  const openCartFromSection = document.getElementById('openCartFromSection');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const addButtons = document.querySelectorAll('.add-to-cart');


  function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
  }

  
  function renderCart() {
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartItemsEl.innerHTML = '<p>Tu carrito está vacío.</p>';
      cartTotalEl.textContent = "0.00";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const subtotal = item.price * item.qty;
      total += subtotal;

      const div = document.createElement('div');
      div.classList.add("cart-item");

      div.innerHTML = `
        <p>${item.name} x ${item.qty} — S/ ${subtotal.toFixed(2)}</p>
        <button class="delete-btn" data-index="${index}">Eliminar</button>
      `;

      cartItemsEl.appendChild(div);
    });

    cartTotalEl.textContent = total.toFixed(2);

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", deleteItem);
    });
  }


  function deleteItem(e) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    renderCart();
    updateCartCount();
  }

  
  function addToCart(name, price, qty = 1) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, price: parseFloat(price), qty: parseInt(qty) });
    }
    renderCart();
    updateCartCount();
  }

  
  function showCart() {
    renderCart();
    cartModal.classList.add('show');
  }

  function hideCart() {
    cartModal.classList.remove('show');
  }

  
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const qtyInput = btn.previousElementSibling;
      let qty = 1;

      if (qtyInput && !isNaN(parseInt(qtyInput.value))) {
        qty = Math.max(1, parseInt(qtyInput.value));
        qtyInput.value = 1;
      }

      addToCart(name, price, qty);
    });
  });

  openCartBtn && openCartBtn.addEventListener('click', showCart);
  openCartFromSection && openCartFromSection.addEventListener('click', showCart);
  closeCartBtn && closeCartBtn.addEventListener('click', hideCart);

  
  checkoutBtn && checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    let mensaje = "Tu Pedido se Realizó Correctamente:\n\n";
    let total = 0;

    cart.forEach(item => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      mensaje += `${item.name} x ${item.qty}: S/ ${subtotal.toFixed(2)}\n`;
    });

mensaje += "\nTotal: S/ " + total.toFixed(2) + "\n\n";
mensaje += "¡ GRACIAS POR CONFIAR EN LA PASTELERIA YULY !";


    alert(mensaje);

    cart = [];
    renderCart();
    hideCart();
    updateCartCount();
  });

  renderCart();

  
  const formSuscripcion = document.querySelector(".subscribe-form");

  if (formSuscripcion) {
    formSuscripcion.addEventListener("submit", function(e) {
      e.preventDefault();

      const emailInput = this.querySelector("input[type='email']");
      const mensaje = document.getElementById("mensajeSuscripcion");

      if (emailInput.value.trim() === "") {
        mensaje.style.color = "black";
        mensaje.textContent = "Por favor ingresa un correo válido.";
      } else {
        mensaje.style.color = "black";
        mensaje.textContent = "¡GRACIAS POR SUSCRIBIRTE! Pronto recibirás novedades.";
        emailInput.value = "";

        setTimeout(() => {
          mensaje.textContent = "";
        }, 5000);
      }
    });
  }

});


