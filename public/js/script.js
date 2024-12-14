const urlProvincias = `https://apis.datos.gob.ar/georef/api/provincias`
const selectProvincias = document.getElementById('provincias');
const selectCiudades = document.getElementById('ciudades');
const dia = document.getElementById('dia');
const ciudad = document.getElementById('ciudad');
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora');
const temp = document.getElementById('temperatura');
const cielo = document.getElementById('cielo');
const sensacion = document.getElementById('sensacion');
const humedad = document.getElementById('humedad');
const viento = document.getElementById('viento');


const obtenerProvincias = () => {
    fetch(urlProvincias)
        .then((datos) => datos.json())
        .then((datos) => {
            const {provincias} = datos;

            provincias.forEach((provincia) => {
                const opcionProvincia = document.createElement('OPTION');
                opcionProvincia.innerText = provincia.nombre;
                opcionProvincia.value = provincia.nombre;
                selectProvincias.appendChild(opcionProvincia);
            })
        })
}

const obtenerCiudades = (provincia) => {
    const urlCiudad = `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&max=1000`;
    selectCiudades.innerHTML = '';
    fetch(urlCiudad)
        .then((datos) => datos.json())
        .then((datos) => {
            const {localidades} = datos;
            localidades.forEach((localidad) => {
                const opcionCiudad = document.createElement('OPTION');
                opcionCiudad.innerText = localidad.nombre;
                opcionCiudad.value = localidad.nombre;
                selectCiudades.appendChild(opcionCiudad);
            })
        })
}
obtenerProvincias()

selectProvincias.addEventListener('change', (ev) => {
    obtenerCiudades(ev.target.value)
})

selectCiudades.addEventListener('change', (ev) => {
    const provincia = selectProvincias.value;
    fetch(`https://weather-a-z69l.vercel.app/clima?ciudad=${ev.target.value}&pais=${provincia}`)
        .then(datos => datos.json())
        .then((datos) => {
            const {current, forecast} = datos;
            const {
                temperature, skytext,
                date, observationtime,
                observationpoint, feelslike,
                humidity, day, windspeed
            } = current;
            dia.innerText = day === 'Friday' ? 'Viernes' : day === 'Saturday' ? 'Sabado'
                : day === 'Sunday' ? 'Domingo' : day === 'Monday' ? 'Lunes' : day === 'Thuesday' ? 'Martes'
                    : day === 'Wednesday' ? 'Miercoles' : day === 'Thursday' ? 'Jueves' : '';
            ciudad.innerText = observationpoint;
            fecha.innerText = date;
            hora.innerText = observationtime + ' Hs';
            temp.innerText = temperature + ' C';
            cielo.innerText = skytext;
            sensacion.innerText = feelslike + ' C';
            humedad.innerText = humidity + ' %';
            viento.innerText = windspeed;
            document.getElementById('pronostico').innerHTML = ''
            console.log(forecast)
            forecast.forEach((dia) => {
                const plantilla = ` 
                       <fieldset class="col-2 p-2 bg-info-subtle rounded-2">
    <p>Fecha: <span>${dia.date}</span></p>
    <p>Dia: <span>${dia.day === 'Friday' ? 'Viernes' : dia.day === 'Saturday' ? 'Sabado'
                    : dia.day === 'Sunday' ? 'Domingo' : dia.day === 'Monday' ? 'Lunes' : dia.day === 'Tuesday' ? 'Martes'
                        : dia.day === 'Wednesday' ? 'Miercoles' : dia.day === 'Thursday' ? 'Jueves' : ''}</span></p>
    <p>Temperatura Minima: <span>${dia.low} C</span></p>
    <p>Temperatura Maxima: <span>${dia.high} C</span></p>
    <p>Precipitaciones: <span>${dia.precip} %</span></p>
</fieldset>
                `
                document.getElementById('pronostico').innerHTML += plantilla;
            })
        })
})