<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimelineRowAction extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'start',
        'end',
        'effect_id',
        'selected',
        'flexible',
        'movable',
        'disable',
        'min_start',
        'max_end',
    ];

    protected $casts = [
        'selected' => 'boolean',
        'flexible' => 'boolean',
        'movable' => 'boolean',
        'disable' => 'boolean',
    ];

    public function row(): BelongsTo
    {
        return $this->belongsTo(TimelineRow::class);
    }
}
