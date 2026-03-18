"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const product = items.find((p) => p.id === parseInt(id));

  // Fabric information based on product category
  const fabricInfo = {
    "electronics": "N/A - Electronic Product",
    "jewelery": "N/A - Jewelry Item",
    "men's clothing": "100% Cotton - Premium Quality",
    "women's clothing": "80% Polyester, 20% Spandex - Stretchable & Durable"
  };

  const getFabricDetails = (category) => {
    const categoryLower = category.toLowerCase();
    return fabricInfo[categoryLower] || "Standard Fabric";
  };

  const rupeePrice = product ? (product.price * 83).toFixed(0) : 0;

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="p-4">
          <p>Product not found</p>
          <Link href="/" className="text-blue-600">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Link href="/" className="text-blue-600 mb-4 block">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-2 gap-4 max-w-4xl">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="mb-4">
              <p className="text-3xl font-bold text-green-600">
                ₹{parseInt(rupeePrice).toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-gray-500">
                (${product.price} USD)
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Fabric Used:</span> {getFabricDetails(product.category)}
              </p>
            </div>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-blue-500 text-white px-6 py-3 rounded w-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
