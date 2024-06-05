<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('orderDetails')->where('status', 'pending')->get();
        $orders = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'email' => $order->email,  // Assuming you have this column
                'payment_mode' => $order->payment_mode,  // Assuming you have this column
                'total' => $order->total_price,
                'status' => $order->status,
            ];
        });

        return response()->json($orders);
    }
    public function accepted()
    {
        $orders = Order::with('orderDetails')->where('status', 'accepted')->orderBy('id', 'DESC')->get();
        $orders = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'name' => $order->name,
                'email' => $order->email,  // Assuming you have this column
                'payment_mode' => $order->payment_mode,  // Assuming you have this column
                'total' => $order->total_price,
                'status' => $order->status,
            ];
        });

        return response()->json($orders);
    }
    public function refused()
    {
        $orders = Order::with('orderDetails')->where('status', 'rejected')->orderBy('id', 'DESC')->get();
        $orders = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'name' => $order->name,
                'email' => $order->email,  // Assuming you have this column
                'payment_mode' => $order->payment_mode,  // Assuming you have this column
                'total' => $order->total_price,
                'status' => $order->status,
            ];
        });

        return response()->json($orders);
    }
    public function getUserOrders()
    {
        $userId = auth('sanctum')->user()->id;
        $orders = Order::with('orderDetails')->where('id_user', $userId)->orderBy('id', 'DESC')->get();
        $orders = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'name' => $order->name,
                'email' => $order->email,  // Assuming you have this column
                'payment_mode' => $order->payment_mode,  // Assuming you have this column
                'total' => $order->total_price,
                'status' => $order->status,
                "city" => $order->city
            ];
        });

        return response()->json($orders);
    }
}
