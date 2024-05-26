<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckOutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|max:199',
                'email' => 'required|email|exists:users,email',
                'pays' => 'required|max:199',
                'city' => 'required|max:199',
                'no_street' => 'required|max:199',
                'zipcode' => 'required|max:199',
            ]);
            if ($validator->fails()) {

                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {

                return response()->json([
                    'status' => 201,
                    'message' => $request->name
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'login To Continue ! '
            ]);
        }
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
