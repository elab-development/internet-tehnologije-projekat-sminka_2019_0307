<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return response()->json([
            'success' => true,
            'message' => 'List of all services',
            'data' => ServiceResource::collection($services)
        ]);
    }

    public function show($id)
    {
        $service = Service::find($id);

        if ($service) {
            return response()->json([
                'success' => true,
                'message' => 'Service found',
                'data' => new ServiceResource($service)
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'type_id' => 'required|numeric'
        ]);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ]);
        }

        $service = Service::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'type_id' => $request->type_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Service created',
            'data' => new ServiceResource($service)
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'type_id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ]);
        }

        $service = Service::find($id);

        if ($service) {
            $service->name = $request->name;
            $service->price = $request->price;
            $service->description = $request->description;
            $service->type_id = $request->type_id;
            $service->save();

            return response()->json([
                'success' => true,
                'message' => 'Service updated',
                'data' => new ServiceResource($service)
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ]);
        }
    }

    public function destroy($id)
    {
        $service = Service::find($id);

        if ($service) {
            $service->delete();
            return response()->json([
                'success' => true,
                'message' => 'Service deleted'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ]);
        }
    }

    public function findByName(Request $request)
    {
        $name = $request->name;
        $services = Service::where('name', 'like', '%' . $name . '%')->get();

        return response()->json([
            'success' => true,
            'message' => 'List of services found',
            'data' => ServiceResource::collection($services)
        ]);
    }

    public function groupByType(Request $request)
    {
        $services = Service::select('type_name')
            ->selectRaw('count(*) as total')
            ->join('types', 'services.type_id', '=', 'types.id')
            ->groupBy('type_name')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Services grouped by type',
            'data' => $services
        ]);
    }
}
