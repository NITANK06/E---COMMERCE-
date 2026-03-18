"use client";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalRupees = (total * 83).toFixed(0);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div>
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/" className="text-blue-600">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2 text-left">Product</th>
                    <th className="border p-2 text-right">Price</th>
                    <th className="border p-2 text-right">Quantity</th>
                    <th className="border p-2 text-right">Total</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const itemRupees = (item.price * 83).toFixed(0);
                    const itemTotalRupees = (item.price * item.quantity * 83).toFixed(0);
                    return (
                    <tr key={item.id}>
                      <td className="border p-2">{item.title}</td>
                      <td className="border p-2 text-right">₹{parseInt(itemRupees).toLocaleString('en-IN')}</td>
                      <td className="border p-2 text-right">{item.quantity}</td>
                      <td className="border p-2 text-right">
                        ₹{parseInt(itemTotalRupees).toLocaleString('en-IN')}
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-right">
              <h2 className="text-3xl font-bold text-green-600">
                Total: ₹{parseInt(totalRupees).toLocaleString('en-IN')}
              </h2>
              <p className="text-sm text-gray-500">
                (${total.toFixed(2)} USD)
              </p>
              <button className="bg-green-500 text-white px-6 py-2 rounded mt-4">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
