<?php

use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('timeline_rows', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(Project::class)->references('id')->on('projects')->cascadeOnDelete();
            $table->integer('row_height')->nullable();
            $table->boolean('selected')->nullable();
            $table->mediumText('class_names')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timeline_rows');
    }
};
