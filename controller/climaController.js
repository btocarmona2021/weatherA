export const obtenerClima = (req, res) => {
    const { ciudad, pais } = req.query;

    if (!ciudad || !pais) {
        return res.status(400).json({ error: 'Se requiere los parámetros "ciudad" y "pais".' });
    }

    weather.find({ search: `${ciudad},${pais}`, degreeType: 'C' }, (error, resultado) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Hubo un problema al obtener el clima' });
        }
        res.status(200).json(resultado[0]);
    });
};
