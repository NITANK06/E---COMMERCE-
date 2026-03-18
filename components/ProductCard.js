"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Link from "next/link";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const rupeePrice = (product.price * 83).toFixed(0);

  return (
    <div className="border p-4 rounded shadow">
      <img src={product.image} className="h-40 mx-auto" />
      <h2>{product.title}</h2>
      <p className="text-lg font-semibold text-green-600">₹{parseInt(rupeePrice).toLocaleString('en-IN')}</p>
      <p className="text-sm text-gray-500">${product.price}</p>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="bg-blue-500 text-white px-3 py-1 mt-2"
      >
        Add to Cart
      </button>

      <Link href={`/product/${product.id}`} className="block mt-2 text-blue-600">
        View Details
      </Link>
    </div>
  );
}
