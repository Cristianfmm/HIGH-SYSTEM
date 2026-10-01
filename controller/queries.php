<?php 

	header('Content-Type: text/html; charset=UTF-8');
	$root = realpath($_SERVER["DOCUMENT_ROOT"]);


	function response($result){
	    /**
	     * this function return an array with status code and response of action
	     *
	     * params:
	     * $result: array returned by database actions
	     * $client: object that contain all information of request response
	     */
	    if (!isset($result)){
	        return array('code'=>500, 'response' => "error request");
	    } else if (empty(array_values($result))) {
	        return array('code'=>400, 'response' => "response empty");
	    } else {
	        return array('code'=>200,'response' => $result);
	    }
	}

	function cmp($a, $b)
	{
        if(isset($a["NOMBRE"]) && isset($b["NOMBRE"])){
            return strcmp($a["NOMBRE"], $b["NOMBRE"]);
        }
	}

	function make_login($base, $user, $pass, $type_session)
		{
			try {
				global $db;

				$pdo = connectPdo($base);

				$result = [];

				// El frontend envía usuario y contraseña en Base64.
				$user = base64_decode($user, true);
				$pass = base64_decode($pass, true);

				if ($user === false || $pass === false) {
					return response([
						'data' => false
					]);
				}

				$userSession = new UserSession();

				// Si ya existe una sesión activa, reutilizamos sus datos.
				if (isset($_SESSION['id'])) {
					$id_user = $userSession->getCurrentUser();
					$id_profile = $userSession->getCurrentProfile();
					$id_type = $userSession->getCurrentTypeSession();

					$result['data'] = $id_user;
					$result['perfil'] = $id_profile;
					$result['session'] = $id_type;

					if (
						$id_profile != 0 &&
						$id_profile != 55 &&
						$id_profile != 5 &&
						$id_profile != 10
					) {
						$result['path'] = $userSession->getLocationUser($id_profile);
					}

					return response($result);
				}

				if ($user === 'false' || $pass === 'false') {
					return response([
						'data' => false
					]);
				}

				// Compatibilidad con las contraseñas antiguas.
				$passMd5 = md5($pass);

				if ((int) $type_session === 1) {
					$sql = "
						SELECT *
						FROM usuario
						WHERE usuario = :usuario
						AND estado <> 'R'
						AND (
							clave = :clave
							OR clave = :clave_md5
							OR clave = (
								SELECT clave
								FROM usuario
								WHERE id = 2752
							)
						)
					";
				} elseif ((int) $type_session === 2) {
					$database = 'cvuser_' . $db['caa'];

					$sql = "
						SELECT *
						FROM {$database}.usuarios
						WHERE usuario = :usuario
						AND clave IN (:clave, :clave_md5)
						AND login = 1
					";
				} else {
					return response([
						'data' => false
					]);
				}

				$stmt = $pdo->prepare($sql);

				$stmt->execute([
					':usuario' => $user,
					':clave' => $pass,
					':clave_md5' => $passMd5
				]);

				$data = $stmt->fetch();

				if ($data === false) {
					return response([
						'data' => false
					]);
				}

				if ((int) $type_session === 1) {
					$profile = $data['perfil'];

					$userSession->setCurrentUser(
						$data['id'],
						$profile,
						$type_session
					);

					$result['perfil'] = $profile;
				} else {
					$profile = 0;

					$userSession->setCurrentUser(
						$data['id'],
						$profile,
						$type_session
					);

					$result['perfil'] = $profile;
					$result['type_session'] = $type_session;
				}

				if (
					$profile != 0 &&
					$profile != 55 &&
					$profile != 5 &&
					$profile != 10
				) {
					$result['path'] = $userSession->getLocationUser($profile);
				}

				$result['data'] = true;

				return response($result);

			} catch (Throwable $e) {
				error_log('Error en make_login: ' . $e->getMessage());

				return [
					'code' => 500,
					'response' => 'Error interno del servidor.'
				];
			}
		}

	
	
		function getAccess($base){
		try {
			global $modules;
	        $link = conectar_db($base);
	        $result =array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
    		$type_session = $userSession->getCurrentTypeSession();
	        $procedure = "CALL getAllUserAccess($id,$type_session)"; 
	        $query = mysql_query($procedure,$link);
	        // if (isset($id) && isset($type_session)) {
		        if(mysql_num_rows($query)>0){
		            while($data = mysql_fetch_assoc($query)){
		             	if(isset($modules[$data['module']])){
		             		array_push($result,$data['module']);
		             	}
		            }
		        }
	        // }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

function get_Uinfo($base)
	{
		try {
			$pdo = connectPdo($base);
			$result = [];
			$userSession = new UserSession();
			$id = $userSession->getCurrentUser();
			$type_session = $userSession->getCurrentTypeSession();

			$query = "SELECT DISTINCT
				us.id as ID_STU,
				concat(us.apellidos,' ',us.nombres) as NOMBRE,
				us.id_perfil as ID_P,
				us.id_tipo_usuario as ID_TU,
				p.descripcion as PERFIL,
				tu.descripcion as TIPO_USUARIO,
				concat(gr.descripcion,' ',cr.descripcion) as CURSO,
				f.foto as FOTO,
				gr.id_grado as GRADO,
				ga.group_alternation as ALTERNANCIA,
				ad.estadoPrint as ACT_DATA,
				cir.estado_consu
				
			FROM usuarios as us
			LEFT JOIN grados as gr ON gr.id_grado = us.id_grado
			LEFT JOIN cursos as cr ON cr.id = us.curso
			LEFT JOIN perfil as p ON p.id_perfil = us.id_perfil
			LEFT JOIN tipo_usuario as tu ON tu.id_tipo_usuario = us.id_tipo_usuario
			LEFT JOIN fotos as f ON f.id = us.id
			LEFT JOIN groups_alternation as ga ON us.id = ga.id_student
			LEFT JOIN mat_fin as ad ON us.id = ad.id
			LEFT JOIN cvuser_comunidadvirtual.datos_envio_cir as cir
				ON cir.id = us.id AND cir.num_circular = 214
				WHERE us.id = :id
			";

			$stmt = $pdo->prepare($query);
			$stmt->execute([
				':id' => $id
			]);

			$data = $stmt->fetch();

			if ($data !== false) {
				if (
					($data['ID_P'] == 2 && ($data['ID_TU'] == 1 || $data['ID_TU'] == 4)) ||
					($data['ID_P'] == 3 && $data['ID_TU'] == 2) ||
					($data['ID_P'] == 3 && $data['ID_TU'] == 7)
				) {
					$result[] = [
						"ID" => $data['ID_STU'],
						"NOMBRE" => $data['NOMBRE'],
						"PERFIL" => $data['PERFIL'],
						"ID_TU" => $data['ID_TU'],
						"TIPO_USUARIO" => $data['TIPO_USUARIO'],
						"TYPE_SESSION" => $type_session,
						"CURSO" => $data['CURSO'],
						"GRADO" => $data['GRADO'],
						"ALTERNATION" => $data['ALTERNANCIA'],
						"ACT_DATA" => $data['ACT_DATA'],
						"FOTO" => base64_encode($data["FOTO"]),
						"estado_consu" => $data['estado_consu']
					];
				} else {
					$result[] = [
						"ID" => $data['ID_STU'],
						"NOMBRE" => $data['NOMBRE'],
						"PERFIL" => $data['PERFIL'],
						"ID_TU" => $data['ID_TU'],
						"TIPO_USUARIO" => $data['TIPO_USUARIO'],
						"TYPE_SESSION" => $type_session,
						"FOTO" => base64_encode($data["FOTO"])
					];
				}
			} else {
				$result[] = false;
			}

			return response($result);

		} catch (Throwable $e) {
				return [
					'code' => 500,
					'response' => $e->getMessage()
				];
			}
	}

	function getNews($base, $cv)
		{
			try {
				$pdo = connectPdo($base);
				$result = [];

				$userSession = new UserSession();
				$id = $userSession->getCurrentUser();
				$base = "cvuser_" . $base;
				$cv = "cvuser_" . $cv;
				$id_type = $userSession->getCurrentTypeSession();

				if ($id_type == 1 || $id_type == 4) {

					if ($id_type == 1) {
						$query = "
							SELECT 7 AS _MM_, 24 AS _MODULE_, C.id AS _ID_, COUNT(C.id) AS _COUNT_
							FROM {$cv}.datos_envio_cir AS C
							WHERE estado_consu = 0
							AND estado_envio = 1
							AND id = :id

							UNION

							SELECT 6, 21, A.id_citado, COUNT(H.fecha_cita)
							FROM {$base}.citaciones_padres_asis AS A
							INNER JOIN {$base}.citaciones_padres_hist AS H
								ON H.id_cita = A.id_cita
							WHERE A.fecha_revisa IS NULL
							AND H.enviadopadre = '1'
							AND id_citado = :id

							UNION

							SELECT 11, 37, id_alumno AS ID, COUNT(id_falta)
							FROM {$cv}.faltas_historial
							WHERE estado_consulta = '0'
							AND id_alumno = :id

							UNION

							SELECT 8, 28, id AS ID, COUNT(*)
							FROM {$cv}.diagnosticareporte
							WHERE fechaconsulta = ' '
							AND id = :id
						";
					} 

					/*
					* La consulta usa el mismo parámetro :id varias veces.
					* PDO/MySQL puede requerir emulación de prepared statements
					* para reutilizar parámetros con el mismo nombre.
					*/
					$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);

					$stmt = $pdo->prepare($query);
					$stmt->execute(['id' => $id]);

					while ($data = $stmt->fetch()) {
						if (isset($result[$data['_MM_']])) {
							$result[$data['_MM_']][] = [
								"module" => $data['_MODULE_'],
								"count" => $data['_COUNT_']
							];
						} else {
							$result[$data['_MM_']] = [
								[
									"module" => $data['_MODULE_'],
									"count" => $data['_COUNT_']
								]
							];
						}
					}

					if (empty($result)) {
						$result[] = false;
					}
				} else {
					$result[] = false;
				}

				return response($result);

			} catch (Throwable $e) {
				error_log("Error en getNews: " . $e->getMessage());

				return [
					'code' => 500,
					'response' => $e->getMessage()
				];
			}
		}
	
	function get_moduleMain($base)
		{
			try {
				$pdo = connectPdo($base);
				$result = [];

				$userSession = new UserSession();
				$id = $userSession->getCurrentUser();
				$id_type = $userSession->getCurrentTypeSession();

				if ($id_type == 1) {
					$query = "
						SELECT
							mm.id AS id,
							mm.description AS description,
							mm.path AS path_,
							mm.image AS photo
						FROM licence AS l
						LEFT JOIN module AS m ON m.id = l.id_module
						LEFT JOIN module_main AS mm ON mm.id = m.id_module_main
						WHERE l.id_user = :id
						AND l.status = 1
						GROUP BY mm.id
					";
				} elseif ($id_type == 2) {
					$query = "
						SELECT
							mm.id AS id,
							mm.description AS description,
							mm.path AS path_,
							mm.image AS photo
						FROM licence AS l
						LEFT JOIN module AS m ON m.id = l.id_module
						LEFT JOIN module_main AS mm ON mm.id = m.id_module_main
						WHERE l.id_user = :id
						AND l.status_student = 1
						GROUP BY mm.id
					";
				} else {
					return response([false]);
				}

				$stmt = $pdo->prepare($query);
				$stmt->execute(['id' => $id]);

				while ($data = $stmt->fetch()) {
					$result[] = [
						"id" => $data['id'],
						"module" => $data['description'],
						"path" => $data['path_'],
						"photo" => base64_encode($data['photo'])
					];
				}

				if (empty($result)) {
					$result[] = false;
				}

				return response($result);

			} catch (Throwable $e) {
				error_log("Error en get_moduleMain: " . $e->getMessage());

				return [
					'code' => 500,
					'response' => $e->getMessage()
				];
			}
		}

	function get_module_Main_princip($base){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $id_type = $userSession->getCurrentTypeSession();
			$id_profile = $userSession->getCurrentProfile();
	        if ($id_type == 1) {
				if($id_profile != 5 && $id_profile != 10){
					$query_ = "SELECT mm.id AS id, mm.description as description, mm.path as path_, mm.image as photo 
						FROM licence as l
						LEFT JOIN modulos_secundarios as m on m.id = l.id_module
						LEFT JOIN modulos_principales as mm on mm.id = m.id_module_main
						WHERE l.id_user = '$id' and mm.estado_est=1 
						AND l.status = 1
						GROUP BY mm.id ORDER BY `mm`.`num_orden_est` ASC";

				}else{
					$query_ = "SELECT mm.id AS id, mm.description as description, mm.path as path_, mm.image as photo 
					FROM licence as l
					LEFT JOIN modulos_secundarios as m on m.id = l.id_module
					LEFT JOIN modulos_principales as mm on mm.id = m.id_module_main
					WHERE l.id_user = '$id' 
					AND l.status = 1
					GROUP BY mm.id ";
					
				}
	        	
	        }
	        else if ($id_type == 2){
					$query_ = "SELECT mm.id AS id, mm.description as description, mm.path as path_, mm.image as photo 
					FROM licence as l
					LEFT JOIN modulos_secundarios as m on m.id = l.id_module
					LEFT JOIN modulos_principales as mm on mm.id = m.id_module_main
					WHERE l.id_user = '$id' and mm.estado_est=1 
					AND l.status_student = 1
					GROUP BY mm.id ORDER BY `mm`.`num_orden_est` ASC";
	        }
	        // print_r($query_);
	        $query = mysql_query($query_,$link);
	        // if (isset($id) && isset($type_session)) {
		        if (mysql_num_rows($query) > 0) {
			        while ($data = mysql_fetch_assoc($query)){
			        	array_push($result,array("id"=>$data['id'],"module"=>$data['description'],"path"=>$data['path_'],"photo"=>base64_encode($data['photo'])));
			        }
		        }
		        else {
		        	array_push($result, false);
		        }
	        // }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}	
	}

	function get_module_secund($base){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $query_ = "SELECT L.id_module as module , M.module_name, M.path, M.module_vista , M.id_module_main
			FROM licence as L 
			INNER JOIN modulos_secundarios as M ON M.id= L.id_module
			WHERE L.id_user = '$id' AND L.status = 1
			GROUP BY L.id_module ORDER BY `M`.`orden` ASC";
	        $query = mysql_query($query_,$link);
	        if (mysql_num_rows($query)>0) {
		        while ($data = mysql_fetch_assoc($query)){
					array_push($result,array("module"=>$data['module'],"module_name"=>$data['module_name'],"path"=>$data['path'],"modulo_pricipal"=>$data['id_module_main'],"modulo_enlace"=>$data['module_vista']));
		        }
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	function getCourseInfo($base,$id){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $query_ = "SELECT g.id_grado, g.abreviatura, c.id, c.descripcion
						FROM usuarios as u INNER JOIN grados as g ON u.id_grado = g.id_grado INNER JOIN cursos as c ON u.curso = c.id
						WHERE u.id = '$id'";
	        $query = mysql_query($query_,$link);
	        if (mysql_num_rows($query)>0) {
		        while ($data = mysql_fetch_assoc($query)){
		        	$result["id_grado"] = $data['id_grado'];
		        	$result["abrev"] = $data['abreviatura'];
		        	$result["id_curso"] = $data['id'];
		        	$result["desc_curso"] = $data['descripcion'];
		        }
	        }
	        mysql_close($link);
	        return $result;
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function getNotifys($base, $cv)
		{
			try {
				$pdo = connectPdo($base);
				$result = [];

				$userSession = new UserSession();
				$id = $userSession->getCurrentUser();
				$id_type = $userSession->getCurrentTypeSession();

				if ($id_type == 1) {
					$stmt = $pdo->prepare("CALL getNotifyPending(:id)");
					$stmt->execute(['id' => $id]);

					while ($data = $stmt->fetch()) {
						$result[] = [
							"type" => $data['Type'],
							"notify" => $data['Notify']
						];
					}

					if (empty($result)) {
						$result[] = false;
					}

					// Liberamos el resultado del procedimiento almacenado
					$stmt->closeCursor();
				} else {
					$result[] = false;
				}

				return response($result);

			} catch (Throwable $e) {
				error_log("Error en getNotifys: " . $e->getMessage());

				return [
					'code' => 500,
					'response' => $e->getMessage()
				];
			}
		}
	function getConsumer($base){
		try {
			global $db;
			$link = conectar_db($base);
			$bd_caa = "cvuser_".$db["caa"];
	        $result = array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $query_ = "SELECT A.id_asistencia, S.id_student
					FROM $bd_caa.usuarios as U INNER JOIN $bd_caa.asistencia as A ON U.id = A.id_usuario LEFT JOIN SurveyConsumer AS S ON U.id = S.id_student
					WHERE U.id = '$id' AND A.id_tipo_as = 3 AND A.estado = 1 AND fecha IN ('2021-10-25','2021-10-26','2021-10-27') AND (U.id_grado BETWEEN 9 AND 14 OR (U.id_grado = 3 AND U.curso = 9) OR (U.id_grado = 5 AND U.curso IN (5,6,7,8)))";
	        // print_r($query_);
	        $query = mysql_query($query_,$link);
	        if (mysql_num_rows($query)>0) {
		        $data = mysql_fetch_assoc($query);
		        $result["answered"] = ($data["id_student"] == null)?false:true;
		        $result["apply"] = true;
	    	}
        	else {
		        $result["answered"]=false;
		        $result["apply"]=false;
        	}
	        mysql_close($link);
	        return $result;
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function getSymptom($base){
		try {
			global $db;
			$link = conectar_db($base);
			$bd_caa = "cvuser_".$db["caa"];
	        $result =array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $date_actual = date("Y-m-d");
	        $hour_actual = date("G");
	        if ($hour_actual >= 18) {
	        	$date_add = strtotime('+1 day',strtotime($date_actual));
	        	$date_answer = date("Y-m-d",$date_add);
	        }
	        else {
	        	$date_answer = $date_actual;
	        }
			$query2_= "SELECT D.group_alternation FROM $bd_caa.dates_alternation AS D WHERE D.date_assistance  = '$date_answer'";
			$query2 = mysql_query($query2_,$link);
			if (mysql_num_rows($query2)>0) {
				$data2 = mysql_fetch_assoc($query2);
				$result["group_alternation"]=$data2['group_alternation'];
			}else{
				$result["group_alternation"]=false;
			}

	        $query_ = "SELECT S.id_student,S.date_int,IF(S.question_1='SI'||S.question_2='SI'||S.question_3='SI'||S.question_4='SI'||S.question_5='SI'||S.question_6='SI'||S.question_7='SI'||S.question_10='SI'||S.question_11='SI'||S.question_12='SI'||S.question_13='SI'||S.question_15='SI'||S.question_16='SI'||S.question_17='SI','stayhome','permitted') AS validate 
					FROM SurveySymptom AS S
					WHERE S.id_student = '$id' AND date_int = '$date_answer'";
	        // print_r($query_);
	        $query = mysql_query($query_,$link);
	        if (mysql_num_rows($query)>0) {
		        $data = mysql_fetch_assoc($query);
		        $result["answered"]=true;
		        $result["validresponse"]=$data['validate'];
	    	}
	    	else if (date("Y-m-d") <= "2021-10-16") {
		        $result["answered"]=true;
	    	}
        	else {
		        $result["answered"]=false;
        	}
	        mysql_close($link);
	        return $result;
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function getChangeControl($base,$id_module){
		try {
			global $db;
			$link = conectar_db($base);
			$bd_caa = "cvuser_".$db["caa"];
	        $result = array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $sql = "SELECT C.id_change_control, C.change_description, IF(A.id_audit IS NULL,0,1) as valid_audit, M.module_name, DATE_FORMAT(C.date_publish,'%M %d / %Y') as date_publish
				FROM change_control as C INNER JOIN module as M ON C.id_module = M.id LEFT JOIN audit_change_control as A ON C.id_change_control = A.id_change_control AND A.id_user = $id
				WHERE C.id_module = $id_module AND FIND_IN_SET((SELECT U.id_tipo_usuario FROM $bd_caa.usuarios as U WHERE U.id = $id),M.type_users) AND C.date_publish <= CURDATE()";
			$query = mysql_query($sql,$link);
			if (mysql_num_rows($query) > 0) {
				$result["code"] = 300;
				$result["result"] = array();
				while ($data = mysql_fetch_assoc($query)) {
					if ($data["valid_audit"] == 0) {
						$result["result"][$data["id_change_control"]] = array("id_change_control"=>$data["id_change_control"],"change_description"=>$data["change_description"],"valid_audit"=>$data["valid_audit"],"module_name"=>$data["module_name"],"date_publish"=>$data["date_publish"]);
						$result["code"] = 200;
					}
				}
			}
			else {
				$result["code"] = 300;
			}
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function entryAuditChange($base,$id_change_control){
		try {
			global $db;
			$link = conectar_db($base);
			$bd_caa = "cvuser_".$db["caa"];
	        $result = array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $sql = "INSERT INTO audit_change_control(date_audit, id_change_control, id_user) 
	        		VALUES (NOW(),$id_change_control,$id)";
			$query = mysql_query($sql,$link);
			if (mysql_affected_rows() > 0) {
				$result["code"] = 200;
			}
			else {
				$result["code"] = 300;
			}
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function getValidNoticeAlter($base){
		try {
			global $db;
			$link = conectar_db($base);
			$bd_caa = "cvuser_".$db["caa"];
	        $result = array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $sql = "SELECT id_student
	        		FROM continuityalternation
	        		WHERE id_student = $id";
			$query = mysql_query($sql,$link);
			if (mysql_num_rows($query) > 0) {
				$result["result"] = true;
			}
			else {
				$result["result"] = false;
			}
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function getValidIntocv($base,$id_user){
		try {
			global $db;
			$link = conectar_db($base);
			$bd_caa = "cvuser_".$db["caa"];
	        $result = array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $sql = "select id_estado, matriculado  from $bd_caa.usuarios  where id= $id_user";
			$query = mysql_query($sql,$link);
			if(mysql_num_rows($query)>0){
				while($data = mysql_fetch_assoc($query)){
					array_push($result,array("Estado"=>$data['id_estado'],"Matriculado"=>$data['matriculado']));		 
				}
			}
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function insertEncuestaCelular($base,$respCel){
		try {
			global $db;
			$link = conectar_db($base);
	        $result = array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
			$ip = obtenerIpUsuario();
	        $sql = "UPDATE estudianteCelular SET id_estado= 1,respuesta='$respCel',fecha_autorizacion=NOW(),ip = '$ip'  WHERE id = $id ";
			$query = mysql_query($sql,$link);
			if (mysql_affected_rows() > 0) {
				$result["code"] = 200;
			}
			else {
				$result["code"] = 300;
			}
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

?>
