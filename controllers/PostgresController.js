const { Client } = require('pg')

const SearchProjects = async (list) => {
    try {
        const client = new Client()
        await client.connect()
        const ids = list.map(item => item.external_id).join(", ");
        const { rows: projects } = await client.query(`SELECT id, nombre FROM comercial_ficha_proyectos WHERE id IN (${ids})`);
        await client.end()
        return projects;
    } catch {
        throw new Error("Error en la Base de Datos");
    }
}

module.exports = {
    SearchProjects
}