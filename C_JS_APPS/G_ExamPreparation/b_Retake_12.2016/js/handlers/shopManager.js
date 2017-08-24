//Shop view
handlers.shop = function (ctx) {
    remote.get('appdata', 'products')
        .then((products) => showProducts(products, ctx))
        .catch(helper.handleError);
};
//Cart view
handlers.cart = function (ctx) {
    let userId = ctx.params.id.substring(1);

    remote.get('user', userId)
        .then(userInfo => showUserCart(userInfo, ctx))
        .catch(helper.handleError);
};

function showProducts(products, ctx) {
    products.map(product => {
        product.price = product.price.toFixed(2);
    });
    ctx.products = products;
    ctx.username = helper.getUsername();
    ctx._id = sessionStorage.getItem('userId');

    let partials = helper.getCommonPartials();
    partials.page = './templates/shop/shopView.hbs';
    partials.product = './templates/shop/product.hbs';
    ctx.loadPartials(partials).then(function () {
        this.partial('./templates/main.hbs')
            .then(function () {
                $('button').click(purchase)
            });
    });
}

function showUserCart(userInfo, ctx) {
    let userCart = userInfo.cart;
    for (let key in userCart) {
        let product = userCart[key];
        product.name = product.product.name;
        product.description = product.product.description;
        product.total = (Number(product.product.price) * Number(product.quantity)).toFixed(2);
        product._id = key;
    }
    ctx.cart = userCart;
    ctx.username = helper.getUsername();
    ctx._id = sessionStorage.getItem('userId');

    let partials = helper.getCommonPartials();
    partials.page = './templates/cart/cartPage.hbs';
    partials.cartProduct = './templates/cart/cartRow.hbs';
    ctx.loadPartials(partials)
        .then(function () {
            this.partial('./templates/main.hbs')
                .then(function () {
                    $('button').click((event) => discardProduct(event, ctx))
                });
        });
}

function discardProduct(event, ctx) {
    let prodId = $(event.target).attr('data-id');
    let userId = sessionStorage.getItem('userId');

    remote.get('user', userId)
        .then(userInfo => {
            let cart = userInfo.cart;
            delete cart[prodId];
            userInfo.cart = cart;
            remote.update('user', userId, userInfo)
                .then(function () {
                    helper.showInfo('Product discarded.');
                    showUserCart(userInfo, ctx);
                })
        }).catch(helper.handleError);

}

function purchase(event) {
    let productId = $(event.target).attr('data-id');
    let userId = sessionStorage.getItem('userId');

    remote.get('user', userId, 'kinvey')
        .then(user => handlePurchase(user, productId))
        .catch(helper.handleError);

    function handlePurchase(user, productId) {
        let userCart = user.cart;

        if (userCart.hasOwnProperty(productId)) {
            let quantity = Number(userCart[productId].quantity);
            quantity++;
            userCart[productId].quantity = quantity;
            updateUser(user);
        } else {
            remote.get('appdata', 'products/' + productId, 'kinvey')
                .then(product => placeOrder(user, product, userCart))
                .catch(helper.handleError);
        }

        function placeOrder(user, product, userCart) {
            userCart[product._id] = {
                'quantity': '1',
                'product': {
                    'name': product.name,
                    'description': product.description,
                    'price': product.price
                }
            };
            user.cart = userCart;
            updateUser(user);
        }

        function updateUser(user) {
            remote.update('user', user._id, user, 'kinvey')
                .then(function () {
                    helper.showInfo('Product purchased.');
                })
        }
    }

}
