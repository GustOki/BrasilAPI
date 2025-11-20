import axios from 'axios';
import { fetchCep } from '../../services/cep/cep';

jest.mock('axios');
jest.mock('cep-promise');

describe('Ciclo 1 — ViaCEP Exposure: "Cannot read properties of undefined"', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle ViaCEP undefined error and return standardized CepPromiseError', async () => {
    axios.get.mockRejectedValueOnce(
      new TypeError("Cannot read properties of undefined (reading 'replace')")
    );

    try {
      await fetchCep('002123-25');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
      
      expect(error.message).not.toContain('Cannot read properties');
      expect(error.message).not.toContain('reading');
      expect(error.message).not.toContain('undefined');
      
      expect(error.message).toMatch(/CEP|caracteres|validation/i);
      
      expect(error.type).toBeDefined();
      expect(error.errors).toBeDefined();
    }
  });
});