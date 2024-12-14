import weather from 'weather-js';

export const obtenerClima = (req, res) => {
    const ciudad = req.query.ciudad;
    const pais = req.query.pais;

    weather.find({search: `${ciudad},${pais}`, degreeType: 'C'}, (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el clima', details: error });
        }
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ error: 'No se encontraron resultados para esta ciudad' });
        }
        res.status(200).json(resultado[0]);
    });
};
