'use strict';

angular.module('cohesityApp')
  .service('Cart',['Store', function Cart(Store) {
    var loadItems = function () {
            var items = localStorage != null ? localStorage["cohesity_cart_items"] : null;
            if (items!=undefined && items != null && JSON != null) {
                try {
                    var items = JSON.parse(items);
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.id != null && item.name != null && item.price != null && item.quantity != null) {
                            this.items.push(item);
                        }
                    }
                }
                catch (err) {
                    // ignore errors while loading...
                }
            }
            else{
                items = []
            }
            return items
    }
    return {
        
        items: loadItems(),
        cartItem: function(id, name, price, quantity){
            return {
                "id": id,
                "name": name,
                "price": price,
                "quantity":quantity
            }
        },
        /**
         * save items to local storage
         */
        saveItems: function () {
            if (localStorage != null && JSON != null) {
                localStorage["cohesity_cart_items"] = JSON.stringify(this.items);
            }
        },
        /**
         * adds an item to the cart
         */
        addItem: function (id, name, price, quantity) {
            if (quantity != 0) {
                // update quantity for existing item
                var found = false;
                for (var i = 0; i < this.items.length && !found; i++) {
                    var item = this.items[i];
                    if (item && item.id == id) {
                        found = true;
                        item.quantity = this.toNumber(item.quantity + quantity);
                        if (item.quantity <= 0) {
                            this.items.splice(i, 1);
                        }
                    }
                }

                // new item, add now
                if (!found) {
                    var item = this.cartItem(id, name, price, quantity)
                    this.items.push(item);
                }

                // save changes
                this.saveItems();
            }
        },

        /**
         * get the total price for all items currently in the cart
         */
        getTotalPrice: function (id) {
            var total = 0;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (id == null || item.id == id) {
                    total += this.toNumber(item.quantity * item.price);
                }
            }
            return total;
        },

        /**
         * get the total price for all items currently in the cart
         */
        getTotalCount: function (id) {
            var count = 0;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (id == null || item.id == id) {
                    count += this.toNumber(item.quantity);
                }
            }
            return count;
        },

        /**
         * Clear cart
         */
        clearItems: function () {
            this.items = [];
            this.saveItems();
        },
        addFormFields: function (form, data) {
            if (data != null) {
                $.each(data, function (name, value) {
                    if (value != null) {
                        var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                        form.append(input);
                    }
                });
            }
        },
        toNumber: function (value) {
            value = value * 1;
            return isNaN(value) ? 0 : value;
        }

        
    }
  }]);
