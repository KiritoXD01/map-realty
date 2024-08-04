<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TimelineRow extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'row_height',
        'selected',
        'class_names',
    ];

    protected $casts = [
        'selected' => 'boolean',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function actions(): HasMany
    {
        return $this->hasMany(TimelineRowAction::class);
    }
}
