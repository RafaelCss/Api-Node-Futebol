import { MongoClient } from 'mongodb';
import dotEnv from 'dotenv'
import { TabelaViewModel } from '../../Domain/Interfaces/TabelaCampeonato';

const dot = dotEnv.config()
const uri = process.env.DATABASE_URL;
const dbName = 'Teste';
const collectionName = 'TabelaCampeonato';

const client = new MongoClient(uri as string);


export async function recuperarDadosDaTabela(): Promise<any[]> {

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const dados = await collection.find().toArray();
    return dados;
  } catch (error) {
    console.error('Erro ao recuperar os dados da tabela:', error);
    throw error;
  } finally {
    await fecharConexao();
  }
}

export async function salvarDadosTabelaNoDataBase(lista: TabelaViewModel[]): Promise<string> {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    lista.forEach(async item =>
      await collection.insertOne(item as TabelaViewModel)
    )
    return `Dados salvos`
  } catch (error) {
    console.error('Erro ao salvar os dados na tabela:', error);
    throw error;
  } finally {
    await fecharConexao()
  }
}

async function fecharConexao() {
  await client.close();
}