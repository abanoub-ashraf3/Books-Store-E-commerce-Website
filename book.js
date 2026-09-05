const container = document.querySelector('.product-container');

const books = [
    {
        title: 'Clean code',
        author: 'Robert C. Martin',
        price: 24.99,
        rating: 4.7,
        category: 'tech',
        image: 'books photos/t1.jpg',
    },

    {
        title: 'Brothers karamazov',
        author: 'Dostoevsky',
        price: 15.36,
        rating: 4.2,
        category: 'novel',
        image: 'books photos/n1.jpg',
    },

    {
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        price: 20,
        rating: 4.5,
        category: 'finance',
        image: 'books photos/f1.jpg',
    },

    {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        price: 15.22,
        rating: 3.8,
        category: 'history',
        image: 'books photos/h1.jpg',
    },

    {
        title: 'Leaves of Grass',
        author: 'Walt Whitman',
        price: 40.91,
        rating: 3.2,
        category: 'poetry',
        image: 'books photos/p1.jpg',
    },

    {
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        price: 11.16,
        rating: 4.6,
        category: 'bio',
        image: 'books photos/bi.jpg',
    },
];

const booksperpage = 14;
let currentpage = 1;

function showBooks(books){

    container.innerHTML = '';

    let start = (currentpage - 1)*booksperpage;
    let end = start + booksperpage
    const bookstoshow = books.slice(start, end);

    bookstoshow.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <img src="${book.image}" alt="${book.title}">

      <h3>${book.title}</h3>

      <p id="author">${book.author}</p>

      <div>
      <p id="rate">⭐ ${book.rating}</p>

      <p id="price">$${book.price}</p>
      </div>

      <button onclick="toCart()" class="add-to-cart">Add to Cart</button>
    `;
    container.appendChild(card);
});
}
showBooks(books);

function showCategory(category)
{
    container.innerHTML = '';
    const filteredbooks = books.filter(book => book.category === category);
    showBooks(filteredbooks);
}

let cart_num = 0;

let cart = [];

function toCart(title) {
    let bookTitle = title;
    if (!bookTitle) {
        bookTitle = event.target.parentElement.querySelector('h3').textContent;
    }

    const selectedBook = books.find(b => b.title === bookTitle);
    if (!selectedBook) return;

    const existingIndex = cart.findIndex(item => item.title === selectedBook.title);

    if (existingIndex > -1) {
        cart[existingIndex].qty++;
    } else {
        cart.push({ ...selectedBook, qty: 1 });
    }
    updateCart();
}

function changeQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, i) => {
        total += item.price * item.qty;
        count += item.qty;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">${item.author}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-controls">
                    <button onclick="changeQty(${i}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${i}, 1)">+</button>
                </div>
            </div>
            <i class="fa-regular fa-trash-can delete-item" onclick="removeItem(${i})"></i>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartCount.textContent = count;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function Search(value)
{
    container.innerHTML = '';

    const filterdbooks_Search = books.filter(book => book.title.toLowerCase().includes(value.toLowerCase()));

    showBooks(filterdbooks_Search);
}

function Pagination()
{
    document.querySelectorAll('.pag').forEach(button => {
        button.addEventListener("click", ()=> {
           const totalpages = Math.ceil(books.length / booksperpage);

           if (button.id === 'pag1')
           {
            if(currentpage > 1)
            {
                currentpage--;
            }
           }

           else if(button.id === 'pag7')
           {
            if(currentpage < totalpages)
            {
                currentpage++;
            }
           }

           else
           {
             const page = Number(button.textContent);

             if (page <= totalpages) 
             {
               currentpage = page;
             }
           }
           showBooks(books);
        })
    })
}
Pagination();

const rev = document.querySelector('.rev')

const Reviews = [
    {
        name: 'Abanoub Ashraf',
        rate: '⭐⭐⭐⭐',
        num: '4.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },

    {
        name: 'Lionel Messi',
        rate: '⭐⭐⭐⭐⭐',
        num: '5.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },

    {
        name: 'Mohamed Salah',
        rate: '⭐⭐⭐',
        num: '3.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },

    {
        name: 'Olivia Beshoy',
        rate: '⭐⭐⭐',
        num: '3.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },

    {
        name: 'Esraa Zyad',
        rate: '⭐⭐⭐',
        num: '3.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },

    {
        name: 'Ryad Ahmed',
        rate: '⭐⭐⭐⭐⭐',
        num: '5.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },

    {
        name: 'Nymar Junior',
        rate: '⭐⭐⭐⭐',
        num: '4.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },

    {
        name: 'Samir Mounir',
        rate: '⭐⭐⭐',
        num: '3.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },

    {
        name: 'Wael Magdy',
        rate: '⭐',
        num: '1.0',
        opinion: 'Good quality books at reasonable prices. Will definitely order again.',
    },
];

const reviewsperpage = 3;
let currentpage2 = 1;

function showRev(Reviews)
{
    rev.innerHTML = '';
    let start2 = (currentpage2 - 1)*reviewsperpage;
    let end2 = start2 + reviewsperpage;
    const bookstoshow2 = Reviews.slice(start2, end2);

    bookstoshow2.forEach(Review =>{
    const revs = document.createElement('div');
    revs.classList.add('revs');
    revs.innerHTML = `
                <i class="fa-solid fa-user"></i>
                <div class="text-book3">
                <h3>${Review.name}</h3>
                <h4>${Review.rate}<span>${Review.num}</span></h4>
                <p>${Review.opinion}</p>
                </div>
    `
    rev.appendChild(revs);
    })
}
showRev(Reviews);

function PaginationRev()
{
    document.querySelectorAll('.pagi').forEach(button => {button.addEventListener('click', ()=> {
        const totalpages2 = Math.ceil(Reviews.length / reviewsperpage);
        if(button.id === 'pagi1')
        {
            if(currentpage2 > 1)
            {
                currentpage2--;
            }
        }
        else if(button.id === 'pagi7')
        {
            if(currentpage2 < totalpages2)
            {
                currentpage2++;
            }
        }
        else
        {
            const page2 = Number(button.textContent)
            if(page2 <= totalpages2)
            {
                currentpage2 = page2;
            }
        }
        showRev(Reviews);
    })
})
}
PaginationRev();

function openCart(){
    document.getElementById("cart").style.display = "block";
}

function closeCart(){
    document.getElementById("cart").style.display = "none";
}