<?php

require_once __DIR__ . '/../funciones.php';
require_once __DIR__ . '/user_session.php';
require_once __DIR__ . '/constants.php';
require_once __DIR__ . '/queries.php';

/*
|--------------------------------------------------------------------------
| Configuración HTTP
|--------------------------------------------------------------------------
*/

header('Content-Type: application/json; charset=UTF-8');

// Este controlador solamente acepta peticiones POST.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'code' => 405,
        'error' => 'Método no permitido.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Funciones auxiliares
|--------------------------------------------------------------------------
*/

/**
 * Genera una respuesta JSON segura.
 */
function jsonResponse(array $data, int $status = 200): void
{
    http_response_code($status);

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    exit;
}

/**
 * Obtiene un valor POST.
 */
function postValue(string $key): ?string
{
    if (!isset($_POST[$key]) || !is_string($_POST[$key])) {
        return null;
    }

    return trim($_POST[$key]);
}

/**
 * Valida que una base exista dentro de la configuración.
 */
function validateBase(?string $base): bool
{
    global $db;

    return $base !== null && isset($db[$base]);
}

/**
 * Procesa el inicio de sesión.
 */
function post_log(
    ?string $base_,
    ?string $user,
    ?string $pass,
    ?string $type_session
): void {
    try {
        global $db;

        if (
            !validateBase($base_) ||
            $user === null ||
            $pass === null ||
            $type_session === null
        ) {
            jsonResponse([
                'code' => 400,
                'error' => 'Solicitud inválida.',
                'is_logged' => false
            ], 400);
        }

        echo json_encode(
            make_login(
                $db[$base_],
                $user,
                $pass,
                $type_session
            ),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        exit;

    } catch (Throwable $e) {
        error_log('Error en post_log: ' . $e->getMessage());

        jsonResponse([
            'code' => 500,
            'error' => 'Error interno del servidor.',
            'is_logged' => false
        ], 500);
    }
}

/**
 * Obtiene la información del usuario autenticado.
 */
function get_UserInfo(?string $base_): void
{
    try {
        global $db;

        if (!validateBase($base_)) {
            jsonResponse([
                'code' => 400,
                'error' => 'Solicitud inválida.',
                'is_logged' => false
            ], 400);
        }

        echo json_encode(
            get_Uinfo($db[$base_]),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        exit;

    } catch (Throwable $e) {
        error_log('Error en get_UserInfo: ' . $e->getMessage());

        jsonResponse([
            'code' => 500,
            'error' => 'Error interno del servidor.',
            'is_logged' => false
        ], 500);
    }
}

/**
 * Obtiene los módulos principales.
 */
function post_modules(?string $base_): void
{
    try {
        global $db;

        if (!validateBase($base_)) {
            jsonResponse([
                'code' => 400,
                'error' => 'Solicitud inválida.',
                'is_logged' => false
            ], 400);
        }

        echo json_encode(
            get_moduleMain($db[$base_]),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        exit;

    } catch (Throwable $e) {
        error_log('Error en post_modules: ' . $e->getMessage());

        jsonResponse([
            'code' => 500,
            'error' => 'Error interno del servidor.',
            'is_logged' => false
        ], 500);
    }
}

/**
 * Obtiene las noticias.
 */
function get_news(?string $base_): void
{
    try {
        global $db;

        if (!validateBase($base_)) {
            jsonResponse([
                'code' => 400,
                'error' => 'Solicitud inválida.',
                'is_logged' => false
            ], 400);
        }

        echo json_encode(
            getNews(
                $db[$base_],
                $db['comunidad']
            ),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        exit;

    } catch (Throwable $e) {
        error_log('Error en get_news: ' . $e->getMessage());

        jsonResponse([
            'code' => 500,
            'error' => 'Error interno del servidor.',
            'is_logged' => false
        ], 500);
    }
}

/**
 * Obtiene las notificaciones pendientes.
 */
function get_notifys(?string $base_): void
{
    try {
        global $db;

        if (!validateBase($base_)) {
            jsonResponse([
                'code' => 400,
                'error' => 'Solicitud inválida.',
                'is_logged' => false
            ], 400);
        }

        echo json_encode(
            getNotifys(
                $db[$base_],
                $db['comunidad']
            ),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        exit;

    } catch (Throwable $e) {
        error_log('Error en get_notifys: ' . $e->getMessage());

        jsonResponse([
            'code' => 500,
            'error' => 'Error interno del servidor.',
            'is_logged' => false
        ], 500);
    }
}

/**
 * Cierra la sesión actual.
 */
function close_session(): void
{
    try {
        $userSession = new UserSession();
        $userSession->closeSession();

        jsonResponse([
            'code' => 200,
            'response' => true
        ]);

    } catch (Throwable $e) {
        error_log('Error en close_session: ' . $e->getMessage());

        jsonResponse([
            'code' => 500,
            'error' => 'Error interno del servidor.',
            'is_logged' => false
        ], 500);
    }
}

/*
|--------------------------------------------------------------------------
| Enrutamiento
|--------------------------------------------------------------------------
*/

$param = postValue('param');

switch ($param) {

    case 'login':
        post_log(
            postValue('base'),
            postValue('user'),
            postValue('pass'),
            postValue('type_session')
        );
        break;

    case 'getMain':
        post_modules(
            postValue('base')
        );
        break;

    case 'getInfo':
        get_UserInfo(
            postValue('base')
        );
        break;

    case 'getNews':
        get_news(
            postValue('base')
        );
        break;

    case 'getNotifys':
        get_notifys(
            postValue('base')
        );
        break;

    case 'closeSession':
        close_session();
        break;

    default:
        jsonResponse([
            'code' => 400,
            'error' => 'Parámetro no válido.'
        ], 400);
}