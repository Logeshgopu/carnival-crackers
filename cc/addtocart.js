const product = [
    { id: 0, image: 'image/kuruvi.jpg', title: '2 ¾” Kuruvi', price: 40 },
    { id: 1, image: 'image/Lakshmi.jpg', title: '3 ½” Lakshmi', price: 60 },
    { id: 2, image: 'image/Laxmi.jpg', title: '4” Laxmi', price: 98 },
    { id: 3, image: 'image/Laxmigold.jpg', title: '4” Laxmi (Gold)', price: 130 },
    { id: 4, image: 'image/sparkler.jpg', title: 'Sparkler', price: 20 },
    { id: 5, image: 'image/rocket.jpg', title: 'Rocket', price: 150 },
    { id: 6, image: 'image/chakra.jpg', title: 'Chakra', price: 70 },
    { id: 7, image: 'image/flowerpot.jpg', title: 'Flower Pot', price: 90 }
];

let cart = [];

function toggleCart() {
    console.log('toggleCart called');
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'block') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'block';
    }
}


function addtocart(a) {
    const itemInCart = cart.find(item => item.id === product[a].id);
    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        cart.push({ ...product[a], quantity: 1 });
    }
    displaycart();
}

function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}

function displaycart() {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    } else {
        document.getElementById('cartItem').innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${item.image}>
                    </div>
                    <p style='font-size:12px;'>${item.title}</p>
                    <p style='font-size:12px;'>${item.quantity} x $${item.price}</p>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');
        document.getElementById("total").innerHTML = "$ " + total + ".00";
    }
}

document.getElementById("cart-plus").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("show");
});

document.querySelector(".close-btn").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.remove("show");
});

window.onload = () => {
    const productContainer = document.getElementById('root');
    let productHTML = '';
    const headingHTML = '<h2>Special Offers</h2>';

    product.forEach((item, index) => {
        if (index > 0 && index % 4 === 0) {
            productHTML += headingHTML;
        }
        productHTML += `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src=${item.image}></img>
                </div>
                <div class='bottom'>
                    <p>${item.title}</p>
                    <h2>$ ${item.price}.00</h2>
                    <button onclick='addtocart(${index})'>Add to cart</button>
                </div>
            </div>
        `;
    });
    
    productContainer.innerHTML = productHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-btn');
    const subButtons = document.querySelectorAll('.sub-btn');
    const totalPriceElement = document.getElementById('totalPrice');

    addButtons.forEach(button => {
        button.addEventListener('click', updateQuantity);
    });

    subButtons.forEach(button => {
        button.addEventListener('click', updateQuantity);
    });

    function updateQuantity(event) {
        const button = event.target;
        const quantityElement = button.parentNode.querySelector('.quantity');
        const price = parseFloat(button.dataset.price);
        let quantity = parseInt(quantityElement.textContent);

        if (button.classList.contains('add-btn')) {
            quantity++;
        } else if (button.classList.contains('sub-btn') && quantity > 0) {
            quantity--;
        }

        quantityElement.textContent = quantity;
        updateTotal();
    }

    function updateTotal() {
        let total = 0;
        const quantities = document.querySelectorAll('.quantity');
        quantities.forEach(quantityElement => {
            const price = parseFloat(quantityElement.dataset.price);
            const quantityValue = parseInt(quantityElement.textContent);
            total += price * quantityValue;
        });
        totalPriceElement.textContent = total.toFixed(2);
    }
});