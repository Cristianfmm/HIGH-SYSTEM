function login(user=false,pass=false,type_session=false){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {
            base:"comunidad",
            param:"login",
            user:btoa(user),
            pass:btoa(pass),
            type_session
        }
    });
}

// Bootstrap 5: helpers para abrir y cerrar modales sin depender del plugin jQuery.
function showModal(id, options = {}) {
    const modalElement = document.getElementById(id);

    if (!modalElement || typeof bootstrap === "undefined") {
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement, options);
    modal.show();
}

function hideModal(id) {
    const modalElement = document.getElementById(id);

    if (!modalElement || typeof bootstrap === "undefined") {
        return;
    }

    const modal = bootstrap.Modal.getInstance(modalElement);

    if (modal) {
        modal.hide();
    }
}

function userInfo(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {
            base:"caa",
            param:"getInfo"
        }
    });
}

function moduleViews(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {
            base:"r",
            param:"getMain"
        }
    });
}

function getNews(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {
            base:"caa",
            param:"getNews"
        }
    });
}

function pendingNotify(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {
            base:"caa",
            param:"getNotifys"
        }
    });
}

function closeSession(){
    return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {
            base:"caa",
            param:"closeSession"
        }
    });
}


function getValidSymptom(){
	return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"getSymptom"}
    });	
}

function getValidConsumer(){
	return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"getConsumer"}
    });	
}

function getValidNoticeAlter(){
	return $.ajax({
        url: 'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"getValidNoticeAlter"}
    });	
}

function sendSurveySymptomm(question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,question_16,question_17,question_18){
    return $.ajax({
        url: 'NoticesV24/controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"sendSurveySymptom",question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,question_16,question_17,question_18}
    });
}

function sendSurveyConsumer(question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9){
    return $.ajax({
        url: 'NoticesV24/controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"sendSurveyConsumer",question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9}
    });
}

function getValidIntocv(id_user){
	return $.ajax({
		url: 'controller/cont.php',
		type: 'POST',
		dataType: 'json',
		data: {base:"comunidad",param:"get_Valid_Intocv",id_user}
	});
}


function sendContinuityAlternation(num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12){
    return $.ajax({
        url: 'NoticesV24/controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {base:"encuestas",param:"continuityAlternation",num_survey,course,question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12}
    });
}

function insertEncuestaCelular(respCel){
	return $.ajax({
		url: 'controller/cont.php',
		type: 'POST',
		dataType: 'json',
		data: {base:"encuestas",param:"insertEncuestaCelular",respCel}
	});
}


function optionRadioYN(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	console.log('opcion_id');
	console.log(option_id);
	if (option_id == "question_6") {
		if (option == "SI") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else {
			$("#div_"+option_id).addClass('d-none');
			$("#div_"+option_id).find('textarea').val("");
		}
	}else if (option_id == "question_7"){
		if (option == "NO") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else {
			$("#div_"+option_id).addClass('d-none');
			$("#div_"+option_id).find('textarea').val("");
		}
	}
}
function optionRadioNY(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');

	if (option_id == "question_9" || option_id == "question_7") {
		if (option == "SI") {
			$("#div_"+option_id).removeClass('d-none');
		}
		else {
			$("#div_"+option_id).addClass('d-none');
		}
	}
}
function optionRadio_1_2(object){
	var option = $(object).attr('data-val');
	var option_id = $(object).find('input').attr('name');
	console.log(option_id);
	if (option == "1"||option == "2") {
		$("#div_"+option_id).removeClass('d-none');
		if (option == "2"){
			$("#div_question_1_2").removeClass('d-none');
		}else{
			$("#div_question_1_2").addClass('d-none');

		}
	}
	else {
		$("#div_"+option_id).addClass('d-none');
		$("#div_"+option_id).find('textarea').val("");
	}
}

function notifySpecial() {
	console.log("Notify Special");
	var title = 'Comunicado:';
	var content = '<p class="card-justify"><a href="/circular/ver_circular/cambio.php?num=60&amp;ano=2020" target="_blank">Prevención COVID-19 "Coronavirus".</a></p>';
	//$("#titleModalNot").text('Notificaciones Pendientes');
	$("#titleModalNot").text('ALERTA!');
	$("#section_one .part_one").load("views/cardNotify.html",function() {
		$("#section_one .part_one").removeClass('col-md-6');
		$("#section_one .part_one").addClass('col-md-12');
		$("#section_one .part_one #titleCard").append('<h5 class="card-title">'+title+'</h5>');
		$("#section_one .part_one #bodyCard").append('<p class="card-text">'+content+'</p></h5>');
	});
	//$('#ModalNotify').modal({backdrop: 'static', keyboard: false})
	showModal("ModalNotify");
}

function notifyActData() {
	console.log("Notify Message");
	var title = 'Notificación:';
	
	//var content = '<p class="card-justify">Les recordamos que el módulo de actualización de datos para el proceso de matrícula de su hijo(a) año 2022, estará habilitado hasta el 04 de octubre.</p><p class="card-justify"><a href="Admissions/?mod=actInfo"><u>Haga clic aquí para realizar la Actualización de Datos</u></a></p>';
	//var content = '<p class="card-justify">Apreciados Padres de Familia:</p><p class="card-justify">Les informamos que del lunes 26 de Abril al viernes 7 de mayo se realizar&aacute;n las clases de manera virtual a través de la plataforma Microsoft Teams para todos los estudiantes del colegio.</p>';
	//$("#titleModalNot").text('Notificaciones Pendientes');
	$("#titleModalNot").text('AVISO IMPORTANTE!');
	// $("#section_one").before('<div id="section_four"><div class="part_seven"></div></div>');
	$("#section_four .part_seven").load("views/cardNotify.html",function() {
		$("#section_four .part_seven").removeClass('col-md-6');
		$("#section_four .part_seven").addClass('col-md-12');
		$("#section_four .part_seven #titleCard").append('<h5 class="card-title">'+title+'</h5>');
		$("#section_four .part_seven #bodyCard").append('<p class="card-text">'+content+'</p></h5>');
	});
	//$('#ModalNotify').modal({backdrop: 'static', keyboard: false})
	showModal("ModalNotify");	
}


function notifyfirma() {
	console.log("Notify Message");
	var title = 'Notificación: <b>Firma Electrónica</b>';
	var content = '<p class="card-center">Les informamos que el último plazo para firmar la matrícula es el <b>jueves 5 de diciembre </b> Agradecemos su atención y les solicitamos completar este trámite antes de la fecha indicada.<br/> De clic en el siguiente link para comentar el proceso <a href="AdmissionsV19.6/?mod=electronic_signature"><u>firma electrónica.</u></a></u></a></p>';
	$("#titleModalNot").text('Notificaciones Pendientes');
	$("#titleModalNot").text('AVISO IMPORTANTE!');
	/* $("#section_one").before('<div id="section_four"><div class="part_seven"></div></div>'); */
	$("#section_four .part_seven").load("views/cardNotify.html",function() {
		$("#section_four .part_seven").removeClass('col-md-6');
		$("#section_four .part_seven").addClass('col-md-12');
		$("#section_four .part_seven #titleCard").css('background', 'yellow');
		$("#section_four .part_seven #titleCard").append('<h5 class="card-title" style="color: black">'+title+'</h5>');
		$("#section_four .part_seven #bodyCard").append('<p class="card-text">'+content+'</p></h5>');
		
	});
	$('#ModalNotify').modal({backdrop: 'static', keyboard: false}) 
	showModal("ModalNotify");	
}

function notifyMessageAlert() {
	console.log("Notify Message");
	var title = 'Notificación: <b>Notificacion</b>';
	var content = '<p class="card-center">Apreciados padres de familia, el día de hoy 7 de noviembre la salida de los estudiantes se realizará a las 2:30 p.m.  Se enviará una circular con información sobre los cambios en el calendario teniendo en cuenta las incidencias de las lluvias en nuestras actividades. Agradecemos su colaboración.</p>';
	//var content = '<p class="card-justify">Apreciados Padres de Familia:</p><p class="card-justify">Les informamos que del lunes 26 de Abril al viernes 7 de mayo se realizar&aacute;n las clases de manera virtual a través de la plataforma Microsoft Teams para todos los estudiantes del colegio.</p>';
	$("#titleModalNot").text('Notificaciones Pendientes');
	$("#titleModalNot").text('AVISO IMPORTANTE!');
	/* $("#section_one").before('<div id="section_four"><div class="part_seven"></div></div>'); */
	$("#section_four .part_seven").load("views/cardNotify.html",function() {
		$("#section_four .part_seven").removeClass('col-md-6');
		$("#section_four .part_seven").addClass('col-md-12');
		$("#section_four .part_seven #titleCard").css('background', 'yellow');
		$("#section_four .part_seven #titleCard").append('<h5 class="card-title" style="color: black">'+title+'</h5>');
		$("#section_four .part_seven #bodyCard").append('<p class="card-text">'+content+'</p></h5>');
		
	});
	$('#ModalNotify').modal({backdrop: 'static', keyboard: false}) 
	showModal("ModalNotify");	
}


function notifyMessageCir() {
	console.log("Notify Message");
	var title = 'Notificación:';
	var content = '<p class="card-justify">Los invitamos a contestar la Encuesta Preescolar de clic<a href="NoticesV24/?mod=surveys"><u> aquí</u></a></p>';
	//var content = '<p class="card-justify">Apreciados Padres de Familia:</p><p class="card-justify">Les informamos que del lunes 26 de Abril al viernes 7 de mayo se realizar&aacute;n las clases de manera virtual a través de la plataforma Microsoft Teams para todos los estudiantes del colegio.</p>';
	$("#titleModalNot").text('Notificaciones Pendientes');
	$("#titleModalNot").text('AVISO IMPORTANTE!');
	/* $("#section_one").before('<div id="section_four"><div class="part_seven"></div></div>'); */
	$("#section_four .part_seven").load("views/cardNotify.html",function() {
		$("#section_four .part_seven").removeClass('col-md-6');
		$("#section_four .part_seven").addClass('col-md-12');
		$("#section_four .part_seven #titleCard").append('<h5 class="card-title">'+title+'</h5>');
		$("#section_four .part_seven #bodyCard").append('<p class="card-text">'+content+'</p></h5>');
	});
	/* $('#ModalNotify').modal({backdrop: 'static', keyboard: false}) */
	showModal("ModalNotify");	
}

function notifyMessage() {

	console.log("Notify Message");
	var title = 'Notificación:';
	var content = '<p class="card-justify">Para ingresar a la clase virtual, haga clic en el link "Clase Virtual", la cual se encuentra a la derecha de la opción "Buscar Módulo".</p>';
	//var content = '<p class="card-justify">Apreciados Padres de Familia:</p><p class="card-justify">Les informamos que del lunes 26 de Abril al viernes 7 de mayo se realizar&aacute;n las clases de manera virtual a través de la plataforma Microsoft Teams para todos los estudiantes del colegio.</p>';
	//$("#titleModalNot").text('Notificaciones Pendientes');
	$("#titleModalNot").text('AVISO IMPORTANTE!');
	//$("#section_one").before('<div id="section_four"><div class="part_seven"></div></div>');
	$("#section_four .part_seven").load("views/cardNotify.html",function() {
	$("#section_four .part_seven").removeClass('col-md-6');
	$("#section_four .part_seven").addClass('col-md-12');
	$("#section_four .part_seven #titleCard").append('<h5 class="card-title">'+title+'</h5>');
	$("#section_four .part_seven #bodyCard").append('<p class="card-text">'+content+'</p></h5>');
	});
	//$('#ModalNotify').modal({backdrop: 'static', keyboard: false})
	showModal("ModalNotify");	
}

function notifyBill() {
	console.log("Notify Special");
	var title = 'Comunicado:';
	var content = '<p class="card-justify">Les informamos que ya se envió a sus correos la factura electrónica por concepto de costos educativos del mes de octubre.  Adicionalmente está habilitado el botón de pagos  PSE; el recibo para su consulta lo encontrará en el módulo de Cartera de la Comunidad Virtual.</p>';
	//$("#titleModalNot").text('Notificaciones Pendientes');
	$("#titleModalNot").text('Notificación!');
	$("#section_one .part_one").load("views/cardNotify.html",function() {
		$("#section_one .part_one").removeClass('col-md-6');
		$("#section_one .part_one").addClass('col-md-12');
		$("#section_one .part_one #titleCard").append('<h5 class="card-title">'+title+'</h5>');
		$("#section_one .part_one #bodyCard").append('<p class="card-text">'+content+'</p></h5>');
	});
	//$('#ModalNotify').modal({backdrop: 'static', keyboard: false})
	showModal("ModalNotify");	
}

function surveySymptom(){
	$("#titleModalNot").text("ENCUESTA DE VERIFICACIÓN DE SÍNTOMAS DIARIA");
	$("#bodyTagNot").load("NoticesV24/views/adminView/surveySymptom22.html",function(){
		
		$(".optionQuestionYES").click(function(e) {
			optionRadioYN($(this));
			e.preventDefault();
		});
		$("#btnModalLarge").prop("onclick", null).off("click");
		$("#btnModalLarge").click(function(e) {
			var question_1 = $(".question_1.active").data('val');
			var question_2 = $(".question_2.active").data('val');
			var question_3 = $(".question_3.active").data('val');
			var question_4 = $(".question_4.active").data('val');
			var question_5 = $(".question_5.active").data('val');
			var question_6 = $(".question_6.active").data('val');
			var question_7 = $(".question_7.active").data('val');
			var question_8 = $(".question_8.active").data('val');
			var question_9 = $(".question_9.active").data('val');
			var question_10 = $(".question_10.active").data('val');
			var question_11 = $(".question_11.active").data('val');
			var question_12 = $(".question_12.active").data('val');
			var question_13 = $(".question_13.active").data('val');
			var question_14 = $(".question_14.active").data('val');
			var question_15 = $(".question_15.active").data('val');
			var question_16 = $(".question_16.active").data('val');
			var question_17 = $(".question_17.active").data('val');
			var question_18 = $(".question_18.active").data('val');

			
			var observation = $("#observation").val();
			var valid = validFormActData([
						{'data':question_1,'item':'question_1','type':'radio', 'obligatory':false},
						{'data':question_2,'item':'question_2','type':'radio', 'obligatory':false},
						{'data':question_3,'item':'question_3','type':'radio', 'obligatory':false},
						{'data':question_4,'item':'question_4','type':'radio', 'obligatory':false},
						{'data':question_5,'item':'question_5','type':'radio', 'obligatory':false},
						{'data':question_6,'item':'question_6','type':'radio', 'obligatory':false},
						{'data':question_7,'item':'question_7','type':'radio', 'obligatory':false},
						{'data':question_8,'item':'question_8','type':'radio', 'obligatory':false},
						{'data':question_9,'item':'question_9','type':'radio', 'obligatory':false},
						{'data':question_10,'item':'question_10','type':'radio', 'obligatory':false},
						{'data':question_11,'item':'question_11','type':'radio', 'obligatory':false},
						{'data':question_12,'item':'question_12','type':'radio', 'obligatory':false},
						{'data':question_13,'item':'question_13','type':'radio', 'obligatory':false},
						//{'data':question_14,'item':'question_14','type':'radio', 'obligatory':false},
						{'data':question_15,'item':'question_15','type':'radio', 'obligatory':false},
						{'data':question_16,'item':'question_16','type':'radio', 'obligatory':false},
						{'data':question_17,'item':'question_17','type':'radio', 'obligatory':false},
						{'data':question_18,'item':'question_18','type':'radio', 'obligatory':false}
						
						]);
			var validSave = true;
			if (valid["validate"]) {
				
				$("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);
				let send_SurveySymptom = sendSurveySymptomm(question_1,question_2,question_3,question_4,question_5,question_6,question_7,question_8,question_9,question_10,question_11,question_12,question_13,question_14,question_15,question_16,question_17,question_18);
				$.when(send_SurveySymptom).done(function(response){
					console.log(response);
					$("#btnModalLarge").html('Guardar <i class="fa fa-floppy-o" aria-hidden="true"></i>');
					$("#btnModalLarge").removeAttr('disabled');
					$(".labelCheck").remove();
					$(".celValue").each(function() {
						$(this).removeClass('labelInvalid');
						$(this).addClass('labelValid');
						$(this).append('<span class="labelCheck"><i class="fa fa-check-circle" aria-hidden="true"></i></span>');
						$(this).removeClass("animated infinite pulse");
					});
					hideModal("ModalNotify");

					location.reload();

				}).fail(function(response){
					console.log("fail Parents Pres");
					console.log(response);
				});
			}
			else {
				validSave = false;
				$(".labelCheck").remove();
				$(".celValue").each(function() {
					$(this).removeClass('labelValid');
					$(this).removeClass('labelInvalid');
					$(this).removeClass('animated infinite pulse');
				});
				$.each(valid['items'],function(key,label) {
					$("#label_"+label).addClass('labelInvalid');
					$("#label_"+label).append('  <span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
					$("#label_"+label).addClass("animated infinite pulse");
					$("#"+label).focus();
					$("."+label).focus();
				});
			}
			e.preventDefault();
		});
	});
	$("#buttons_action_large").removeClass("d-none");
	// bloquea clic afuera de la encuesta 
	/*$('#ModalNotify').modal({backdrop: 'static', keyboard: false})*/
	showModal("ModalNotify");
}

function notifyBillAdd() {
	console.log("Notify Special");
	$("#section_one").before('<div id="section_special"><div class="part_special"></div></div>');
	var title = 'Comunicado:';
	var content = '<p class="card-justify">Les informamos que ya se envió a sus correos la factura electrónica por concepto de costos educativos del mes de octubre.  Adicionalmente está habilitado el botón de pagos  PSE; el recibo para su consulta lo encontrará en el módulo de Cartera de la Comunidad Virtual.</p>';
	//$("#titleModalNot").text('Notificaciones Pendientes');
	$("#titleModalNot").text('Notificación!');
	$("#section_special .part_special").load("views/cardNotify.html",function() {
		$("#section_special .part_special").removeClass('col-md-6');
		$("#section_special .part_special").addClass('col-md-12');
		$("#section_special .part_special #titleCard").append('<h5 class="card-title">'+title+'</h5>');
		$("#section_special .part_special #bodyCard").append('<p class="card-text">'+content+'</p></h5>');
	});	
}


function loadView(info,modules,news,notifys){
	$("body").addClass('animated zoomIn slower');
	$("#bodyPage").load("views/mainView.html",function(){
		$("#modalView").load("views/modalClose.html");
 
		if (info[0]["ID_TU"] == "2") {
 
			if (info[0]["firma"] == 'sinfirma' && info[0]["GRADO"] != 14) {
				notifyfirma();
			}
 
			let validSymptom = getValidSymptom();
			let validConsumer = getValidConsumer();
			let validNotice = getValidNoticeAlter();
			$("#link_clases").removeClass("d-none");
 
			$.when(validSymptom,validNotice,validConsumer).done(function(respSymptom,respNotice,respConsumer){
				if (info[0]["ALTERNATION"] == 4 && respConsumer[0]['answered'] == false && respConsumer[0]['apply'] == true) {
					// surveyConsumer();
				}
				$("#course").parent().after('<div class="w-150"><span class="badge badge-primary">Les informamos que la LISTA DE ÚTILES se encuentra en el<br><br>"Módulo de <b>Información</b>". <br></span></div>');
			}).fail(function(response){
				console.log(response);
			});
		}
		else if ((info[0]["ID_TU"] == "4" && notifys[0] != false) || (info[0]["ID_TU"] == "1" && notifys[0] != false)) {
			$("#titleModalNot").text('Notificaciones Pendientes');
			var cant_mensaj = 0, cant_mensaj1 = 0;
			$.each(notifys, function(index, value) {
				if (value["type"] == "Mensajes2") cant_mensaj1++;
				if (value["type"] == "Mensajes") cant_mensaj++;
			});
		}
 
		// ---- Cerrar sesión ----
		$("#closeView").off("click.close").on("click.close", function(event) {
			event.preventDefault();
			$("#titleModal").text('Cerrar Sesión');
			$("#bodyTag").text('Seguro desea salir?');
			$("#btnModal").removeAttr('disabled');
			showModal("ModalClose");
			$("#btnModal").off("click").on("click", function(e) {
				e.preventDefault();
				closeSession().done(function(response){ console.log(response); })
				              .fail(function(response){ console.log(response); });
				$("#btnModal").attr('disabled', true);
				$("#btnModal").html("Saliendo   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				setTimeout(function(){ location.reload(); }, 1000);
			});
		});
 
		$(".content-wrapper").css("background-color","rgba(0,0,0,0)");
 
		// ---- Tarjeta de usuario ----
		var image = "data:image/jpeg;base64," + info[0]['FOTO'];
		$("#image").attr("src", image);
		$("#cardInfo").find("#name").text(info[0]["NOMBRE"]);
		$("#cardInfo").find("#profile").text(info[0]["TIPO_USUARIO"]);
		$("#headerUserImage").attr("src", image);
		$("#headerUserName").text(info[0]["NOMBRE"]);
		$("#headerUserProfile").text(info[0]["TIPO_USUARIO"]);
		$("#profileInfo").text(info[0]["TIPO_USUARIO"]);
		$("#courseInfo").text(info[0]["CURSO"] ?? "-");
		if (info[0]["CURSO"] == null) {
			$("#cardInfo").find("#dis").addClass('d-none');
		} else {
			$("#cardInfo").find("#course").text(info[0]["CURSO"]);
			$("#cardInfo").find("#dis").removeClass('d-none');
		}
 
		// ---- MÓDULOS: MISMA FUENTE para menú izquierdo y tarjetas ----
		var $grid = $("#cardModules").find(".bodyCard").empty();
		var $side = $("#sidebarModules").empty();
		var totalNews = 0;
 
		$.each(modules, function(index, val) {
 
			var counterNews = 0;
			if (news && news[val["id"]]) {
				$.each(news[val["id"]], function(i, newsItem) {
					counterNews += parseInt(newsItem["count"]) || 0;
				});
			}
			totalNews += counterNews;
 
			var name = val["module"];
			var path = val["path"];
			var img  = "data:image/jpeg;base64," + val["photo"];
 
			// Tarjeta (derecha). Se arma con jQuery para no inyectar HTML de la BD.
			var $card = $("<a class='hs-module-card' target='_blank'></a>").attr("href", path);
			var $imgBox = $("<div class='hs-module-image'></div>")
				.append($("<img>").attr({src: img, alt: name}));
			if (counterNews > 0) {
				$imgBox.append($("<span class='hs-module-badge'></span>").text(counterNews));
			}
			var $content = $("<div class='hs-module-content'></div>")
				.append($("<h4></h4>").text(name))
				.append("<p>Accede al módulo para consultar su información.</p>")
				.append("<span class='hs-module-button'>Ingresar <i class='fa fa-arrow-right'></i></span>");
			$card.append($imgBox, $content);
			$grid.append($("<div class='hs-module-item'></div>").append($card));
 
			// Ítem del menú (izquierda), mismo módulo, mismo enlace, mismo contador
			var $item = $("<a class='hs-nav-item hs-side-module' target='_blank'></a>")
				.attr("href", path)
				.append($("<i class='fa'></i>").addClass(moduleIcon(name)))
				.append($("<span></span>").text(name));
			if (counterNews > 0) {
				$item.append($("<em class='hs-nav-badge'></em>").text(counterNews));
			}
			$side.append($item);
		});
 
		$("#navCount").text(modules.length || "");
		if (!modules.length) {
			$side.html("<div class='hs-nav-empty'>No hay módulos disponibles</div>");
		}
 
		// Campana del header = total de novedades reales
		if (totalNews > 0) {
			$("#notifTotal").text(totalNews > 99 ? "99+" : totalNews).removeClass("d-none");
		}
 
		// ---- Filtro ----
		$("#filter").off("keyup").on("keyup", function(){
			filterModules($(this).val());
		});
 
	});
}

function satisfac_mensaje(nivel){
	var tipo= nivel.value.split("-");
	var codigo =  tipo[0]
	var nivel = parseInt(tipo[1]);
	let  actionEntry = submit_nivel_satisf(codigo,nivel)
	$.when(actionEntry).done(function (response) {
		if(nivel>0){
			$("#divsatis"+codigo).html("<div class='text-center'> <i class='fa fa-spinner fa-spin' style='font-size:70px; color:#06295D'></i><div>Guardando");
		}else{
			$("#divEnterad"+codigo).html("<div class='text-center'> <i class='fa fa-spinner fa-spin' style='font-size:70px; color:#06295D'></i><div>Guardando");
		}
		setTimeout(function(){
			location.reload();
		}, 2000);
	}).fail(function (response) {
		$("#divsatis"+codigo).html(
			"<div class='text-center'> <i class='fa fa-spinner fa-spin' style='font-size:70px; color:#06295D'></i><div>Guardando"
		  );
		setTimeout(function(){
			location.reload();
			
		}, 2000);
	});
	


}

function filterModules(filter){
	filter = (filter || "").toLowerCase().trim();
 
	$("#cardModules .hs-module-item").each(function(){
		var name = $(this).find(".hs-module-content h4").text().toLowerCase();
		$(this).toggle(name.indexOf(filter) !== -1);
	});
 
	$("#sidebarModules .hs-side-module").each(function(){
		var name = $(this).find("span").first().text().toLowerCase();
		$(this).toggle(name.indexOf(filter) !== -1);
	});
}

function viewPrincipal(){
	$("#modalNotify").load("views/modalNotify2.html");
	let user, modules, news, notifys;
	user = userInfo();
	modules = moduleViews();
	news = getNews();
	notifys = pendingNotify();

	$.when(user,modules,news,notifys).done(function(responseInfo,responseMod,responseNews,responseNot){
		$("#bodyPage").animate({opacity:0},"slow",function(){
			let tag = "#bodyPage";
			$(tag).children().remove();
			$(tag).css("opacity",50);
			loadView(responseInfo[0]["response"],responseMod[0]["response"],responseNews[0]["response"],responseNot[0]["response"]);
			//showModal("ModalNotify");
		});

	}).fail(function(response){
		console.log("fail...");
		console.log(response);
	});
}

$(document).ready(function() {
    login().done(function(response){
        if (response["code"] == 200) {

            if (response["response"]["data"] == false) {

                $("#bodyPage").load("views/login.html",function(){

                    var date = new Date();
                    $("#year").text(date.getFullYear());
                    $("#inputUser").focus();

                    $(".type_session").off("click").on("click", function(e){
                        e.preventDefault();

                        $(".type_session").removeClass("active");
                        $(".type_session input[type=radio]").prop("checked", false);

                        $(this).addClass("active");
                        $(this).find("input[type=radio]").prop("checked", true);
                    });

                    $("#form_login").submit(function(e){

                        var us = $("#inputUser").val();
                        var pass = $("#inputPassword").val();
                        var type_session = $(".type_session.active").data('val');

                        $("#btnSubmit").text("");
                        $("#btnSubmit").html("Ingresando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
                        $("#btnSubmit").attr('disabled', true);
                        $("#loader").addClass('loader');

                        if(us.includes('-') || us.includes('@') || us.includes(' ') || us.includes('´')){

                            alert("Datos Incorrectos");

                        }else{

                            login(us,pass,type_session).done(function(response){

                                console.log(response);

                                if(
                                    response['code'] == 200 &&
                                    response["response"]["data"] != false &&
                                    (
                                        response["response"]["perfil"] == 0 ||
                                        response["response"]["perfil"] == 55 ||
                                        response["response"]["perfil"] == 10 ||
                                        response["response"]["perfil"] == 5 ||
                                        response["response"]["perfil"] == 16
                                    )
                                ){
                                    viewPrincipal();
                                    console.log("Entro a perfil 0");
                                }
                                else if(
                                    response['code'] == 200 &&
                                    response["response"]["data"] != false &&
                                    response["response"]["perfil"] != 0
                                ){
                                    console.log(response["response"]["path"]);
                                    console.log("Entro a perfil Diferente 0");
                                    location.href = response["response"]["path"];
                                }
                                else if(
                                    response['code'] == 200 &&
                                    response["response"]["data"] == false
                                ){
                                    message = {
                                        "400":"Intente de Nuevo",
                                        "service":"Usuario y/o contraseña incorrectos."
                                    };

                                    toastr_message(400,message);

                                    $("#btnSubmit").attr('disabled', false);
                                    $("#btnSubmit").text("Ingresar");
                                }

                            }).fail(function(response){

                                console.log("fail");
                                console.log(response);

                            });

                            e.preventDefault();
                        }
                    });

                    $("#buttonPass").click(function(){

                        console.log("alert pass");

                        alert("Para recuperar la contraseña de la Comunidad Virtual por favor comuníquese con el departamento de Sistemas Tel: 6694181 Ext. 135 o al siguiente Correo: Sistemas@caa.edu.co");

                    });

                });

            }else if(
                response["response"]["data"] != "false" &&
                (
                    response["response"]["perfil"] == 0 ||
                    response["response"]["perfil"] == 55 ||
                    response["response"]["perfil"] == 10 ||
                    response["response"]["perfil"] == 5 ||
                    response["response"]["perfil"] == 16
                )
            ){

                $("#bodyPage").load("views/viewLoading.html",function(){

                    $("#loader").html("<i class='fa fa-spinner fa-spin' style='font-size:48pt; color: white;'></i>");

                });

                viewPrincipal();

            }else if(
                response["response"]["data"] != "false" &&
                response["response"]["perfil"] != 0
            ){

                console.log(response["response"]["path"]);

                var path_location = response["response"]["path"];

                $("#bodyPage").load("views/viewLoading.html",function(){

                    $("#loader").html("<i class='fa fa-spinner fa-spin' style='font-size:48pt; color: white;'></i>");

                });

                location.href = path_location;
            }
        }

    }).fail(function(response){

        console.log(response);

    });
});

function validar(e) {
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }

    // Patrón de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function GuardaEncuesta(btnCel){
	var message = {"400":"Seleccione alguna de las opciones","200":"Enviado"}
	var respCel = ($('input[name=btnCel]:checked').val() == undefined)?"":$('input[name=btnCel]:checked').val();
	var valid = validFormActData([{'data':respCel,'item':'respCel','type':'radio', 'obligatory':true}]);
	if (valid["validate"]) {
		$("#InsertCel").html("Enviando respuesta   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
		$("#InsertCel").attr('disabled', true);
		var insertEncuestaCel = insertEncuestaCelular(respCel);
		$.when(insertEncuestaCel).done(function(response){
			console.log(response);
			$("#InsertCel").html('Enviado <i class="fa fa-floppy-o" aria-hidden="true"></i>');
			$("#InsertCel").removeAttr('disabled');
			hideModal("ModalNotify");
			location.reload();
		}).fail(function(response){
			console.log("fail Parents Pres");
			console.log(response);
		}); 
	}
	else {
		toastr_message(400,message);
	}
}

function moduleIcon(name){
    var n = (name || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var map = [
        [/academ|nota|calific|boletin|horario/, "fa-graduation-cap"],
        [/circular/, "fa-file-lines"],
        [/mensaj|comunic|correo/, "fa-comments"],
        [/cartera|pago|factur|financ/, "fa-credit-card"],
        [/deport/, "fa-person-running"],
        [/inform/, "fa-circle-info"],
        [/calend|agenda/, "fa-calendar"],
        [/biblio|libro/, "fa-book"],
        [/admis|matric/, "fa-user-plus"],
        [/salud|enferm/, "fa-heart-pulse"],
        [/transport|ruta/, "fa-bus"],
        [/cafeter|restaur|almuerzo/, "fa-utensils"],
        [/aula|clase|curso/, "fa-chalkboard-user"]
    ];
    for (var i = 0; i < map.length; i++) {
        if (map[i][0].test(n)) return map[i][1];
    }
    return "fa-cube";
}