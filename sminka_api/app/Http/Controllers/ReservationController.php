<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    //index

    public function index()
    {
        $reservations = Reservation::all();
        return response()->json([
            'success' => true,
            'message' => 'List of all reservations',
            'data' => ReservationResource::collection($reservations)
        ]);
    }

    //show

    public function show($id)
    {
        $reservation = Reservation::find($id);

        if ($reservation) {
            return response()->json([
                'success' => true,
                'message' => 'Reservation found',
                'data' => new ReservationResource($reservation)
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Reservation not found'
            ]);
        }
    }


    //store

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|numeric',
            'reservation_date' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'message' => 'required',
            'user_id' => 'required|numeric'
        ]);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ]);
        }

        $reservation = Reservation::create([
            'service_id' => $request->service_id,
            'reservation_date' => $request->reservation_date,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
            'user_id' => $request->user_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reservation created',
            'data' => new ReservationResource($reservation)
        ]);

    }

    //update

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|numeric',
            'reservation_date' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'message' => 'required',
            'user_id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ]);
        }

        $reservation = Reservation::find($id);

        if ($reservation) {
            $reservation->service_id = $request->service_id;
            $reservation->reservation_date = $request->reservation_date;
            $reservation->email = $request->email;
            $reservation->phone = $request->phone;
            $reservation->message = $request->message;
            $reservation->user_id = $request->user_id;
            $reservation->save();

            return response()->json([
                'success' => true,
                'message' => 'Reservation updated',
                'data' => new ReservationResource($reservation)
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Reservation not found'
            ]);
        }
    }

    //destroy

    public function destroy($id)
    {
        $reservation = Reservation::find($id);

        if ($reservation) {
            $reservation->delete();
            return response()->json([
                'success' => true,
                'message' => 'Reservation deleted'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Reservation not found'
            ]);
        }
    }

    public function paginacija(Request $request)
    {
        $perPage = $request->perPage ? $request->perPage : 3;
        $page = $request->page ? $request->page : 1;

        $reservations = Reservation::paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'message' => 'List of all reservations',
            'data' => $reservations
        ]);
    }

}
