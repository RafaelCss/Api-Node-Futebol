import bcrypt from 'bcrypt';

interface PropsEncryptSenha {
  gerarSenha: (senha: string) => Promise<string>;
  checkUser: (senha: string, senhaHash: string) => Promise<boolean>;
}

 class EncryptSenha implements PropsEncryptSenha {
  #senha: string;
  constructor() {
    this.#senha = '';
  }
  /**
   * @description
   * função que retorna senha criptografada
   */
  public  async gerarSenha(senha: string) {
   const hashSenha =  await this.encryptSenha(senha);
    return hashSenha;
  }
  /**
   *
   * @param senha
   * senha a ser criptografada
   */
  protected async encryptSenha(senha: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);
   return this.#senha = hash;
  }
  /**
   * @param senha
   * senha vinda do front
   * @param senhaHash
   * hash da senha vinda do banco
   */
  public async checkUser(senha: string, senhaHash: string) {
    const match = await bcrypt.compare(senha, senhaHash);
    if (match) {
      return true;
    }
    return false;
  }
}

export default EncryptSenha;
