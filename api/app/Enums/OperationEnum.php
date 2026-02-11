<?php

namespace App\Enums;

enum OperationEnum: string
{
    case GENERATIVE_FILL = 'generative_fill';
    case RESTORE = 'restore';
    case RECOLOR = 'recolor';
    case REMOVE_OBJECT = 'remove_object';

    public function credits(): int
    {
        return match ($this) {
            self::GENERATIVE_FILL => 322,
            self::RESTORE => 226,
            self::RECOLOR => 127,
            self::REMOVE_OBJECT => 228,
        };
    }

    public static function listOfCredits(): array
    {
        return  [
            self::GENERATIVE_FILL->value => self::GENERATIVE_FILL->credits(),
            self::RESTORE->value => self::RESTORE->credits(),
            self::RECOLOR->value => self::RECOLOR->credits(),
            self::REMOVE_OBJECT->value => self::REMOVE_OBJECT->credits(),
          
    ];
    }
}