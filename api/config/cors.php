<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['*'],

    'allowed_methods' => ['*'],

    // 'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],/

    'allowed_origins' => [
        'http://localhost:8081',    // Your current Expo Web origin
        'http://localhost:19006',   // Common Expo Web (legacy)
        'http://172.20.10.3:8081',  // For accessing via LAN IP
        'http://localhost:3000',    // If you need to keep a legacy/other origin
        env('FRONTEND_URL'),        // Will resolve to one of the above if set, or can be removed if not needed.
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];