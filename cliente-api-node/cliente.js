//Clientes.js

const axios = require('axios');
const URL_BASE = 'http://localhost:3000/api';
async function obterTarefas(){
    try{
        const response = await axios.get(`${URL_BASE}/tarefas`);
        return response.data;
    } catch (error){
        console.error('Erro ao obter tarefas:', error);
    }
}

async function criarTarefas(descricao){
    try{
        const response = await axios.post(`${URL_BASE}/tarefas`, {descricao});
        return response.data;
    }catch(error){
        console.error('Erro ao criar tarefa:', error);
    }
}

async function atualizarTarefa(id,descricao){
    try{
        const response = await axios.put(`${URL_BASE}/tarefas/${id}`, {descricao})
        return response.data;
    }catch (error){
        console.error('Erro ao atualizar tarefa:', error);
    }
}

async function excluirTarefa(id){
    try{
        const response = await axios.delete(`${URL_BASE}/tarefas/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir tarefa:', error);
    }
}

module.exports = {obterTarefas, criarTarefas, atualizarTarefa, excluirTarefa};


// cliente.js
const { obterTarefas, criarTarefa, atualizarTarefa, excluirTarefa } = require('./cliente');
async function executarExemplos() {
  // Listar tarefas
  console.log('Listando tarefas:');
  const tarefas = await obterTarefas();
  console.log(tarefas);
  // Criar uma nova tarefa
  console.log('Criando uma nova tarefa:');
  const novaTarefa = await criarTarefa('Estudar Node.js');
  console.log(novaTarefa);
  // Atualizar uma tarefa existente
  console.log('Atualizando uma tarefa existente:');
  const tarefaAtualizada = await atualizarTarefa(novaTarefa.id, 'Estudar Node.js e Express.js');
  console.log(tarefaAtualizada);
  // Excluir uma tarefa
  console.log('Excluindo uma tarefa:');
  const resultadoExclusao = await excluirTarefa(novaTarefa.id);
  console.log(resultadoExclusao);
}
executarExemplos();