<?php

namespace App\Http\Resources;

use App\Models\Service;
use App\Models\Slot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $service = Service::find($this->service_id);
        $user = User::find($this->user_id);
        $slot = Slot::find($this->slot_id);

        return [
            'id' => $this->id,
            'service' => new ServiceResource($service),
            'reservation_date' => $this->reservation_date,
            'email' => $this->email,
            'phone' => $this->phone,
            'message' => $this->message,
            'user' => new UserResource($user),
            'slot' => new SlotResource($slot)
        ];

    }
}