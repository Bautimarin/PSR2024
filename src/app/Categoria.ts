export enum Categoria{
    Terror = "Terror",
    Comedia = "Comedia",
    Accion = "Accion",
    Aventura = "Aventura",
    Drama = "Drama",
    Romance = "Romance",
    CienciaFiccion = "Ciencia Ficcion",
    Musical = "Musical",
    Animacion = "Animacion",
    Fantasia = "Fantasia",
    Misterio = "Misterio",
    Suspenso = "Suspenso",
    Documental = "Documental",
    Biografia = "Biografia",
    Crimen = "Crimen",
    Guerra = "Guerra",
    Historia = "Historia",
    Deporte = "Deporte",
    Familiar = "Familiar",
    Infantil = "Infantil",
    Adulto = "PORNO",
}
function isValidCategory(arg : unknown) : boolean {
    console.log( "categoria " + typeof(arg) === "string")
    return ( !!arg &&
        typeof(arg) === "string" &&
        Object.values(Categoria).includes(arg as Categoria));
}
export default {
    isValidCategory
} as const;