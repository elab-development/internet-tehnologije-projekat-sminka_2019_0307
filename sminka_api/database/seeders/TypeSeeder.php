<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'Haircut',
            'Makeup',
            'Nails',
            'Skin Care',
            'Massage',
        ];

        foreach ($types as $type) {
            \App\Models\Type::create([
                'type_name' => $type,
            ]);
        }
    }
}
