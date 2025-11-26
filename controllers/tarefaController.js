// controllers/tarefaController.js

import { promises as fs } from 'fs';
import path from 'path';

// Caminho do arquivo de tarefas
const caminhoArquivo = path.resolve('data', 'tarefas.json');

// Função utilizada para ler as tarefas do arquivo
async function lerTarefas() {
  try {
    const dados = await fs.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
  } catch (err) {
    // Se o arquivo não existir, começa com lista vazia
    if (err.code === 'ENOENT') {
      return [];
    }
    console.error('Erro ao ler tarefas:', err);
    throw err;
  }
}

// Função utilizada para salvar as tarefas no arquivo
async function salvarTarefas(tarefas) {
  try {
    const json = JSON.stringify(tarefas, null, 2);
    await fs.writeFile(caminhoArquivo, json, 'utf-8');
  } catch (err) {
    console.error('Erro ao salvar tarefas:', err);
    throw err;
  }
}

// -------------------- CONTROLLERS -------------------- //

// Função para listar tarefas
export const listarTarefas = async (req, res) => {
  try {
    const tarefas = await lerTarefas();
    res.json(tarefas);
  } catch {
    res.status(500).json({ mensagem: 'Erro ao listar tarefas' });
  }
};

export const obterTarefaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefas = await lerTarefas();

    const tarefa = tarefas.find(t => t.id === parseInt(id));

    if (tarefa) {
      res.json(tarefa);
    } else {
      res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
  } catch {
    res.status(500).json({ mensagem: 'Erro ao buscar tarefa' });
  }
};

// Função para criar uma nova tarefa
export const criarTarefa = async (req, res) => {
  try {
    const { descricao } = req.body;
    const tarefas = await lerTarefas();

    // gera id sem repetir (pega o maior id e soma 1)
    const novoId = tarefas.length
      ? Math.max(...tarefas.map(t => t.id)) + 1
      : 1;

    const novaTarefa = { id: novoId, descricao };
    tarefas.push(novaTarefa);

    await salvarTarefas(tarefas);

    res.status(201).json(novaTarefa);
  } catch {
    res.status(500).json({ mensagem: 'Erro ao criar tarefa' });
  }
};

// Função para atualizar uma tarefa existente
export const atualizarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao } = req.body;

    const tarefas = await lerTarefas();

    const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));
    if (index !== -1) {
      tarefas[index].descricao = descricao;

      await salvarTarefas(tarefas);

      res.json(tarefas[index]);
    } else {
      res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
  } catch {
    res.status(500).json({ mensagem: 'Erro ao atualizar tarefa' });
  }
};

// Função para excluir uma tarefa
export const excluirTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefas = await lerTarefas();

    const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));
    if (index !== -1) {
      tarefas.splice(index, 1);

      await salvarTarefas(tarefas);

      res.json({ mensagem: 'Tarefa excluída com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
  } catch {
    res.status(500).json({ mensagem: 'Erro ao excluir tarefa' });
  }
};
