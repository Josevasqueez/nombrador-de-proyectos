const Bizneo = require("./controllers/BizneoController");
const Postgres = require("./controllers/PostgresController");
const Validator = require('validator');
const fs = require('fs');
require('dotenv').config()

const ActualizarNombres = async () => {
    const token = await Bizneo.login();
    console.log("Buscando errores en campo de proyectos...");
    const { field } = await Bizneo.getProjectField(token);
    const failedItems = field.options.filter(item => item.title.includes("undefined") && item.external_id).filter(item => Validator.isNumeric(item.external_id));
    if (failedItems.length < 1) return console.log("No hay proyectos con errores.")
    console.log("Buscando proyectos en Base de Datos de Sigestion...");
    const projects = await Postgres.SearchProjects(failedItems);
    const newItems = failedItems.map(item => {
        const project = projects.find(p => p.id.toString() === item.external_id);
        return {
            ...item,
            title: project.nombre
        }
    })
    const body = {
        field: {
            options_attributes: newItems
        }
    }
    console.log("Generando los proyectos en un JSON...");
    fs.writeFile("camposFormulario.json", JSON.stringify(body), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("Archivo creado con éxito.\n");
        }
    });
    // console.log("Actualizando proyectos en Bizneo...");
    // await Bizneo.updateProjectField(body, token);
    // console.log("Actualizados todos los proyectos.");
}

try {
    ActualizarNombres();
} catch (err) {
    console.log(err);
}