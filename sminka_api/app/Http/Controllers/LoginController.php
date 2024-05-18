<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        if (auth()->attempt($request->only('email', 'password'))) {
            $user = auth()->user();
            return response()->json([
                'success' => true,
                'token' => auth()->user()->createToken('API Token')->plainTextToken,
                'message' => 'Success',
                'user' => new UserResource($user),
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    public function register(Request $request)
    {
        //validate the request

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'user'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully. Please login.',
            'user' => new UserResource($user)
        ]);
    }
}
