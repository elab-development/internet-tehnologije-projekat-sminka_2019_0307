<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slots = [
            [
                'name' => 'Morning Early',
                'times' => '07:00 - 10:00'
            ],
            [
                'name' => 'Morning Late',
                'times' => '10:00 - 12:00'
            ],
            [
                'name' => 'Afternoon',
                'times' => '13:00 - 16:00'
            ],
            [
                'name' => 'Evening',
                'times' => '17:00 - 20:00'
            ]
        ];

        foreach ($slots as $slot) {
            \App\Models\Slot::create($slot);
        }
    }
}