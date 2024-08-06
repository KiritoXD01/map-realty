<?php

namespace App\DTOs;

use WendellAdriel\ValidatedDTO\SimpleDTO;

class AddActionToRowDTO extends SimpleDTO
{
    public string $rowId;

    public float $time;

    public string $effectId;

    protected function defaults(): array
    {
        return [];
    }

    protected function casts(): array
    {
        return [];
    }
}
