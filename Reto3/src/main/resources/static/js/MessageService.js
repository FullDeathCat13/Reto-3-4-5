var urlBaseMessage = "/api/Message";
var urlBaseQuadbike = "/api/Quadbike";
var urlBaseClient = "/api/Client";

var getAll = function () {
    $.ajax({
        url: urlBaseMessage + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            updateTable(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
};


var getAllQuadbike = function (idQuadbike) {
    $.ajax({
        url: urlBaseQuadbike + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="quadbike">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].id}">${respuesta[i].name}</option>`;
            }
            select += `</select>`;
            $("#quadbike-select").html(select);
            
            if (idQuadbike!=='undefined' && idQuadbike!==null){
                $("#quadbike").val(idQuadbike);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
};

var getAllClient = function (idClient) {
    $.ajax({
        url: urlBaseClient + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="client">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].idClient}">${respuesta[i].name}</option>`;
            }
            select += `</select>`;
            $("#client-select").html(select);
            
            if (idClient!=='undefined' && idClient!==null){
                $("#client").val(idClient);
            }
            
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert('ha sucedido un problema');
        }
    });
};

var updateTable = function (items) {
    var tabla = `<table class="table striped">
                      <tr>
                        <th>ID</th>
                        <th>MENSAJE</th>
                        <th>CUATRIMOTO</th>
                        <th>CLIENTE</th>
                      </tr>`;
    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                       <td>${items[i].idMessage}</td>
                       <td>${items[i].messageText}</td>
                       <td>${items[i].quadbike.name}</td>
                       <td>${items[i].client.name}</td>
                       <td>
                        <button type="button" class="btn btn-sm btn-primary" onclick="edit(${items[i].idMessage}, '${items[i].messageText}', '${items[i].quadbike.id}', '${items[i].client.idClient}')">
                            Editar
                        </button>
                        <button type="button" class="btn btn-sm btn-danger" onclick="deleteMessage(${items[i].idMessage})">
                            Eliminar
                        </button>
                       </td>
                    </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);

};

$(document).ready(function () {
    console.log("document ready");
    getAll();
});

var addMessage = function () {
    getAllQuadbike(null);
    getAllClient(null);
    $("#tituloModalMessage").html('Nueva Mensaje');
    $("#idMessage").val('');
    $("#messageText").val('');
    $('#modalMessage').modal('show');
};

var closeModal = function () {
    $('#modalMessage').modal('hide');
};

var showMenssage = function (mensaje) {
    $("#mensaje").html(mensaje);
    $('#modalMensaje').modal('show');
};

var closeModalMessage = function () {
    $('#modalMensaje').modal('hide');
};

var updateChanges = function () {
    var payload;
    var method;
    var idMessage = $("#idMessage").val();
    var msg;
    var ruta;
    if (idMessage !== 'undefined' && idMessage !== null && idMessage.length > 0) {
        ruta = urlBaseMessage + "/update";
        payload = {
            idMessage: +$("#idMessage").val(),
            messageText: $("#messageText").val(),
            quadbike: {
                id: +$("#quadbike").val()
            },
            client: {
                idClient: +$("#client").val()
            }
        };
        method = "PUT";
        msg = "Se ha actualizado la categoria";
    } else {
        ruta = urlBaseMessage + "/save";
        payload = {
            name: $("#name").val(),
            messageText: $("#messageText").val(),
            quadbike: {
                id: +$("#quadbike").val()
            },
            client: {
                idClient: +$("#client").val()
            }
        };
        method = "POST";
        msg = "Se ha creado la categoria";
    }

    if ($("#messageText").val() === '' ||
            $("#quadbike").val() === '' ||
            $("#client").val() === '') {

        showMenssage('Todos los campos son obligatorios!!');
    } else {

        console.log("guardando ", payload)
        console.log("ruta ", ruta)
        console.log("method ", method)

        $.ajax({
            url: ruta,
            type: method,
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(payload),
            statusCode: {
                201: function () {
                    showMenssage(msg);
                    closeModal();
                    getAll();
                }
            }
        });
    }
};

var edit = function (idMessage, messageText, idQuadbike, idClient) {
    getAllQuadbike(idQuadbike);
    getAllClient(idClient);
    $("#tituloModalMessage").html('Actualizar Mensaje');
    $("#idMessage").val(idMessage);
    $("#messageText").val(messageText);
    $('#modalMessage').modal('show');
};

var deleteMessage = function (idMessage) {
    console.log("eliminando idMessage: " + idMessage);
    $.ajax({
        url: urlBaseMessage + "/" + idMessage,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                showMenssage('Se ha eliminado la categoria');
                closeModal();
                getAll();
            }
        }
    });
};

$.get("/user", function (data) {
    console.log("get");
    console.log(data);
    $("#user").html(data.name);
    $(".unauthenticated").hide();
    $(".authenticated").show();
});


