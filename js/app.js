const menu = [
  { nombre: 'Bruschetta Clásica',     descripcion: 'Pan tostado con tomate y albahaca fresca',   precio: 4500,  categoria: 'Entrada'       },
  { nombre: 'Tabla de Quesos',         descripcion: 'Selección de quesos importados con mermelada', precio: 7800,  categoria: 'Entrada'       },
  { nombre: 'Lomo al Vino Tinto',      descripcion: 'Lomo de res en reducción de vino tinto',      precio: 15500, categoria: 'Plato Fuerte'  },
  { nombre: 'Pasta Carbonara',         descripcion: 'Pasta con tocino, huevo y queso parmesano',    precio: 10200, categoria: 'Plato Fuerte'  },
  { nombre: 'Salmón a la Plancha',     descripcion: 'Filete de salmón con vegetales al vapor',      precio: 13800, categoria: 'Plato Fuerte'  },
  { nombre: 'Tiramisú',               descripcion: 'Postre italiano con café y mascarpone',         precio: 5200,  categoria: 'Postre'        },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá',    precio: 4800,  categoria: 'Postre'        },
];
const imagenesPlatos = {
    'Bruschetta Clásica': 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80',
    'Tabla de Quesos': 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80',
    'Lomo al Vino Tinto': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    'Pasta Carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    'Salmón a la Plancha': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    'Tiramisú': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    'Cheesecake de Maracuyá': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80'
};

let categoriaActual = 'Todos';
let reservas = [];

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    actualizarResumen();

    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    botonesFiltro.forEach((boton) => {
        boton.addEventListener('click', () => {
            filtrarCategoria(boton.dataset.categoria);
        });
    });

    const formulario = document.getElementById('formReserva');
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        agregarReserva();
    });

    const camposFormulario = ['nombre', 'correo', 'fecha', 'hora', 'personas'];
    camposFormulario.forEach((idCampo) => {
        document.getElementById(idCampo).addEventListener('input', validarFormulario);
        document.getElementById(idCampo).addEventListener('change', validarFormulario);
    });

    validarFormulario();
});

/*
    Recorre el array menu y crea dinámicamente las cards de platillos
    si hay una categoría seleccionada enseña únicamente los platillos de esa categoría
*/
function renderMenu() {
    const contenedorMenu = document.getElementById('contenedorMenu');
    contenedorMenu.innerHTML = '';

    const platosFiltrados = categoriaActual === 'Todos'
        ? menu
        : menu.filter((plato) => plato.categoria === categoriaActual);

    platosFiltrados.forEach((plato) => {
        const card = document.createElement('article');
        card.classList.add('card-plato');

        const imagen = document.createElement('img');
        imagen.src = imagenesPlatos[plato.nombre];
        imagen.alt = plato.nombre;
        imagen.classList.add('imagen-plato');

        const nombre = document.createElement('h3');
        nombre.textContent = plato.nombre;

        const descripcion = document.createElement('p');
        descripcion.textContent = plato.descripcion;

        const precio = document.createElement('p');
        precio.classList.add('precio');
        precio.textContent = `₡${plato.precio.toLocaleString('es-CR')}`;

        const categoria = document.createElement('span');
        categoria.classList.add('categoria');
        categoria.textContent = plato.categoria;

        card.appendChild(imagen);
        card.appendChild(nombre);
        card.appendChild(descripcion);
        card.appendChild(precio);
        card.appendChild(categoria);

        contenedorMenu.appendChild(card);
    });
}
/*
    Cambia la categoría activa del menú, actualiza el estilo del botón seleccionado
    y vuelve a llamar a renderMenu() para mostrar los platillos correspondientes.
*/
function filtrarCategoria(categoria) {
    categoriaActual = categoria;

    const botonesFiltro = document.querySelectorAll('.btn-filtro');
    botonesFiltro.forEach((boton) => {
        boton.classList.remove('activo');

        if (boton.dataset.categoria === categoria) {
            boton.classList.add('activo');
        }
    });

    renderMenu();
}

/*
    revisa los campos obligatorios del formulario y
    muestra mensajes de error directamente debajo de cada campo inválido
    y habilita el botón de envío solo si todo está correcto.
*/
function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const personas = Number(document.getElementById('personas').value);

    const errorNombre = document.getElementById('errorNombre');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorFecha = document.getElementById('errorFecha');
    const errorHora = document.getElementById('errorHora');
    const errorPersonas = document.getElementById('errorPersonas');
    const btnEnviar = document.getElementById('btnEnviar');

    let formularioValido = true;

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorFecha.textContent = '';
    errorHora.textContent = '';
    errorPersonas.textContent = '';

    if (nombre === '') {
        errorNombre.textContent = 'El nombre completo es obligatorio.';
        formularioValido = false;
    } else if (nombre.length < 5) {
        errorNombre.textContent = 'El nombre debe tener mínimo 5 caracteres.';
        formularioValido = false;
    } else if (!regexNombre.test(nombre)) {
        errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
        formularioValido = false;
    }

    if (correo === '') {
        errorCorreo.textContent = 'El correo electrónico es obligatorio.';
        formularioValido = false;
    } else if (!regexCorreo.test(correo)) {
        errorCorreo.textContent = 'Ingrese un correo electrónico válido.';
        formularioValido = false;
    }

    if (fecha === '') {
        errorFecha.textContent = 'La fecha de reserva es obligatoria.';
        formularioValido = false;
    } else {
        const fechaSeleccionada = new Date(`${fecha}T00:00:00`);
        const fechaActual = new Date();

        fechaActual.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < fechaActual) {
            errorFecha.textContent = 'La fecha no puede ser una fecha pasada.';
            formularioValido = false;
        }
    }

    if (hora === '') {
        errorHora.textContent = 'Debe seleccionar una hora.';
        formularioValido = false;
    }

    if (!personas) {
        errorPersonas.textContent = 'El número de personas es obligatorio.';
        formularioValido = false;
    } else if (personas < 1 || personas > 20) {
        errorPersonas.textContent = 'El número de personas debe estar entre 1 y 20.';
        formularioValido = false;
    }

    btnEnviar.disabled = !formularioValido;

    return formularioValido;
}

/*
    Verifica que el formulario sea válido.
*/
function agregarReserva() {
    if (!validarFormulario()) {
        return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const personas = Number(document.getElementById('personas').value);

    const nuevaReserva = {
        nombre,
        correo,
        fecha,
        hora,
        personas
    };

    reservas.push(nuevaReserva);

    const tablaReservas = document.getElementById('tablaReservas');
    const fila = document.createElement('tr');

    fila.classList.add('fila-reserva');

    if (personas >= 6) {
        fila.classList.add('reserva-grande');
    }

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = nombre;

    const celdaCorreo = document.createElement('td');
    celdaCorreo.textContent = correo;

    const celdaFecha = document.createElement('td');
    celdaFecha.textContent = fecha;

    const celdaHora = document.createElement('td');
    celdaHora.textContent = hora;

    const celdaPersonas = document.createElement('td');
    celdaPersonas.textContent = personas;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCorreo);
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaHora);
    fila.appendChild(celdaPersonas);

    tablaReservas.appendChild(fila);

    document.getElementById('formReserva').reset();

    actualizarResumen();
    validarFormulario();
}

/*
    Calcula el total de reservas, el total de personas esperadas
    y la reserva con mayor número de personas
*/
function actualizarResumen() {
    const resumenReservas = document.getElementById('resumenReservas');

    const totalReservas = reservas.length;
    const totalPersonas = reservas.reduce((total, reserva) => {
        return total + reserva.personas;
    }, 0);

    let mayorReserva = 0;

    if (reservas.length > 0) {
        mayorReserva = Math.max(...reservas.map((reserva) => reserva.personas));
    }

    resumenReservas.innerHTML = `
        <p>Total de reservas registradas: ${totalReservas}</p>
        <p>Total de personas esperadas: ${totalPersonas}</p>
        <p>Reserva con mayor número de personas: ${mayorReserva}</p>
    `;
}