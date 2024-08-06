<?php

namespace App\Listeners;

use App\DTOs\AddActionToRowDTO;
use App\Models\TimelineRowAction;
use Laravel\Reverb\Events\MessageReceived;

class BroadcastMessage
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageReceived $event): void
    {
        $eventData = json_decode($event->message, true);

        if ($eventData['event'] === 'SendMessage') {
            $data = (array) json_decode($eventData['data'], true);
            $dataDTO = AddActionToRowDTO::fromArray($data);

            TimelineRowAction::query()
                ->create([
                    'timeline_row_id' => $dataDTO->rowId,
                    'start' => intval($dataDTO->time),
                    'end' => intval($dataDTO->time) + 5,
                    'effect_id' => $dataDTO->effectId,
                ]);
        }
    }
}
