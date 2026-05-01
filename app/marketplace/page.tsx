import Marketplace from '../../components/Marketplace';
import connectToDatabase from '../../lib/mongodb';
import ProductModel from '../../models/Product';
import { Product } from '../../lib/products';

// Para forzar la actualización dinámica si hay cambios en DB 
export const dynamic = 'force-dynamic';

export default async function MarketplacePage() {
  await connectToDatabase();
  const dbProducts = await ProductModel.find({}).lean() as any[];

  // Convertimos a tipo seguro reconociendo id string
  const products: Product[] = dbProducts.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount,
    featured: p.featured,
    image: p.image,
    vendorName: p.vendorName,
    vendorRating: p.vendorRating,
    shippingTime: p.shippingTime,
    description: p.description,
    specs: p.specs
  }));

  return <Marketplace products={products} />;
}
