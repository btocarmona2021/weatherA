import weather from "weather-js";

export const obtenerClima = (req, res) => {

    const ciudad = req.query.ciudad;
    const provincia = req.query.pais;

    weather.find({search: `${ciudad},${provincia}`, degreeType: 'C'}, (error, resultado) => {
        if (error) {
            console.log(error);
        }
        res.status(200).send(resultado[0]);

    })
}