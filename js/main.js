function sleep(milliseconds) {
    console.log("sleeping");
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function createSelect(array_, class_,type, multiple =false,selected="--"){
    var select = "";
    var selected_ = "";
    var multiple = (multiple)?"multiple='multiple'":"";
    if(type == 1){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+">"; //<option value='--'>--</option>
        select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_, function(key, value) {
            //selected_ = (selected != "--" && selected.indexOf(value['id'])!=-1)?"selected":"";
            selected_ = (selected != "--" && selected == value['id'])?"selected":"";
            select = select + '<option class="temp" value="'+value['id']+'" '+selected_+'>'+value['description']+'</option>';
        });
        var select =select + "</select>";
    }
    else if(type == 2){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+">"; //<option value='--'>--</option>
        select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_,function(key,value){
            for (var i = 1; i <= value.length; i++) {
                select = select + '<option class="temp" value="'+key+'-'+i+'">'+value[i-1]+'</option>';
            }   
        });
        var select =select + "</select>";
    }

    else if(type == 3){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+">"; //<option value='--'>--</option>
        //select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_,function(index,value){
            $.each(value,function(key,value_){
                select = select + '<optgroup label="'+key+'"></optgroup>';
                $.each(value_,function(a,b){
                    selected_ = (selected != "--" && selected.indexOf(b['id'])!=-1)?"selected":"";
                    select = select + '<option class="temp" value="'+b['id']+'" '+selected_+'>'+b['description']+'</option>';
                })
            })
        });
        var select =select + "</select>";
    }
    if(type == 4){
        var select = "<select class='form-control novelty form-control-sm "+class_+"'><option value='--'>--</option>";
        $.each(array_, function(key, value) {
            selected_ = (selected == key && selected != "--")?"selected":"";
            select = select + '<option class="temp" value="'+key+'" '+selected_+'>'+value+'</option>';
        });
        select =select + "</select>";
    }
    else if(type == 5){
        var select = "<select mutiple data-style='bg-gray rounded-pill px-4 py-3 shadow-sm '' class='selectpicker w-5 "+class_+"' "+multiple+">";
        $.each(array_,function(a,b){
            selected_ = (selected != "--" && selected.indexOf(b['id'])!=-1)?"selected":"";
            select = select + '<option class="temp" value="'+b['id']+'" '+selected_+'>'+b['description']+'</option>';
        })
        var select =select + "</select>";
    }
    else if(type == 6){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+">"; //<option value='--'>--</option>
        select = select+"<option value='--' selected>--</option>";
        $.each(array_, function(key, value) {
            //selected_ = (selected != "--" && selected.indexOf(value['id'])!=-1)?"selected":"";
            selected_ = (selected != "--" && selected == value['id'])?"selected":"";
            select = select + '<option class="temp" value="'+value['id']+'" '+selected_+'>'+value['description']+'</option>';
        });
        var select =select + "</select>";
    }
    else if(type == 7){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+">"; //<option value='--'>--</option>
        //select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_,function(key,value_){
            select = select + '<optgroup label="'+key+'"></optgroup>';
            $.each(value_,function(a,b){
                selected_ = (selected != "--" && selected.indexOf(b['id'])!=-1)?"selected":"";
                select = select + '<option class="temp" value="'+b['id']+'" '+selected_+'>'+b['description']+'</option>';
            })
        })
        var select =select + "</select>";
    }
    else if(type == 8){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' "+multiple+">"; //<option value='--'>--</option>
        select = (selected == "--" && !multiple)?select+"<option value='--' selected>--</option>":select;
        $.each(array_, function(key, value) {
            selected_ = (selected != "--" && selected == value['id'])?"selected":"";
            class_ = (value['status'] == 1)?"checkComplete":"";
            select = select + '<option class="temp '+class_+'" value="'+value['id']+'" '+selected_+'>'+value['description']+'</option>';
        });
        var select =select + "</select>";
    }
    else if(type == 9){
        var select = "<select class='form-control novelty form-control-sm "+class_+"' disabled><option value='--'>--</option>";
        $.each(array_, function(key, value) {
            selected_ = (selected == key && selected != "--")?"selected":"";
            select = select + '<option class="temp" value="'+key+'" '+selected_+'>'+value+'</option>';
        });
        select =select + "</select>";
    }
    return select;
    
}

function createRadio(array_, class_, name_, checked_opt=-1){
    var cont = 1;
    var radio = "<div class='btn-group radioBtn' data-toggle='buttons'>";
    var checked_ = "";
    var active = "";
    $.each(array_,function(key,value){
        checked_ = (key == checked_opt)? "checked":"";
        active = (key == checked_opt)?" active":"";
        
        radio = radio + "<label class='btn btn-outline-info btn-sm "+class_+active+"' id='opt"+cont+"'><input class='form-control' type='radio' data-val='"+key+"' name='"+name_+"' id='option"+cont+"' "+checked_+"'>"+value+"</label>";
        cont += 1;
    });
    var radio =radio + "</div>";
    return radio;
}

function vertical_timeLine(array_,class_){
    var timeline = "<ul class='timeline' style='width:100%; overflow:auto !important'>";
    var title = "";
    var s_title = "";
    var body ="";
    var fecha = "";
    $.each(array_,function(index, object){
        title = "";
        if(object["ENFASIS"] != null){
            s_title ="ENFASIS"
            title = object["ENFASIS"];
            fecha = object["FECHA"];
            body = object["OBSERVACION"]
        }
        if(object["ACTIVIDAD"] != null){
            s_title ="ACTIVIDAD"
            title = object["ACTIVIDAD"];
            fecha = object["ACT_F"];
            body = object["OBSERVACION"]
        }
        if(object["PREGRADO"] != null){
            s_title ="PREGRADO"
            title = object["PREGRADO"];
            fecha = object["FECHA"];
            body = object["OBSERVACION"]
        }
        timeline = timeline + "<li> <div class='timeline-image'><img class='img-circle img-responsive' src='' alt=''></div> ";
        timeline = timeline + "<div class='timeline-panel'><div class='timeline-heading'><h4>"+title+"</h4><h4 class='subheading'>"+s_title+" "+fecha+"</h4></div><div class='timeline-body'><p class='text-muted'>"+body+"</p></div></div>";
        timeline = timeline + "<div class=line></div></li>";
    });
    timeline = timeline+"</ul>";
    return timeline;
}

function horizontal_timeLine(array_,class_){
    var timeline = "<ul class='timeline timeline-horizontal' style='width:100%; overflow:auto !important'>";
    var title = "";
    var s_title = "";
    var body ="";
    var fecha = "";
    var color = "";
    var icon = "";

    $.each(array_,function(index, object){
        title = "";
        color = (object['COLOR']!=null)?object['COLOR']:"";
        icon = (object['COLOR']!=null)?object['ICONO']:"";
        if(object["ENFASIS"] != null){
            s_title ="ÉNFASIS"
            title = object["ENFASIS"];
            fecha = object["FECHA"];
            body = object["TIPO"];
        }
        if(object["ACTIVIDAD"] != null){
            s_title ="ACTIVIDAD"
            title = object["ACTIVIDAD"];
            fecha = object["ACT_F"];
            body = object["OBSERVACION"]
        }
        if(object["PREGRADO"] != null){
            s_title ="PREGRADO"
            title = object["PREGRADO"];
            fecha = object["FECHA"];
            body = object["TIPO"];
        }
        timeline = timeline + "<li class='timeline-item'> <div class='timeline-badge primary'><i class='fa fa-check-square-o' aria-hidden='true'></i></div><div class='timeline-panel' ><div class='timeline-heading'><h5 class='timeline-title'style='color:"+color+"'>"+icon+" "+title+" "+icon+"</h5><p><small class='text-muted'><i class='fa fa-clock-o' aria-hidden='true'></i> "+fecha+"</small></p></div><div class='timeline-body'><p><p class='text-success'>"+s_title+"</p>"+body+"</p></div></div></li>";
    });
    timeline = timeline+"</ul>";
    return timeline;
}

function circle_timeLine(array_,class_){
    var title = "";
    var s_title = "";
    var body ="";
    var fecha = "";
    var color = "";
    var icon = "";
    var percentCont = 2;
    var width = $(window).width()/3;
    var timeline = "<div id='timelineCircle' style='width:"+width+"px;'>";
    $.each(array_,function(index, object){
        title = "";
        color = (object['COLOR']!=null)?object['COLOR']:"#EFFBFB";
        if(object["ENFASIS"] != null){
            fecha = object["FECHA"];
        }
        if(object["ACTIVIDAD"] != null){
            fecha = object["ACT_F"];
        }
        if(object["PREGRADO"] != null){
            fecha = object["FECHA"];
        }
        timeline = timeline+ "<div class='dot' id='"+object["IDE"]+index+"' style='left:"+percentCont+"%; background-color:"+color+"'> <span></span> <date>"+fecha+"</date></div>";

        percentCont = ((index+1)!=array_.length)?percentCont+(100/array_.length):0;
    });
    timeline = timeline+"</div>";
    $.each(array_,function(index, object){
        title = "";
        color = (object['COLOR']!=null)?object['COLOR']:"#000";
        icon = (object['COLOR']!=null)?object['ICONO']:"";
        if(object["ENFASIS"] != null){
            s_title ="ÉNFASIS";
            title = object["ENFASIS"];
            fecha = object["FECHA"];
            body = object["TIPO"];
        }
        if(object["ACTIVIDAD"] != null){
            s_title ="ACTIVIDAD";
            title = object["ACTIVIDAD"];
            fecha = object["ACT_F"];
            body = object["OBSERVACION"];
        }
        if(object["PREGRADO"] != null){
            s_title ="PREGRADO";
            title = object["PREGRADO"];
            fecha = object["FECHA"];
            body = object["TIPO"];
        }
        timeline = timeline+ "<article class='modalt "+object["IDE"]+index+"'><date>"+fecha+"</date><h2 style='color:"+color+"; border-bottom: solid "+color+" 2px;'>"+icon+" "+s_title+": "+title+" "+icon+"</h2><p>"+body+"</p></article>";
    });

    return timeline;
}

function validForm(opts){
    var valid = true;
    $.each(opts,function(index, el) {
        if(el['obligatory']){
            if(el['data'] !== null && el['data'] !== '' && typeof(el['data'])!== undefined){
                switch(el['type']){
                    case 'text':
                        if(el['data'] === null || el['data'].length === 0 || /^\s+$/.test(el['data'])){
                            valid=false;
                            return false;
                        }
                        break;
                    case 'number':
                        if(isNaN(el['data'])){
                            valid=false;
                            return false;
                        }
                        break;
                    case 'radio':
                        if(el['data'] === null || el['data'].length === 0 || el['data'] === ''){
                            valid=false;
                            return false;
                        }
                        break;
                    case 'select':
                        if(el['data'] === null || el['data'].length === 0 || el['data'] === '--'){
                            valid=false;
                            return false;
                        }
                        break;
                    case 'date':
                        if(el['data'] == null || el['data'].length === 0 || el['data'] === ''){
                            valid=false;
                            return false;
                        }
                        break;
                }    
            }
            else{
                valid=false;
                return false;
            }            
        }

    });
    return valid;
}

function validFormActData(opts){
    var valid = true;
    var items = Array();
    $.each(opts,function(index, el) {
        if(el['obligatory']){
            if(el['data'] !== null && el['data'] !== '' && typeof(el['data'])!== undefined){
                //console.log(el['item'] + " : " +el['data']);
                switch(el['type']){
                    case 'text':
                        if(el['data'] === null || el['data'].length === 0 || /^\s+$/.test(el['data'])){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                    case 'number':
                        if(isNaN(el['data'])){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                    case 'radio':
                        if(el['data'] === null || el['data'] == undefined || el['data'] === ''){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                    case 'select':
                        if(el['data'] === null || el['data'].length === 0 || el['data'] === '--'){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                    case 'date':
                        if(el['data'] == null || el['data'].length === 0 || el['data'] === ''){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                }    
            }
            else{
                items.push(el['item']);
                valid=false;
                //return false;
            }            
        }

    });
    var response = {'validate':valid,'items':items}
    //return valid;
    return response;
}


function createTable(id,array_,sections=false, tl=false, typeTL=1, numerOut=false){
    /*
    this function create a dinamyc table with array object specified
    PARAMS: 
    array_ : it´s an object type JSON like this array_ = {key:{key_:value_},...}

    */

    var th = (sections)?"SECCIÓN":"#"
    var table = "<table class = 'table table-responsive table-sm table-hover table-bordered table-striped animated fadeIn' id='table_"+id+"' style='font-size:12px;'><thead class='thead-active text-center'><tr>";
    if (numerOut == false) {
        table = table + "<th>"+th+"</th>";
    }
    var cont = 1;
    var style = "white-space: nowrap; ";
    $.each(array_['keys'],function(index,value){
        table = table + "<th id='title"+index+"' scope='col' style='text-align: center;'>"+value+"</th>";
    });
    table = table+ "</tr></thead><tbody>"
    $.each(array_,function(key,value){
        if(key != 'keys'){
            var data = (typeof(value['DATA_VAL'])!=='undefined')?btoa(value['DATA_VAL']):btoa(key);
            var dataTr = (sections)?sections_array[cont]:cont;
            style = "";
            if (numerOut == false) {
                table = table +"<tr><td class='number_' style='"+style+"'>"+dataTr+"</td>";
            }
            $.each(value,function(key_,value_){
                if(key_ == 'PROCCESS' && tl){
                    value_ = (typeTL==1)?circle_timeLine(value_,'tl'):horizontal_timeLine(value_,'tl');
                    style =  style+'max-width:800px; overflow-x:auto;  position: relative; padding: 15px 0px 50px 0px;';
                }
                else{
                    style = style+'vertical-align: middle; text-align: center;';
                }
                table = (key_ != 'DATA_VAL')? table+"<td class = 'celValue' data-val='"+data+"' data-item='"+key_+"' style='"+style+"'>"+value_+"</td>":table ;
            })
            table = table + "</tr>";
            cont +=1;
        }
    });
    var table = table+"</tbody></table>";
    return table;
}

function createAccordion(id, array_){
    var accordion = "<div id='"+id+"' role='tablist' aria-multiselectable='true' class='accordion'>";
    var card = 0;
    $.each(array_,function(key,value){
        accordion = accordion +"<div class='card'><div class='card-header' role='tab' id='heading"+card+"'>";
        accordion = accordion +"<h5 class='mb-0'>";
        accordion = accordion +"<button class='btn btn-link' data-toggle='collapse'  data-target='#collapse"+card+id+"' aria-expanded='true'><span></span>"+key+"</button></h5></div>";
        accordion = accordion +"<div id='collapse"+card+id+"' class='collapse' role ='tabpanel' aria-labelledby='heading"+card+"'>";        
        accordion = accordion +"<div class='card-block' id='block_"+key+"'><div class='p-3'>"+value+"</div></div></div>";
        accordion = accordion +"</div>";
        card += 1;
    });
    accordion = accordion + "</div>";
    return accordion;   
}

function createCheckBox(id_,class_,type,checked="",text=""){
    if (type == 1) {
        var prop = (checked == 1)?"checked":"";
        var check = '<label class="checkbox"><input type="checkbox" class="'+class_+'" id="'+id_+'" '+prop+' /><span class="primary"></span></label>';
    }
    else if (type == 2) {
        var prop = (checked == 1)?"checked":"";
        var class_btn = (checked == 1)?"btn-info":"btn-danger";
        var active = (checked == 1)?"":"active";
        var check = '<div class="text-center"><div class="btn-group '+class_+'" data-toggle="buttons"><label class="btn btn-sm '+class_btn+' '+active+'" id="'+id_+'"><input type="checkbox" class="'+class_+'" '+prop+'>'+text+' &nbsp;<span class="fa fa-times-circle"></span></label></div></div>'
    }
    return check;
}

function getDate() {
    var date = new Date();
    var year = String(date.getUTCFullYear());
    var month = ((date.getUTCMonth()+1)<10)?"0"+(date.getUTCMonth()+1):String(date.getUTCMonth()+1);
    var day = ((date.getUTCDate())<10)?"0"+(date.getUTCDate()):String(date.getUTCDate());
    var nDate = year+'-'+month+'-'+day;
    return nDate;
}

function change(object, item){
    var toastMessage_ = {"service":"actualización","200":"Mensaje actualizado", "400":"ups, hubo un error, actualiza","500":"hubo un error, intente nuevamente"};
    var array = atob($(object).parent().data('val')).split('-');
    var message = array[3];
    var value =($(object).val()!="")?$(object).val():$(object).text();
    $.ajax({
        url: host+'message/',
        type: 'PUT',
        dataType: 'json',
        data: {message: message, item:item, value:value},
        statusCode: toastr_message(toastMessage_) 
    })
    .done(function(response) {
        console.log(response);
        console.log(value);
        if(item == "STATE" ){
            if(value == 2){

                var data = $("td[data-item='STATE'][data-val='"+$(object).parent().data('val')+"']");
                data.children().remove();
                data.append("ENVIADO");
                var data_ans = $("td[data-item='ANSWER'][data-val='"+$(object).parent().data('val')+"']");
                var text =data_ans.children().val();
                data_ans.children().remove();
                data_ans.append(text);
            }
        }
    })
    .fail(function(response) {
        console.log(response);
    })

    
}
function alterTable(tag){
    var section = tag.split(" ");

    var content = $(tag+" td[data-item='ESTADO']");
    var assistance = $(tag+" td[data-item='asistentes']");
    var icon = $(tag+" td[data-item='ICON']");
    var color = $(tag+" td[data-item='COLOR']");
    
    if($(content).length > 0){    
        $.each(content,function(index,object){
            var state = $(this).text();
            $(this).text("");
            $(this).addClass('text-center');
            $(this).append("<i class='fa fa-pencil' aria-hidden='true' data-val='"+state+"'></i>");
        })
    }
    if($(assistance).length > 0){
        $.each(assistance,function(index,object){
            var ids = $(this).text();
            var data_val = (ids !="")?"data-val='"+ids+"'":"";
            $(this).text("");
            $(this).addClass('text-center');
            $(this).append("<i class='fa fa-bars' aria-hidden='true' "+data_val+"></i>");
        })   
    }
    if($(icon).length > 0){
        getIcon().done(function(response){
            $.each(icon,function(index,object){
                var icon_id = $(this).text().split('//');
                icon_id = icon_id[1];
                if(response['response'][icon_id-1] !== undefined){
                    $(this).text("");
                    $(this).addClass('text-center');
                    $(this).append(response['response'][icon_id-1]['description']);
                    $(this).attr('data-icon',response['response'][icon_id-1]['id']);
                }
            })
        })
    }
    if($(color).length > 0){
        $.each(color,function(index,object){
            var color = $(this).text();
            if(color !== ''){
                $(this).text("");
                $(this).addClass('text-center');
                $(this).css("background-color",color);
                $(this).attr('data-color',color);
            }
        })
    }
}

function validCircular(item){
    var valid = true;
    var opts = item.split("&");
    console.log(opts);
    $.each(opts, function(key, val) {
        var element = val.split("=");
        console.log(element[0]);
        console.log(element[1]);
        if ((/^\s+$/.test(element[1])) || element[1] == "" || element[1] == "--" || element[1] == undefined) {
            valid=false;
            return false;
        }
        else{
            //valid=false;
        } 
    });
    return valid;
}

function splitUp(arr, n) {
    var rest = arr.length % n, // how much to divide
    restUsed = rest, // to keep track of the division over the elements
    partLength = Math.floor(arr.length / n),
    result = [];
    for(var i = 0; i < arr.length; i += partLength) {
        var end = partLength + i,
        add = false;
        if(rest !== 0 && restUsed) { // should add one element for the division
            end++;
            restUsed--; // we've used one division element now
            add = true;
        }
        result.push(arr.slice(i, end)); // part of the array
        if(add) {
            i++; // also increment i in the case we added an extra element for division
        }
    }
    return result;
}

function paginationForm(id,array){
    var num = 1;
    var titles = array["keys"];
    var num_array = (array.length+1)/10;
    var array_pag = splitUp(array,num_array);
    var paginat = "";
    console.log(array);
    console.log(array_pag);
    $.each(array_pag, function(index, val) {
        if (index != "keys") {
            class_ = (num == 1)?"":"d-none";
            paginat = paginat+"<div class='"+class_+"' id='pag"+num+"'>";
            val["keys"] = titles;
            paginat = paginat+createTable(num,val);
            paginat = paginat+"</div>";
            num += 1;
        }
    });
    var page = 1;
    paginat = paginat+"<nav aria-label='Page navigation example'><ul class='pagination justify-content-center'><li class='page-item disabled' id='pgPrev'><a class='page-link' href='' id='prev' tabindex='-1'>Previous</a></li>";
    for (var i = 1; i < num; i++) {
        active = (i == 1)?"active":"";
        paginat = paginat+"<li class='page-item "+active+"' id='pgitem"+page+"'><a class='page-link num_page' href='' id='pag-"+page+"'>"+page+"</a></li>";
        page += 1;
    }
    paginat = paginat+"<li class='page-item' id='pgNext'><a class='page-link' href='' id='next'>Next</a></li></ul></nav>";
    return paginat;
}

function createTableInfo(id,array_,numerOut=false){
    /*
    this function create a dinamyc table with array object specified
    PARAMS: 
    array_ : it´s an object type JSON like this array_ = {key:{key_:value_},...}

    */
    console.log(array_);
    var table = "<table class = 'table table-responsive table-sm table-hover table-bordered table-striped animated fadeIn' id='table_"+id+"' style='font-size:12px;'><thead class='thead-active text-center'><tr>";
    if (array_['keys'] != false && array_['keys'] != null && array_['keys'] != undefined) {
        table = table + "<th colspan='2' style='font-size:14px; text-align:center;'><strong>"+array_['keys']+"</strong></th>";
    }
    var cont = 1;
    var style = "white-space: nowrap; ";
    table = table+ "</tr></thead><tbody class='text-left'>"
    $.each(array_,function(key,value){
        if(key != 'keys'){
            var data = (typeof(value['DATA_VAL'])!=='undefined')?btoa(value['DATA_VAL']):btoa(key);
            style = "";
            $.each(value,function(key_,value_){
                //key_ = key_.replace("_"," ");
                if(key_ == "Servicios"){
                    table = table+"<tr><td class = 'celValue' data-val='"+data+"' data-item='"+key_+"' style='"+style+"'><strong>"+key_+"</strong></td><td class = 'celValue' data-val='"+data+"' data-item='"+key_+"' style='background: #b8daba'><strong>"+value_+"</strong></td></tr>";
                }else{
                    table = table+"<tr><td class = 'celValue' data-val='"+data+"' data-item='"+key_+"' style='"+style+"'><strong>"+key_+"</strong></td><td class = 'celValue' data-val='"+data+"' data-item='"+key_+"' style='"+style+"'>"+value_+"</td></tr>";
                }
            })
            //table = table + "</tr>";
            cont +=1;
        }
    });
    var table = table+"</tbody></table>";
    return table;
}

function toastr_message(code,messages){
    //console.log(code);
    switch(code) {
        case 200:
            response = toastr.success(messages["200"],messages["service"]);
            break;
        case 400:
            response = toastr.warning(messages["400"],messages["service"]);
            break;
        case 500:
            response = toastr.error(messages["500"],messages["service"]);
            break;
        default:
            response = false
            break;
    }
    //console.log(response);
    return response;
}

function createTableAdmin(id,array_,numerOut=false,sections=false){
    /*
    this function create a dinamyc table with array object specified
    PARAMS: 
    array_ : it´s an object type JSON like this array_ = {key:{key_:value_},...}

    */
    var th = (sections)?"SECCIÓN":"#"
    var table = "<table class = 'table table-responsive table-sm table-hover table-bordered table-striped animated fadeIn' id='table_"+id+"' style='font-size:12px;'><thead class='thead-active text-center'><tr>";
    if (numerOut == false) {
        table = table + "<th>"+th+"</th>";
    }
    var cont = 1;
    var style = "white-space: nowrap; ";
    $.each(array_['keys'],function(index,value){
        if (index != "titleMod") {
            table = table + "<th id='title"+index+"' scope='col' style='text-align: center;'>"+value+"</th>";
        }
        else if (index == "titleMod") {
            $.each(value, function(indexTitle, valuesTitle) { 
                table = table+"<th id='title"+indexTitle+"' scope='col' style='text-align: center;'>"+valuesTitle+createCheckBox(index+"_"+indexTitle,"checkMod allMod module"+indexTitle,1)+"</th>";
            });
        }
    });
    table = table+ "</tr></thead><tbody>"
    $.each(array_,function(key,value){
        if(key != 'keys'){
            var data = (typeof(value['DATA_VAL'])!=='undefined')?btoa(value['DATA_VAL']):btoa(key);
            var dataTr = (sections)?sections_array[cont]:cont;
            style = "";
            if (numerOut == false) {
                table = table +"<tr><td class='number_' style='"+style+"'>"+dataTr+"</td>";
            }
            $.each(value,function(key_,value_){
                if (key_ != "modules") {
                    table = (key_ != 'DATA_VAL')? table+"<td class = 'celValue' data-val='"+data+"' data-item='"+key_+"' style='"+style+"'>"+value_+"</td>":table ;
                }
                else if (key_ == "modules") {
                    $.each(value_, function(index_, values_) {
                        valCheck = (values_ == 0 || values_ == null)?0:(values_ == 1)?1:null; 
                        table = table+"<td class = 'celValue text-center' data-val='"+data+"' data-item='"+index_+"' style='"+style+"'>"+createCheckBox(value["Id"]+"_"+index_,"checkMod module"+index_,1,valCheck)+"</td>"
                    });
                }
            })
            table = table + "</tr>";
            cont +=1;
        }
    });
    var table = table+"</tbody></table>";
    return table;
}

function arrayTextCheck(object) {
    var textCheck = "";
    $("."+object).each(function() {
        if ($(this).prop('checked') == true) {
            textCheck += $(this).parent().next().text()+" - ";
            // console.log($(this).parent().next().text());
        }
    });
    return textCheck;
}