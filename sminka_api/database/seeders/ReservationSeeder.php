<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 1; $i <= 10; $i++) {
            \App\Models\Reservation::create([
                'user_id' => $i,
                'service_id' => $faker->numberBetween(1, 6),
                'reservation_date' => $faker->dateTimeBetween('now', '+1 month'),
                'email' => $faker->email(),
                'phone' => $faker->phoneNumber,
                'message' => $faker->sentence,
            ]);
        }
    }
}
