import { MongoClient } from 'mongodb';
import dotEnv from 'dotenv'
const dot = dotEnv.config()



export async function recuperarDadosDaTabela(): Promise<any[]> {
  const uri = process.env.DATABASE_URL;
  const dbName = 'Teste';
  const collectionName = 'TabelaCampeonato';

  const client = new MongoClient(uri as string);

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
    await client.close();
  }
}
