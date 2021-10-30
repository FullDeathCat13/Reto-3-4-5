var urlBaseCuatrimoto = "/api/Quadbike";
var urlBaseCategoria = "/api/Category";

var getAll = function () {
    $.ajax({
        url: urlBaseCuatrimoto + "/all",
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

var getAllCategory = function (idCategory) {
    $.ajax({
        url: urlBaseCategoria + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            var select = `<select class="form-select" id="category">`;
            for (var i = 0; i < respuesta.length; i++) {
                select += `<option value="${respuesta[i].id}">${respuesta[i].name}</option>`;
            }
            select += `</select>`;
            $("#category-select").html(select);

            if (idCategory !== 'undefined' && idCategory !== null) {
                $("#category").val(idCategory);
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
                    <th>NOMBRE</th>
                    <th>MARCA</th>
                    <th>AÑO</th>
                    <th>CATEGORIA</th>
                    <th>DESCRIPCIÓN</th>
                    <th>ACCIONES</th>
                  </tr>`;


    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].id}</td>
                   <td>${items[i].name}</td>
                    <td>${items[i].brand}</td>
                    <td>${items[i].year}</td>
                    <td>${items[i].category.name}</td>
                   <td>${items[i].description}</td>
                   <td>
                    <button type="button" class="btn btn-sm btn-primary" onclick="edit(${items[i].id}, '${items[i].name}', '${items[i].brand}', '${items[i].year}', '${items[i].category.id}', '${items[i].description}')">
                        Editar
                    </button>
                    <button type="button" class="btn btn-sm btn-danger" onclick="deleteQuadbike(${items[i].id})">
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

var addQuadbike = function () {
    getAllCategory(null);
    $("#tituloModalCuatrimoto").html('Nueva Cuatrimoto');
    $("#id").val('');
    $("#name").val('');
    $("#decription").val('');
    $('#modalCuatrimoto').modal('show');
};

var closeModal = function () {
    $('#modalCuatrimoto').modal('hide');
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
    var id = $("#id").val();
    var msg;
    var ruta;
    if (id !== 'undefined' && id !== null && id.length > 0) {
        ruta = urlBaseCuatrimoto + "/update";
        payload = {
            id: +$("#id").val(),
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            category: {
                id: $("#category").val
            },
            description: $("#description").val()
        };
        method = "PUT";
        msg = "Se ha actualizado la cuatrimoto";
    } else {
        ruta = urlBaseCuatrimoto + "/save";
        payload = {
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            category: {
                id: $("#category").val
            },
            description: $("#description").val()
        };
        method = "POST";
        msg = "Se ha creado la cuatrimoto";
    }

    if ($("#name").val() === '' ||
            $("#brand").val() === '' ||
            $("#description").val() === '' ||
            $("#category").val() === '' ||
            $("#year").val() === '') {

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
    ;
};

var edit = function (id, name, brand, year, idCategory, description) {
    $("#tituloModalCuatrimoto").html('Actualizar Cuatrimoto');
    getAllCategory(idCategory);
    $("#id").val(id);
    $("#name").val(name);
    $("#brand").val(brand);
    $("#year").val(year);
    $("#description").val(description);
    $('#modalCuatrimoto').modal('show');
};

var deleteQuadbike = function (id) {
    console.log("eliminando id: " + id);
    $.ajax({
        url: urlBaseCuatrimoto + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: {
            204: function () {
                showMenssage('Se ha eliminado la cuatrimoto');
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


