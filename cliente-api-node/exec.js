const { obterTarefas, criarTarefas, atualizarTarefa, excluirTarefa } = require('./cliente');

async function executarExemplos() {
  // Listar tarefas
  console.log('Listando tarefas:');
  const tarefas = await obterTarefas();
  console.log(tarefas);
  // Criar uma nova tarefa
  console.log('Criando uma nova tarefa:');
  const novaTarefa = await criarTarefas('Estudar Node.js');
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