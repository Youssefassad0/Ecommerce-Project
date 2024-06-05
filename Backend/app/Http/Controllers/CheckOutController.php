<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CheckOutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = auth('sanctum')->user()->id;
        return response()->json([
            'data' => $id
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (auth('sanctum')->check()) {
            $userId = auth('sanctum')->user()->id;
            $validator = Validator::make($request->all(), [
                'id_user' => 'required|numeric',
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'pays' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'no_street' => 'required|string|max:255',
                'zipcode' => 'required|string|max:10',
                'cartItems' => 'required|array',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                DB::beginTransaction();
                try {
                    $order = Order::create([
                        'id_user' => $userId,
                        'name' => $request->name,
                        'email' => $request->email,
                        'pays' => $request->pays,
                        'city' => $request->city,
                        'no_street' => $request->no_street,
                        'zipcode' => $request->zipcode,
                        'payment_mode' => $request->payment_mode,
                        'tracking_no' => 'TRK' . strtoupper(uniqid()),
                        'status' => 'pending',
                    ]);

                    foreach ($request->cartItems as $item) {
                        $product = Product::find($item['id']);

                        if ($product) {
                            if ($product->stock >= $item['quantity']) {
                                $product->stock -= $item['quantity'];
                                $product->save();

                                OrderDetail::create([
                                    'order_id' => $order->id,
                                    'product_id' => $item['id'],
                                    'quantity' => $item['quantity'],
                                    'price' => $item['total'],
                                ]);
                            } else {
                                return response()->json([
                                    'status' => 400,
                                    'message' => 'Insufficient stock for product: ' . $product->name,
                                ]);
                            }
                        } else {
                            return response()->json([
                                'status' => 404,
                                'message' => 'Product not found: ' . $item['id'],
                            ]);
                        }
                    }

                    DB::commit();
                    return response()->json([
                        'status' => 201,
                        'message' => 'Order placed successfully',
                        'data' => $order
                    ]);
                } catch (\Exception $e) {
                    DB::rollBack();
                    return response()->json([
                        'status' => 500,
                        'message' => 'Error placing order: ' . $e->getMessage(),
                    ]);
                }
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue!'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function validateOrder(Request $request)
    {

        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'id_user' => 'required|numeric',
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'pays' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'no_street' => 'required|string|max:255',
                'zipcode' => 'required|string|max:10',
                'cartItems' => 'required|array',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                return response()->json([
                    'status' => 201,
                    'message' => 'Order placed successfully',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue!'
            ]);
        }
    }
}
