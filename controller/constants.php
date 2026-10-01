<?php

$db_caa = 'caa' . date('Y');

$db = [
    'caa' => $db_caa,
    'comunidad' => 'comunidadvirtual',
    'r' => 'roles',
    'encuestas' => 'encuestas',
    'evaluations' => 'evaluations',
    'curriculum' => 'curriculum'
];

function getAllModules(): array
{
    global $db;

    $pdo = connectPdo($db['r']);

    $stmt = $pdo->query(
        'SELECT id, module_name FROM module'
    );

    $modules = [];

    while ($row = $stmt->fetch()) {
        $modules[(int) $row['id']] = $row['module_name'];
    }

    return $modules;
}

$modules = getAllModules();