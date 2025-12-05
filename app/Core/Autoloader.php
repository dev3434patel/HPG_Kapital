<?php

namespace App\Core;

class Autoloader
{
    private static $basePath;

    public static function load($className)
    {
        // Get base path (php-version directory)
        // From app/Core/Autoloader.php, go up 2 levels
        if (!isset(self::$basePath)) {
            self::$basePath = dirname(__DIR__, 2);
        }

        // Remove namespace prefix
        $className = str_replace('App\\', '', $className);
        
        // Convert namespace to file path
        $file = self::$basePath . '/app/' . str_replace('\\', '/', $className) . '.php';

        if (file_exists($file)) {
            require_once $file;
            return true;
        }

        return false;
    }
}

