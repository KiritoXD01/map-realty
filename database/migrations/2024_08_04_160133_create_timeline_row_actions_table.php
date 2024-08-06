<?php

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
        Schema::create('timeline_row_actions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('timeline_row_id')->references('id')->on('timeline_rows')->cascadeOnDelete();
            $table->integer('start');
            $table->integer('end');
            $table->foreignUuid('effect_id')->references('id')->on('timeline_effects');
            $table->boolean('selected')->nullable();
            $table->boolean('flexible')->nullable();
            $table->boolean('movable')->nullable();
            $table->boolean('disable')->nullable();
            $table->integer('min_start')->nullable();
            $table->integer('max_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timeline_row_actions');
    }
};
