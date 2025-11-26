import { promises as fs } from 'fs';

import path from 'path';

//Caminho absoluto para o arquivo tarefas.json
const caminhoArquivo = path.resolve('data', 'tarefas.json');

//Lê todas as tarefas do arquivo
export async function lerTarefas(){
    try{
        const dados = await fs.readFile(caminhoArquivo, 'utf-8');
        return JSON.parse(dados);
    }catch (err){
        //Se o arquivo não existir ou der problema, volta lista vazia
        console.error('Erro ao ler tarefas:', err);
        return [];
    }
}

//Salva a lista de tarefas no arquivo 

export async function salvarTarefas(tarefas){
    try{
        const json = JSON.stringify(tarefas, null, 2);
        await fs.writeFile(caminhoArquivo, json, 'utf-8');
    }catch (err){
        console.error('Erro ao salvar tarefas:', err)
    }
}
