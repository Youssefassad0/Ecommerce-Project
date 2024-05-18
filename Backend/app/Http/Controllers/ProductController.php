<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json([
            'data' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'gender' => 'required|string|max:255',
            'original_price' => 'required|numeric',
            'new_price' => 'nullable|numeric',
            'stock' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,avif,svg|max:2048',
            'category_id' => 'required|integer|exists:categories,id',
            'brand' => 'required|string|max:255',
            'rating' => 'numeric|min:0|max:5',
            'rating_count' => 'integer|min:0',
            'sizes' => 'nullable|json',
            'colors' => 'nullable|json',
        ]);
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $path = 'uploads/category';
            $file->move($path, $fileName);

            // Set image path
            $validated['image'] = $path . '/' . $fileName;
        }

        $validated['sizes'] = json_decode($validated['sizes'], true);
        $validated['colors'] = json_decode($validated['colors'], true);

        $product = Product::create($validated);

        return response()->json($product, 201);
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
}
