// Função para adicionar produtos
function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const image = document.getElementById('productImage').value.trim();

    if (name && description && image) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, description, image });
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        document.getElementById('productName').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productImage').value = '';
    }
}

// Função para exibir produtos
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    const products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div>
                <strong>${product.name}</strong><br>
                <span>${product.description}</span>
            </div>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeProduct(index);

        li.appendChild(removeBtn);
        productList.appendChild(li);
    });
}

// Função para remover produtos
function removeProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Evento para adicionar produto
document.getElementById('addProductBtn').addEventListener('click', addProduct);

// Adicionando produtos iniciais
const initialProducts = [
    {
        name: "Banana",
        description: "Banana madura e deliciosa",
        image: "https://www.infoescola.com/wp-content/uploads/2010/04/banana_600797891.jpg"
    },
    {
        name: "Maçã",
        description: "Maçã fresca e crocante",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/420px-Red_Apple.jpg"
    },
    {
        name: "Pera",
        description: "Pera suculenta e doce",
        image: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/04/04/1708403833-beneficios-da-pera.jpg"
    }
];

// Salvando produtos iniciais no localStorage se não houver produtos
const storedProducts = JSON.parse(localStorage.getItem('products'));
if (!storedProducts) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
}

// Carregando produtos ao inicializar a página
window.onload = displayProducts;
