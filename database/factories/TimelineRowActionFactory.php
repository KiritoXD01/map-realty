<?php

namespace Database\Factories;

use App\Models\TimelineEffect;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TimelineRowAction>
 */
class TimelineRowActionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'start' => fake()->numberBetween(0, 10),
            'end' => fake()->numberBetween(10, 20),
            'effect_id' => TimelineEffect::factory()->create()->id,
            'selected' => fake()->boolean(),
            'flexible' => fake()->boolean(),
            'movable' => fake()->boolean(),
            'disable' => fake()->boolean(),
            'min_start' => fake()->numberBetween(0, 10),
            'max_end' => fake()->numberBetween(10, 20),
        ];
    }
}
