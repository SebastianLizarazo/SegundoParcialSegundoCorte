
let employees = [];
let idCounter = 1;

document.getElementById('apellidos').addEventListener('keypress',(event)=>{
    if(!(/[a-zA-Z\s]/.test(event.key))){
        event.preventDefault()
    }
})

document.getElementById('nombres').addEventListener('keypress',(event)=>{
    if(!(/[a-zA-Z\s]/.test(event.key))){
        event.preventDefault()
    }
})

document.getElementById('search-id').addEventListener('keypress',(event)=>{
    if(!(/[0-9]/.test(event.key))){
        event.preventDefault()
    }
})

const form = document.getElementById('employee-form');
const apellidosInput = document.getElementById('apellidos');
const nombresInput = document.getElementById('nombres');
const departamentoSelect = document.getElementById('departamento');
const municipioSelect = document.getElementById('municipio');
const fechaNacimientoInput = document.getElementById('fecha-nacimiento');
const salarioInput = document.getElementById('salario');


const table = document.getElementById('employee-table').getElementsByTagName('tbody')[0];
const searchIdInput = document.getElementById('search-id');
const searchButton = document.getElementById('search-button');


const departamentoMapping = {};
const departamentoSelected = document.getElementById('departamento');
const xhr = new XMLHttpRequest();
xhr.open("GET", "./resources/departments.json", true);
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const departamentoSelected = document.getElementById('departamento');
        data.forEach(department => {
            departamentoMapping[department.code] = department.name;
            const option = document.createElement('option');
            option.value = department.code;
            option.textContent = department.name;
            departamentoSelected.appendChild(option);
        });
    }
};
xhr.send();

const municipioMapping = {};
const municipioSelected = document.getElementById('municipio');
const xhr2 = new XMLHttpRequest();
xhr2.open("GET", "./resources/towns.json", true);
xhr2.onreadystatechange = () => {
    if (xhr2.readyState === 4 && xhr.status === 200) {
        const data2 = JSON.parse(xhr2.responseText);
        const municipioSelected = document.getElementById('municipio'); 

        data2.forEach(town => {
            municipioMapping[town.code] = town.name; 
            const option2 = document.createElement('option');
            option2.value = town.code;
            option2.textContent = town.name;
            municipioSelected.appendChild(option2);
        });
    }
};
xhr2.send();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apellidos = apellidosInput.value;
    const nombres = nombresInput.value;
    const departamentoCode = departamentoSelect.value;
    const municipioCode = municipioSelect.value;
    const fechaNacimiento = fechaNacimientoInput.value;
    const salario = salarioInput.value;

    const municipio = municipioMapping[municipioCode];
    const departamento = departamentoMapping[departamentoCode];
    
    const empleado = {
        id: idCounter++,
        apellidos,
        nombres,
        departamento,
        municipio,
        fechaNacimiento,
        salario
    };
    employees.push(empleado);

    const row = table.insertRow();
    row.innerHTML = `<td>${empleado.id}</td><td>${empleado.apellidos} ${empleado.nombres}</td><td>${empleado.municipio}</td><td>${calculateAge(empleado.fechaNacimiento)}</td>`;

    form.reset();
});

searchButton.addEventListener('click', () => {
    const searchId = parseInt(searchIdInput.value);
    const empleadoEncontrado = employees.find((empleado) => empleado.id === searchId);

    if (empleadoEncontrado) {
        const modalContent = `
            Detalles del Empleado
            ID: ${empleadoEncontrado.id}
            Apellidos y Nombres: ${empleadoEncontrado.apellidos} ${empleadoEncontrado.nombres}
            Departamento: ${empleadoEncontrado.departamento}
            Municipio: ${empleadoEncontrado.municipio}
            Fecha de Nacimiento: ${empleadoEncontrado.fechaNacimiento}
            Salario: ${empleadoEncontrado.salario}
        `;

        alert(modalContent);
        
    } else {
        
        alert('Empleado no encontrado.');
    }
});


function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
    }
    return age;
}
