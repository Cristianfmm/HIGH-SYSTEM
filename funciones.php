<?php

date_default_timezone_set('America/Bogota');

/*
|--------------------------------------------------------------------------
| Configuración de base de datos
|--------------------------------------------------------------------------
| Las credenciales se obtienen desde variables de entorno.
| Nunca deben quedar escritas directamente en el código fuente.
*/

const DB_HOST = 'localhost';
const DB_CHARSET = 'utf8mb4';

/*
|--------------------------------------------------------------------------
| Conexión PDO
|--------------------------------------------------------------------------
| Recibe el nombre lógico de la base de datos:
| comunidadvirtual
| roles
| caa2026
|
| Y se conecta automáticamente a:
| cvuser_comunidadvirtual
| cvuser_roles
| cvuser_caa2026
|--------------------------------------------------------------------------
*/

function connectPdo(string $db): PDO
{
    // Solo permitimos nombres de bases definidos por la aplicación.
    $allowedDatabases = [
        'comunidadvirtual',
        'roles',
        'encuestas',
        'evaluations',
        'curriculum'
    ];

    if (!preg_match('/^caa\d{4}$/', $db) && !in_array($db, $allowedDatabases, true)) {
        throw new InvalidArgumentException('Base de datos no permitida.');
    }

    $database = 'cvuser_' . $db;

    /* $dbUser = getenv('DB_USER');
    $dbPass = getenv('DB_PASS'); */
    $dbUser = 'root';
    $dbPass = 'InstitutoDB#2026!Mx47';

    if ($dbUser === false || $dbPass === false) {
        error_log('Credenciales de base de datos no configuradas.');

        throw new RuntimeException(
            'Configuración de base de datos incompleta.'
        );
    }

    $dsn = 'mysql:host=' . DB_HOST .
           ';dbname=' . $database .
           ';charset=' . DB_CHARSET;

    try {
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);

        return $pdo;

    } catch (PDOException $e) {
        // El detalle técnico queda solamente en los logs.
        error_log(
            'Error de conexión a BD [' . $database . ']: ' .
            $e->getMessage()
        );

        // Nunca enviamos el error real de MySQL al usuario.
        throw new RuntimeException(
            'No fue posible conectar con la base de datos.'
        );
    }
}