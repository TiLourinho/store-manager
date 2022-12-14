const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesService = require('../../../services/SalesService');
const SalesModel = require('../../../models/SalesModel');

describe('5 - Camada SalesService:', () => {
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
        const result = await SalesService.getAll();
        expect(result).to.be.an('array');
      });

      it('retorna um array vazio', async () => {
        const result = await SalesService.getAll();
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
        const result = await SalesService.getAll();
        expect(result).to.be.an('array');
      });
  
      it('retorna um array preenchido', async () => {
        const result = await SalesService.getAll();
        expect(result).to.be.not.empty;
      });
  
      it('retorna um array com objetos', async () => {
        const [result] = await SalesService.getAll();
        expect(result).to.be.an('object');
      });
  
      it('retorna um array em que os objetos inseridos nele possuam as chaves "saleId", "date", "productId" e "quantity"', async () => {
        const [result] = await SalesService.getAll();
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
        const result = await SalesService.getById();
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
        const result = await SalesService.getById(1);
        expect(result).to.be.not.empty;
      });

      it('retorna um array com objetos', async () => {
        const [result] = await SalesService.getById(1);
        expect(result).to.be.an('object');
      });

      it('retorna um array em que os objetos inseridos nele possuam as chaves "saleId", "date", "productId" e "quantity"', async () => {
        const [result] = await SalesService.getById(1);
        expect(result).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

  describe('Testa se a função "create"', () => {
    const data = [
      {
        "productId": 3,
        "quantity": 10
      }
    ];

    before(() => {
      sinon.stub(connection, 'execute').resolves([data]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const result = await SalesService.create(data);
      expect(result).to.be.an('object');
    });

    it('retorna um objeto que possua as chaves "id", "itemsSold"', async () => {
      const result = await SalesService.create(data);
      expect(result).to.have.all.keys('id', 'itemsSold');
    });
  });

  describe('Testa se a função "update"', () => {
    const data = [
      {
        "productId": 3,
        "quantity": 10
      }
    ];

    const registerId = [{ insertId: 1 }];

    before(() => {
      sinon.stub(connection, 'execute').resolves([registerId], [data]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um object', async () => {
      const result = await SalesService.update(registerId, data);
      expect(result).to.be.an('object');
    });

    it('retorna um objeto que possua as chaves "saleId", "itemUpdated"', async () => {
      const result = await SalesService.update(registerId, data);
      expect(result).to.have.all.keys('saleId', 'itemUpdated');
    });
  });
});