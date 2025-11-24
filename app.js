
//Estrutura da API

// Importando o módulo express para lidar com rotas e middlewares
import express from "express"; 

// Importando as rotas da aplicação relacionadas às tarefas
import tarefasRoutes from "./routes/tarefaRoutes.js";

// Inicializando a aplicação Express
const app = express(); 

app.use(express.json());


// Definindo a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000; 

// Configurando as rotas da aplicação para utilizar as rotas 
// relacionadas às tarefas
app.use('/api', tarefasRoutes);

// Configurando uma rota para exibir uma mensagem de boas-vindas
 app.get('/', (req, res) => { 
     res.send(`Bem-vindos à API de tarefas! ${PORT}`);
 });

// Inicializando o servidor e fazendo com que ele escute na porta definida 
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

