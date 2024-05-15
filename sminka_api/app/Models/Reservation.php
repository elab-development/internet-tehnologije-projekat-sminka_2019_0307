<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    public const TABLE = 'reservations';

    protected $table = self::TABLE;

    protected $fillable = [
        'service_id',
        'reservation_date',
        'user_id',
        'email',
        'phone',
        'message'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
