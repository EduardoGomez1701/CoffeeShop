function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    if (cart.length === 0) {
        cartList.innerHTML = "<p>El carrito está vacío.</p>";
        cartTotal.innerHTML = "<strong>Total: </strong>$0";
        return;
    }
    cartList.innerHTML = `
                    <table>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                        ${cart.map((item, i) => `
                            <tr>
                                <td>${item.name}</td>
                                <td>$${item.price}</td>
                                <td>
                                    <button onclick="updateQuantity(${i}, -1)">-</button>
                                    ${item.quantity}
                                    <button onclick="updateQuantity(${i}, 1)">+</button>
                                </td>
                                <td>
                                    <button onclick="removeItem(${i})">Eliminar</button>
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                `;
    // Calcular el total
    const total = cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0);
    cartTotal.innerHTML = `<strong>Total: </strong>$${total.toLocaleString()}`;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

renderCart();