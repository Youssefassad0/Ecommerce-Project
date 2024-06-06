<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class SalesController extends Controller
{

    public function getSalesByCategory()
    {
        // Replace this with actual data fetching logic
        // $data = [
        //     'Electronics' => 1500,
        //     'Furniture' => 900,
        //     'Toys' => 1200,
        //     'Groceries' => 500,
        // ];

        // return response()->json(['salesbyCategory' => $data]);

    }

    public function salesByCategory()
    {
        $categories = Category::with(['products.orderDetails'])->get();
        $salesData = $categories->map(function ($category) {
            $totalSales = $category->products->map(function ($product) {
                $productSales = $product->orderDetails->sum(function ($orderDetail) {
                    return $orderDetail->quantity * $orderDetail->price;
                });

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'sales' => $productSales
                ];
            });

            return [
                'category' => $category->nom,
                'sales' => $totalSales->sum('sales')
            ];
        });

        return response()->json([
            'salesByCategory' => $salesData
        ]);
    }
}
