<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class StatusProductController extends Controller
{
    public function acceptOrder($id)
    {
        $order = Order::findOrFail($id);
        $order->status = 'accepted';
        $order->save();

        return response()->json(['message' => 'Order accepted successfully.']);
    }

    public function rejectOrder($id)
    {
        $order = Order::findOrFail($id);
        $order->status = 'rejected';
        $order->save();

        return response()->json(['message' => 'Order rejected successfully.']);
    }
}
