<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'comment' => 'required|string',
            'rating' => 'required|integer|min:0|max:5',
        ]);

        $comment = Comment::create($validated);

        return response()->json($comment, 201);
    }
    public function index($productId)
    {
        $comments = Comment::where('product_id', $productId)->with('user')->get();
        return response()->json([
            'comments' => $comments
        ]);
    }
}
