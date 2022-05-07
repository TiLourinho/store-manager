const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');

describe('4 - Camada SalesModel:', () => {
  describe('Quando não há vendas cadastradas no BD', () => {
    describe('testa se a função "getAll"', () => {
      const data = [[]];

      before(() => {
        sinon.stub(connection, 'execute').resolves(data);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const result = await SalesModel.getAll();
        expect(result).to.be.an('array');
      });

      it('retorna um array vazio', async () => {
        const result = await SalesModel.getAll();
        expect(result).to.be.empty;
      });
    });
  });

  describe('Quando há vendas cadastradas no BD', () => {
    describe('testa se a função "getAll"', () => {
      const data = [
        {
          "saleId": 1,
          "date": "2022-05-07T22:51:52.000Z",
          "productId": 1,
          "quantity": 5
        }
      ];

      before(() => {
        sinon.stub(connection, 'execute').resolves([data]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const result = await SalesModel.getAll();
        expect(result).to.be.an('array');
      });
  
      it('retorna um array preenchido', async () => {
        const result = await SalesModel.getAll();
        expect(result).to.be.not.empty;
      });
  
      it('retorna um array com objetos', async () => {
        const [result] = await SalesModel.getAll();
        expect(result).to.be.an('object');
      });
  
      it('retorna um array em que os objetos inseridos nele possuam as chaves "saleId", "date", "productId" e "quantity"', async () => {
        const [result] = await SalesModel.getAll();
        expect(result).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('Quando há produtos cadastrados no BD', () => {
    describe('testa se a função "getById"', () => {
      const data = [[]];

      before(() => {
        sinon.stub(connection, 'execute').resolves(data);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna null', async () => {
        const result = await SalesModel.getById();
        expect(result).to.be.equal(null);
      });
    });
  });

  describe('Quando há produtos cadastrados no BD', () => {
    describe('testa se a função "getById"', () => {
      const data = [
        {
          "date": "2022-05-07T22:51:52.000Z",
          "productId": 1,
          "quantity": 5
        }
      ];
  
      before(() => {
        sinon.stub(connection, 'execute').resolves([data]);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um array preenchido', async () => {
        const result = await SalesModel.getById(1);
        expect(result).to.be.not.empty;
      });

      it('retorna um array com objetos', async () => {
        const [result] = await SalesModel.getById(1);
        expect(result).to.be.an('object');
      });

      it('retorna um array em que os objetos inseridos nele possuam as chaves "saleId", "date", "productId" e "quantity"', async () => {
        const [result] = await SalesModel.getById(1);
        expect(result).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });
});