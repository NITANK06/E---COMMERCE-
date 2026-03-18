"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { removeFromCart } from "../redux/cartSlice";

export default function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Shop
      </Link>
      <Link href="/cart" className="text-lg">
        Cart ({cartItems.length})
      </Link>
    </nav>
  );
}
