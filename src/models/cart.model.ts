// models/cart.ts
import { Schema, model, Document } from 'mongoose';

interface CartItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

interface CartDocument extends Document {
  userId: Schema.Types.ObjectId;
  items: CartItem[];
}

const cartSchema = new Schema<CartDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = model<CartDocument>('Cart', cartSchema);

export default Cart;