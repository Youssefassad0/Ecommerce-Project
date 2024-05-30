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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'message' => 'required|string',
        ]);

        $review = new Review;
        $review->product_id = $productId;
        $review->name = $request->name;
        $review->email = $request->email;
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
        $reviews = Review::join('users', 'reviews.email', '=', 'users.email') // Eager load the user information
            ->where('reviews.product_id', $productId)
            ->orderBy('reviews.created_at', 'desc')
            ->take(5)
            ->get();

        return response()->json($reviews);
    }
}
