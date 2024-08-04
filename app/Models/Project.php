<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rows(): HasMany
    {
        return $this->hasMany(TimelineRow::class);
    }

    protected static function booted(): void
    {
        static::creating(function (Project $project) {
            $project->uuid = Str::uuid();
        });
    }

    public function resolveRouteBinding($value, $field = null): ?Model
    {
        return $this
            ->where('uuid', $value)
            ->orWhere('id', $value)
            ->firstOrFail();
    }
}
