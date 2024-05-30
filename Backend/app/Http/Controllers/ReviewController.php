<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $productId)
    {
        $request->validate([
            'message' => 'required|string|max:500',
        ]);
        $id = auth('sanctum')->user()->id;
        $review = new Review;
        $review->product_id = $productId;
        $review->user_id = $id;
        $review->message = $request->message;
        $review->save();

        // Update product's average rating and rating count
        $product = Product::find($productId);
        $product->rating_count += 1;
        $product->rating = (($product->rating * ($product->rating_count - 1)) + $request->rating) / $product->rating_count;
        $product->save();

        return response()->json(['message' => 'Review submitted successfully'], 201);
    }
    public function listLastFiveReviews($productId)
    {
        $reviews = Review::with('user')
            ->where('product_id', $productId)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json($reviews);
    }
}
