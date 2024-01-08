// models/cart.ts
import { Schema, model, Document } from 'mongoose';

interface CartItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

interface ICart extends Document {
  userId: Schema.Types.ObjectId;
  items: CartItem[];
}

const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

// const Cart = model<CartDocument>('Cart', cartSchema);

export { CartSchema, ICart};