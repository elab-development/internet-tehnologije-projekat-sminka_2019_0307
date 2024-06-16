<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\Models\Slot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
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
            'user_id' => 'required|numeric',
            'slot_id' => 'required|numeric'
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
            'user_id' => $request->user_id,
            'slot_id' => $request->slot_id
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
            'user_id' => 'required|numeric',
            'slot_id' => 'required|numeric'
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
            $reservation->slot_id = $request->slot_id;
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

    public function paginate(Request $request)
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

    public function getFreeSlotsForReservationDate(Request $request)
    {
        $date = new \DateTime($request->date);

        $slots = Slot::all();

        $reservations = Reservation::where('reservation_date', date('Y-m-d', $date->getTimestamp()))->get();

        $reservedSlots = $reservations->map(function ($reservation) {
            return $reservation->slot_id;
        });

        $arrayFreeSlots = [];

        foreach ($slots as $slot) {
            if (!$reservedSlots->contains($slot->id)) {
                $arrayFreeSlots[] = $slot;
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'List of free slots for reservation date',
            'data' => $arrayFreeSlots
        ]);
    }

    public function getReservationsForUser($id)
    {
        $reservations = Reservation::where('user_id', $id)->get();

        return response()->json([
            'success' => true,
            'message' => 'List of reservations for user',
            'data' => ReservationResource::collection($reservations)
        ]);
    }
}