<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $products = Product::with('images')->join('categories', 'products.category_id', '=', 'categories.id')->get();
        return ProductResource::collection($products);
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
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category_id' => 'required|integer|exists:categories,id',
            'brand' => 'required|string|max:255',
            'rating' => 'required|numeric|min:0|max:5',
            'rating_count' => 'required|integer|min:0',
            'sizes' => 'nullable|json',
            'colors' => 'nullable|json',
        ]);

        // Decode JSON fields
        $validated['sizes'] = json_decode($validated['sizes'], true);
        $validated['colors'] = json_decode($validated['colors'], true);

        // Store the first image path for the 'image' field if images are provided
        if ($request->hasFile('images')) {
            $imagePath = $request->file('images')[0]->store('uploads/products', 'public');
            $validated['image'] = $imagePath;
        }

        // Create the product
        $product = Product::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Store the image and get its path
                $imagePath = $image->store('uploads/products', 'public');

                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $imagePath,
                ]);
            }
        }

        return response()->json($product->load('images'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with('images')->findOrFail($id);
        return new ProductResource($product);
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
