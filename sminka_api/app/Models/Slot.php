<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    use HasFactory;

    public const TABLE = 'slots';

    protected $table = self::TABLE;

    protected $fillable = [
        'name',
        'times'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
