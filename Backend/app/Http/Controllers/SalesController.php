<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{

    public function getSalesByCategory()
    {
        // Replace this with actual data fetching logic
        $data = [
            'Electronics' => 1500,
            'Furniture' => 900,
            'Toys' => 1200,
            'Groceries' => 500,
        ];

        return response()->json(['salesbyCategory' => $data]);
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
    public function getMonthlySales()
    {
        $monthlyData = DB::table('order_details')
            ->join('orders', 'order_details.order_id', '=', 'orders.id')
            ->select(
                DB::raw('MONTH(orders.created_at) as month'),
                DB::raw('YEAR(orders.created_at) as year'),
                DB::raw('SUM(order_details.price * order_details.quantity) as totalSales')
            )
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get()
            ->map(function ($data) {
                return [
                    'month' => date('F', mktime(0, 0, 0, $data->month, 10)), // Convert month number to month name
                    'totalSales' => $data->totalSales,
                ];
            });

        return response()->json(['monthlyData' => $monthlyData]);
    }
}
