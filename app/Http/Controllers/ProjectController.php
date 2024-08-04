<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\TimelineEffect;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function edit(Project $project): Response
    {
        $project->load('rows.actions');

        $effects = TimelineEffect::query()
            ->select('id', 'name')
            ->get()
            ->keyBy('id')
            ->toArray();

        return Inertia::render('Project/Edit', [
            'project' => $project,
            'effects' => $effects,
        ]);
    }
}
