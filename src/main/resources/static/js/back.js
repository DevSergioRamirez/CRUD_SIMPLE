
// Funcion al cargar la pagina
$(document).ready(function() {
    cargarEstudiantes();
});

//  Funcion para mostrar el listado completo
async function cargarEstudiantes(){

    //  Llamado a la api con metodo DELETE
    const request = await fetch('/api/estudiantes', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    });
    const estudiantes = await request.json();

    let listadoHTML = ``;

    // Iteracion para crear filas HTML de la tabla
    for(let estudiante of estudiantes){

        let botonEliminar = `<a href="#deleteEmployeeModal" onclick="eliminarEstudiante(${estudiante.id})"
         class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>`;
        let botonEditar = `<a href="#editEmployeeModal" onclick="actualizarEstudiante(${estudiante.id}, '${estudiante.nombre}', '${estudiante.apellido}', '${estudiante.email}')"
         class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>`;
        let estudianteHTML = `<tr>
        
        <td>${estudiante.nombre}</td>
        <td>${estudiante.apellido}</td>
        <td>${estudiante.email}</td>
        <td>
            ${botonEditar}
            ${botonEliminar}
        </td>
    </tr>`;

    listadoHTML+=estudianteHTML;
    }

    // Agregar filas a la tabla
    document.querySelector('#estudiantes tbody').outerHTML = listadoHTML;

}

//  Funcion para eliminar un estudiante
function eliminarEstudiante(id){
    document.getElementById("borrar").addEventListener("click", async function() {

        //  Llamado a la api con metodo DELETE
        await fetch('/api/estudiantes/'+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            });
    });    
}

//  Funcion para insertar un estudiante
function agregarEstudiante(){

    //  Recuperación de datos de formulario y validación
    let estudiante = {};
    estudiante.nombre = document.getElementById("addNombre").value;
    estudiante.apellido = document.getElementById("addApellido").value;
    estudiante.email = document.getElementById("addEmail").value;
    
    if(estudiante.nombre=="" || estudiante.apellido=="" || !validarCorreo(estudiante.email)) return;

    //  Llamado a la api con metodo POST
    post(estudiante); 
}

//  Funcion para actualizar la informacion de un estudiante
function actualizarEstudiante(id, nom, ape, email){


    document.getElementById("editNombre").value = nom;
    document.getElementById("editApellido").value = ape;
    document.getElementById("editEmail").value = email;

    miFuncion();

    //  Funcion de validacion y espera de para presionar un botón
    async function miFuncion() {

        let ok = true;
        let estudiante = {};

        //  Bucle mientras los espacios de informacion sean nulos o el email tenga formato incorrecto
        while(ok){
            ok=false;

            const botonPresionado = await esperaBotones();

            if(botonPresionado=="editCancelar") return;

            // Asignacion de datos en el objeto estudiantes
            estudiante.id = id;
            estudiante.nombre = document.getElementById("editNombre").value;
            estudiante.apellido = document.getElementById("editApellido").value;
            estudiante.email = document.getElementById("editEmail").value;
            
            // Revisión de nulidad y formato del email
            if(estudiante.nombre=="" || estudiante.apellido=="" || !validarCorreo(estudiante.email)) ok = true;
        }
        post(estudiante);      
    }

    //  Funcion de promesa
    async function esperaBotones() {
        return new Promise(resolve => {
            // Agrega eventos de clic a los botones
            document.getElementById('editCancelar').addEventListener('click', () => resolve('editCancelar'));
            document.getElementById('editGuardar').addEventListener('click', () => resolve('editGuardar'));
        });
    }
}

//  Fetch POST
async function post(estudiante){
    // Solicitud para guardar la informacion
    await fetch('/api/estudiantes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
    });
    //location.reload();
}

//  Funcion de validacion de correo con REGEX
function validarCorreo(correo) {
    // Expresión regular para validar correo electrónico
    let expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Testea la expresión regular con el correo proporcionado
    return expresionRegular.test(correo);
}

//  Validacion de formulario
function validarFormulario(id){
    const email = document.getElementById(id).value;
    if (!validarCorreo(email)) {
        alert("Ingresa una direccion de correo válida");
        return false;
    }
    
    return true; 
}