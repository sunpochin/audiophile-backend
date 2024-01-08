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
      id: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export { CartSchema, ICart};