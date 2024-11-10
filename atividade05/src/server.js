const app = require("./app");
const { v4: uuidv4 } = require("uuid");
const animes = require("./animes");

app.listen(3333, () => console.log("Servidor HTTP em execução na porta 3333"));

app.get("/", (req, res) => {
    res.send("Olá mais uma vez, mundo!");
});

app.get("/animes", (req, res) => {
    res.status(200).json(animes);
});

app.get("/animes/:id", (req, res) => {
    const { id } = req.params;
    const anime = animes.find((anime) => anime.id === id);
    if (!anime) {
        return res.status(404).json({ message: "Anime não encontrado" });
    }
    res.status(200).json(anime);
});

app.post("/animes", (req, res) => {
    const { name, genre, studio } = req.body;
    if (!name || !genre || !studio) {
        return res.status(400).json({ message: "Dados inválidos" });
    }
    const anime = {
        id: uuidv4(),
        name,
        genre,
        studio,
    };
    animes.push(anime);
    res.status(201).json(anime);
});

app.put("/animes/:id", (req, res) => {
    const { id } = req.params;
    const { name, genre, studio } = req.body;
    const anime = animes.find((anime) => anime.id === id);
    if (!anime) {
        return res.status(404).json({ message: "Anime não encontrado" });
    }
    if (!name || !genre || !studio) {
        return res.status(400).json({ message: "Dados inválidos" });
    }
    anime.name = name;
    anime.genre = genre;
    anime.studio = studio;
    res.status(200).json(anime);
});

app.delete("/animes/:id", (req, res) => {
    const { id } = req.params;
    const index = animes.findIndex((anime) => anime.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Anime não encontrado" });
    }
    animes.splice(index, 1);
    res.status(204).send();
});
