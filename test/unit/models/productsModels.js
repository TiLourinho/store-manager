const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductModel = require('../../../models/ProductModel');

describe('Camada ProductModel:', () => {
  describe('Testa se a função "getAll"', () => {
    const data = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ];

    before(() => {
      sinon.stub(connection, 'execute').resolves([data]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await ProductModel.getAll();
      expect(result).to.be.an('array');
    });

    it('retorna um array preenchido', async () => {
      const result = await ProductModel.getAll();
      expect(result).to.be.not.empty;
    });

    it('retorna um array com objetos', async () => {
      const [result] = await ProductModel.getAll();
      expect(result).to.be.an('object');
    });

    it('retorna um array em que os objetos inseridos nele possuam as chaves "id", "name" e "quantity"', async () => {
      const [result] = await ProductModel.getAll();
      expect(result).to.have.all.keys('id', 'name', 'quantity');
    });
  });

});