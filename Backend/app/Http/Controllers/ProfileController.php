<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth('sanctum')->check()) {
            return response()->json(auth('sanctum')->user());
        }
    }


    public function update(Request $request)
    {
        $user = User::findOrFail(auth('sanctum')->user()->id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'location' => 'required|string|max:255',
            'password' => 'nullable|string|min:6',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }

        $user->name = $request->name;
        $user->mobile = $request->mobile;
        $user->email = $request->email;
        $user->location = $request->location;

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $path = 'uploads/users';
            $file->move(public_path($path), $fileName);

            // Set image path
            $user->avatar = $path . '/' . $fileName;
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully'], 200);
    }


    /**
     * Remove the specified resource from storage.
     */

    public function getUserReviews()
    {
        if (auth('sanctum')->check()) {

            $id = auth()->user()->id;
            $reviews = Review::where('user_id', $id)->get();
            return response()->json($reviews);
        }
    }

    // Get the authenticated user's orders
    public function getUserOrders()
    {
        if (auth('sanctum')->check()) {
            $id = auth()->user()->id;
            $orders = Order::where('id_user', $id)->get();
            return response()->json($orders);
        }
    }
}
