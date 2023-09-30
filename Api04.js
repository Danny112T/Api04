const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

peliculas = [
    {
        id: 1,
        titulo: "Batman vs Superman",
        director: "Zack Snyder",
        genero: "Accion",
        año: 2016,
        calificacion: 7.5
    },
    {
        id: 2,
        titulo: "Zack Snyder's Justice League",
        director: "Zack Snyder",
        genero: "Accion",
        año: 2021,
        calificacion: 8.1
    },
    {
        id:3,
        titulo: "The Dark Knight",
        director: "Christopher Nolan",
        genero: "Accion",
        año: 2008,
        calificacion: 9.0
    },
    {
        id:4,
        titulo: "The Dark Knight Rises",
        director: "Christopher Nolan",
        genero: "Accion",
        año: 2012,
        calificacion: 8.4
    },
    {
        id:5,
        titulo: "Batman Begins",
        director: "Christopher Nolan",
        genero: "Accion",
        año: 2005,
        calificacion: 8.2
    },
    {
        id:6,
        titulo: "Man of Steel",
        director: "Zack Snyder",
        genero: "Accion",
        año: 2013,
        calificacion: 7.0
    },
    {
        id:7,
        titulo: "Pussy in Boots 2",
        director: "Chris Miller",
        genero: "Animacion",
        año: 2021,
        calificacion: 6.1
    },
    {
        id:8,
        titulo: "Spider-man: Into the Spider-verse",
        director: "Peter Ramsey",
        genero: "Animacion",
        año: 2018,
        calificacion: 8.4
    },
    {
        id:9,
        titulo: "Spider-man: Across the Spider-verse",
        director: "Peter Ramsey",
        genero: "Animacion",
        año: 2023,
        calificacion: 10.0
    },
    {
        id:10,
        titulo: "Sobreviviendo a mis XV",
        director: "Jorge Colon",
        genero: "Comedia",
        año: 2023,
        calificacion: 7.5
    }
];

app.get("/peliculas/", (req, res) => {
    if (peliculas.length > 0) {
      res.status(200).json({
        estado: 1,
        mensaje: "Paliculas encontradas",
        peliculas: peliculas,
      });
    } else {
      res.status(404).json({
        estado: 0,
        message: "No se encontraron peliculas",
        peliculas: null,
      });
    }
});

app.get("/peliculas/:id", (req, res) => {
    const id = req.params.id;
    const pelicula = peliculas.find((pelicula) => pelicula.id == id);
    if (pelicula) {
        res.status(200).json({
            estado: 1,
            mensaje: "Pelicula encontrada",
            pelicula: pelicula,
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Pelicula no encontrada",
            pelicula: null,
        })
    }
});

app.post("/peliculas/", (req, res) => {
    const { titulo, director, año, genero, calificacion } = req.body;
    const id = peliculas.length + 1;
    if(titulo==undefined || director==undefined || año==undefined || genero==undefined || calificacion==undefined){
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan datos",
            pelicula: null,
        })
    } else {
        const pelicula = {id:id, titulo:titulo, director:director, año:año, genero:genero, calificacion:calificacion};
        const longitudInicial = peliculas.length;
        peliculas.push(pelicula);
        if (peliculas.length > longitudInicial) {
            res.status(200).json({
                estado: 1,
                mensaje: "Pelicula creada",
                pelicula: pelicula,
            });
        } else {
            res.status(500).json({
                estado: 0,
                mensaje: "Error en el servidor",
                pelicula: null,
            });
        }
    }
});

app.put("/peliculas/:id", (req, res) => {
    const id = req.params.id;
    const { titulo, director, año, genero, calificacion } = req.body;
    if (titulo==undefined || director==undefined || año==undefined || genero==undefined || calificacion==undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan datos",
            pelicula: null,
        })
    } else {
        const pelicula = peliculas.find((pelicula) => pelicula.id == id);
        if (pelicula) {
            pelicula.titulo = titulo;
            pelicula.director = director;
            pelicula.año = año;
            pelicula.genero = genero;
            pelicula.calificacion = calificacion;
            res.status(200).json({
                estado: 1,
                mensaje: "Pelicula actualizada",
                pelicula: pelicula,
            });
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "Pelicula no encontrada",
                pelicula: null,
            })
        }
    }
});

app.delete("/peliculas/:id", (req, res) => {
    const id = req.params.id;
    const pelicula = peliculas.find((pelicula) => pelicula.id == id);
    if(pelicula){
        const index = peliculas.indexOf(pelicula);
        peliculas.splice(index,1);
        res.status(200).json({
            estado:1,
            mensaje:"Pelicula eliminada",
            pelicula: pelicula
        })
    } else {
        res.status(404).json({
            estado:0,
            mensaje:"Pelicula no encontrada",
            pelicula: null
        })
    }
});

app.listen(port, () => {
    console.log("Servidor iniciado en http://localhost:" + port + "/peliculas/");
});