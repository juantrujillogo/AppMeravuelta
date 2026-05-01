import mongoose, { Schema, model, models } from 'mongoose';

export interface IProduct {
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string | null;
  featured: boolean;
  image: string;
  vendorName: string;
  vendorRating: number;
  shippingTime: string;
  description: string;
  specs: string[];
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: String, default: null },
  featured: { type: Boolean, default: false },
  image: { type: String, required: true },
  vendorName: { type: String, required: true },
  vendorRating: { type: Number, required: true, default: 0 },
  shippingTime: { type: String, required: true },
  description: { type: String, required: true },
  specs: { type: [String], default: [] },
}, {
  timestamps: true,
});

const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
