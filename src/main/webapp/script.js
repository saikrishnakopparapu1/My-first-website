document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cart = [];
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSection = document.querySelector('.cart-section');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartCount = document.querySelector('.cart-count');
    
    // Toggle cart visibility
    cartToggle.addEventListener('click', function() {
        cartSection.style.display = cartSection.style.display === 'block' ? 'none' : 'block';
    });
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
        });
    });
    
    // Update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-name">${item.name} x ${item.quantity}</div>
                <div class="cart-item-price">₹${itemTotal}</div>
            `;
            
            cartItemsContainer.appendChild(itemElement);
        });
        
        cartTotal.textContent = `Total: ₹${total}`;
        cartCount.textContent = itemCount;
    }
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Thank you for your order! Total: ₹' + 
            cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
        cart = [];
        updateCart();
        cartSection.style.display = 'none';
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            document.querySelectorAll('nav a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Highlight current section in navigation
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section.menu-category').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.getAttribute('id');
                document.querySelectorAll('nav a').forEach(item => {
                    item.classList.remove('active
