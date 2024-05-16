<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::all();
        return response()->json([
            'data' => $category
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|unique:categories,nom',
            'description' => 'nullable|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Ajout de la validation pour l'image
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $path = 'uploads/category';
            $file->move($path, $fileName);

            // Set image path
            $imagePath = $path . '/' . $fileName;
        }

        $category = new Category();
        $category->nom = $request->input('nom');
        $category->description = $request->input('description'); // Correction ici (description au lieu de email)
        $category->image = $imagePath;
        $category->save();

        return response()->json(['data' => $category], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);
        return response()->json([
            'data' => $category,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string',
                'description' => 'nullable|string|max:140',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->messages()], 422);
            } else {
                $category = Category::find($id);
                if (!$category) {
                    return response()->json(['data' => $category, 'message' => 'Category Not Found.'], 404);
                } else {
                    if ($request->hasFile('image')) {
                        $path = $category->image;
                        if (File::exists($path)) {
                            File::delete($path);
                        }
                        $image = $request->file('image');
                        $imageName = time() . '.' . $image->getClientOriginalExtension();
                        $imagePath = 'uploads/category';
                        $image->move($imagePath, $imageName);
                        $category->image = $imagePath . '/' . $imageName;
                    }
                    $category->nom = $request->input('nom');
                    $category->description = $request->input('description');
                    $category->save();
                    return response()->json(['data' => $category, 'message' => 'Category Updated successfully.'], 200);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Category::find($id)->delete();
        return response()->json([
            'message' => 'Deleted With Success !'
        ]);
    }
}
