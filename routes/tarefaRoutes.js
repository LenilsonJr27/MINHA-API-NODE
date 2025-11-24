// Configurando Rotas

//routes/tarefaRoutes.js

import { Router } from "express";
import{ listarTarefas,criarTarefa,atualizarTarefa,excluirTarefa, }
from "../controllers/tarefaController.js";

const router = Router();
//Rotas para operações CRUD de tarefas
router.get('/tarefas', listarTarefas);
router.post('/tarefas', criarTarefa);
router.put('/tarefas/:id', atualizarTarefa);
router.delete('/tarefas/:id', excluirTarefa);

export default router;