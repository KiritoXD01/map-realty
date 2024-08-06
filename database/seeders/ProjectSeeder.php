<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\TimelineRow;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::query()->get();

        $users->each(function (User $user) {
            $projects = Project::factory()
                ->count(3)
                ->create([
                    'user_id' => $user->id,
                ]);

            $projects->each(function (Project $project) {
                $project->rows()->create(TimelineRow::factory()->make()->toArray());
            });
        });
    }
}
