// ...existing code...
const path = require('path');

// Ajuste do require para carregar o serviço a partir da raiz do repositório
const cepService = require(path.resolve(__dirname, '../../services/cep'));

describe('Ciclo 1 — ViaCEP expondo mensagens internas (RED)', () => {
  test('Quando ViaCEP lança erro interno, a API não deve expor mensagem técnica (ex: "Cannot read properties of undefined")', async () => {
    expect.assertions(2);
    try {
      // CEP mal formatado que, segundo a issue, causa erro interno
      await cepService('002123-25');
      // Se não lançar, falha o teste explicitamente
      throw new Error('Esperava rejeição para CEP mal formatado, mas a chamada foi resolvida.');
    } catch (err) {
      // 1) deve ser um erro
      expect(err).toBeInstanceOf(Error);
      // 2) mensagem não deve conter a mensagem técnica que está sendo exposta
      expect(err.message).not.toMatch(/Cannot read properties of undefined|reading 'replace'/i);
    }
  });
});
// ...existing code...