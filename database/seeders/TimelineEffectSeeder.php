<?php

namespace Database\Seeders;

use App\Models\TimelineEffect;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimelineEffectSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = 5;

        for ($i = 1; $i <= $count; $i++) {
            TimelineEffect::query()->create([
                'name' => "effect-$i",
            ]);
        }
    }
}
