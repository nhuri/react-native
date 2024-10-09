const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const cart_schema = new Schema({


    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min:1,
                max:20
            }

        }
    ]
})



module.exports = mongoose.model('carts', cart_schema)