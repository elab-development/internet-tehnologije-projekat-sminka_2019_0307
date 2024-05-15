<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    public const TABLE = 'services';

    protected $table = self::TABLE;

    protected $fillable = [
        'name',
        'price',
        'description',
        'type_id'
    ];

    public function type()
    {
        return $this->belongsTo(Type::class);
    }


}
