<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    public const TABLE = 'types';

    protected $table = self::TABLE;

    protected $fillable = [
        'type_name'
    ];

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
