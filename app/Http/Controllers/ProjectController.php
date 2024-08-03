<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function edit(Project $project): Response
    {
        return Inertia::render('Project/Edit', [
            'project' => $project,
        ]);
    }
}
