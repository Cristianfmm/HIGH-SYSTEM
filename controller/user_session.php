<?php 

/**
 * 
 */
class UserSession {
	
	public function __construct()
	{
		session_start();
	}

	public function setCurrentUser($id_user,$profile,$type_session)
	{
		$_SESSION['auth'] = "yes";
		$_SESSION["id"] = $id_user;
		$_SESSION["perfil"] = $profile;
		$_SESSION["type_session"] = $type_session;
	}

	public function getCurrentUser()
	{
		return $_SESSION["id"];
	}

	public function getCurrentProfile()
	{
		return $_SESSION["perfil"];
	}

	public function getCurrentTypeSession()
	{
		return $_SESSION["type_session"];
	}
	
	public function getLocationUser($profile)
	{
		if($profile == "1") {
			$path = "rectoria.php";
		}
		else if($profile == "4") {
			$path = "sistemas.php";
		}
		else if($profile == "5") {
			$path = "director/director.php";
		}
		else if($profile == "6") {
			$path = "jefe/jefe.php";
		}
		else if($profile == "7") {
			$path = "generaladmon.php";
		}
		else if($profile == "10") {
			$path = "catedratico.php";
			// $path = "hojadevida/hvida.php";
		}
		else if($profile == "14") {
			$path = " cartera/cartera.php";
		}
		else if($profile == "15") {
			$path = " enfermeria/index.html";
		}
		else if($profile == "21") {
			$path = "actividadessabados/actividades.php";
		}
		else if($profile == "22") {
			$path = "audiovisuales.php";
		}
		else if($profile == "25") {
			$path = "convivencia.php";
		}
		else if($profile == "26") {
			$path = " secre_general.php";
		}
		else if($profile == "27") {
			$path = "listado_rutas.php";
		}
		else if($profile == "28") {
			$path = "listado_rutas.php";
		}
		else if($profile == "43") {
    	// MODULO DE EDNA Y MARCOS
			$path = " activimiercoles/elegir.php";
		}
		else if($profile == "49") {
			$path = "calidad.php";
		}
		else if($profile == "52") {
			$path = "psicologia.php";
		}
		else if($profile == "53") {
			$path = "coorAca.php";
		}
		else if($profile == "58") {
			$path = "r_humanos/r_humanos.php";
		}
		else if($profile == "62") {
			$path = "notas.php";
		}
		else if($profile == "64") {
			$path = "SoporteT/";
		}
		else if($profile == "66") {
			$path = "sonido/sonido.php";
		}
		else if($profile == "69") {
			$path = "library.php";
		}
		else if($profile == "70") {
			$path = "biometrico.php";
		}
		else if($profile == "77") {
			$path = "Mod_AgendasV4/";
		}
		else if($profile == "88") {
			$path = "r_humanos/seleccion.php";
		}
		else if($profile == "98") {
			$path = "mod_asistenciaV9/";
			$path = "assist_student/";
		}
		else if($profile == "889") {
			$path = "mod_extrasabado/";
		}
		else if($profile == "890") {
			$path = "mod_extrasabadoSalidaV7/";
		}
		else if($profile == "99") {
			$path = "encuestas/reportesdg.php";
		}
		else if($profile == "100") {
			$path = "pcf.php";
		}
		else if($profile == "999") {
			$path = "encuestas/Rpt2017dg.php";
		}
		else if($profile == "102") {
			$path = "soporte.php";
		}
		else if($profile == "103") {
			$path = "fotos/fotos_depto.php";
		}
		else if($profile == "104") {
			$path = "circular/envio/elegirtemp.php";
		}
		else if($profile >= "105" && $profile <= "118") {
			$path = "comisionpedagogica.php";
		}
		else if($profile == "354") {
			$path = "Admissions/";
		}
		else if($profile == "13") {
			$path = "secre_general2.php";
		}
		else if($profile == "888") {
			$path = "rectoria_2.php";
		}
		else if($profile == "101") {
			$path = "mod_asistenciaV9/";
		}
		else if($profile == "119") {
			$path = "ingresochef.php";
		}
		else if($profile == "1000") {
			$path = "subirmenu";
		}
		else if($profile == "10001") {
			$path = "subirMenu";
		}
		
		return $path;
	}

	public function closeSession()
	{
	
	 	session_unset();  
		session_destroy();
	}
}

?>