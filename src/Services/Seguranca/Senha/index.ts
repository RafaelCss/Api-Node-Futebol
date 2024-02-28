interface PropsEncryptSenha {
  gerarSenha: (senha: string) => string;
}

class EncryptSenha implements PropsEncryptSenha {
  #senha: string;
  constructor(senha: string) {
    this.#senha = '';
    this.gerarSenha(senha);
  }
  public gerarSenha(senha: string) {
    const encryptSenha = this.encryptSenha(senha);
    return this.#senha;
  }
  protected encryptSenha(senha: string) {
    this.#senha = senha;
  }
}
