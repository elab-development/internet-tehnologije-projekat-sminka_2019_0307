<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Haircut long',
                'price' => 10,
                'description' => 'Haircut for long hair',
                'type_id' => 1,
            ],
            [
                'name' => 'Haircut short',
                'price' => 5,
                'description' => 'Haircut for short hair',
                'type_id' => 1,
            ],
            [
                'name' => 'Makeup',
                'price' => 15,
                'description' => 'Makeup for special events',
                'type_id' => 2,
            ],
            [
                'name' => 'Nails',
                'price' => 20,
                'description' => 'Manicure and pedicure',
                'type_id' => 3,
            ],
            [
                'name' => 'Skin Care',
                'price' => 25,
                'description' => 'Facial treatment',
                'type_id' => 4,
            ],
            [
                'name' => 'Massage',
                'price' => 30,
                'description' => 'Full body massage',
                'type_id' => 5,
            ]
        ];

        foreach ($services as $service) {
            \App\Models\Service::create($service);
        }
    }
}
