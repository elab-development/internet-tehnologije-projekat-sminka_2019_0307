<?php

namespace App\Http\Controllers;

use App\Http\Resources\TypeResource;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TypeController extends Controller
{
    //index
    public function index()
    {
        $types = Type::all();
        return response()->json([
            'success' => true,
            'message' => 'List of all types',
            'data' => TypeResource::collection($types)
        ]);
    }

    //show

    public function show($id)
    {
        $type = Type::find($id);

        if ($type) {
            return response()->json([
                'success' => true,
                'message' => 'Type found',
                'data' => new TypeResource($type)
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Type not found'
            ]);
        }
    }

    //store

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type_name' => 'required',
        ]);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ]);
        }

        $type = Type::create([
            'type_name' => $request->type_name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Type created successfully',
            'data' => new TypeResource($type)
        ]);
    }

    //update

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'type_name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Type name not found',
                'errors' => $validator->errors()
            ]);
        }

        $type = Type::find($id);

        if ($type) {
            $type->update([
                'type_name' => $request->type_name,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Type updated successfully',
                'data' => new TypeResource($type)
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Type not found'
            ]);
        }
    }

    //destroy

    public function destroy($id)
    {
        $type = Type::find($id);

        if ($type) {
            $type->delete();
            return response()->json([
                'success' => true,
                'message' => 'Type deleted successfully'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Type not found'
            ]);
        }
    }
}
