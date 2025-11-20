// ...existing code...
const path = require('path');

// Ajuste do require para carregar o serviço a partir da raiz do repositório
const cepService = require(path.resolve(__dirname, '../../services/cep'));

describe('Ciclo 1 — ViaCEP expondo mensagens internas (RED)', () => {
  test('Quando ViaCEP lança erro interno, a API não deve expor mensagem técnica (ex: "Cannot read properties of undefined")', async () => {
    expect.assertions(2);
    try {
      await cepService('002123-25');
      throw new Error('Esperava rejeição para CEP mal formatado, mas a chamada foi resolvida.');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).not.toMatch(/Cannot read properties of undefined|reading 'replace'/i);
    }
  });
});
