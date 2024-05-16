<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|max:200|unique:users,email',
            'password' => 'required|min:6|',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages()
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $token =   $user->createToken($user->email . '_Token')->plainTextToken;
            return response()->json([
                'status' => 201,
                'message' => 'Register With success !',
                'data' => $user,
                'token' => $token
            ]);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:200',
            'password' => 'required|min:6|',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages()
            ]);
        } else {
            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 404,
                    'message' => 'invalid Password or email'
                ]);
            } else {
                // $request->session()->regenerate();
                $token =   $user->createToken($user->email . '_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'message' => 'Login With success !',
                    'data' => $user,
                    'token' => $token
                ]);
            }
        }
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged out successfully'
        ]);
    }
}
