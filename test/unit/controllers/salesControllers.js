const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/SalesController');
const SalesService = require('../../../services/SalesService');

describe('6 - Camada SalesController:', () => {
  describe('Quando não há vendas cadastradas no BD', () => {
    describe('testa se a função "getAll"', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, 'getAll').resolves([]);
      });

      after(() => {
        SalesService.getAll.restore();
      });

      it('retorna o método "status" passando 200', async () => {
        await SalesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um array', async () => {
        await SalesController.getAll(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
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

      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, 'getAll').resolves(data);
      });

      after(() => {
        SalesService.getAll.restore();
      });

      it('retorna o método "status" passando 200', async () => {
        await SalesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um array', async () => {
        await SalesController.getAll(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });

  describe('Quando não há vendas cadastradas no BD', () => {
    describe('testa se a função "getById"', () => {
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, 'getById').resolves(null);
      });

      after(() => {
        SalesService.getById.restore();
      });

      it('retorna o método "status" passando 404', async () => {
        await SalesController.getById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um objeto', async () => {
        await SalesController.getById(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });

  describe('Quando há vendas cadastradas no BD', () => {
    describe('testa se a função "getById"', () => {
      const data = [
        {
          "date": "2022-05-07T22:51:52.000Z",
          "productId": 1,
          "quantity": 5
        }
      ];

      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(SalesService, 'getById').resolves(data);
      });

      after(() => {
        SalesService.getById.restore();
      });

      it('retorna o método "status" passando 200', async () => {
        await SalesController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um array', async () => {
        await SalesController.getById(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });

  describe('testa se a função "create"', () => {
    const data = [
      {
        "id": 3,
        "itemsSold": [
          {
            "productId": 3,
            "quantity": 8
          }
        ]
      }
    ];

    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'create').resolves(data);
    });

    after(() => {
      SalesService.create.restore();
    });

    it('retorna o método "status" passando 200', async () => {
      await SalesController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('retorna o método "json" contendo um array', async () => {
      await SalesController.create(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('testa se a função "update"', () => {
    const data = [
      {
        "saleId": "1",
        "itemUpdated": [
          {
            "productId": 2,
            "quantity": 12
          }
        ]
      }
    ];

    const request = {};
    const response = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'update').resolves(data);
    });

    after(() => {
      SalesService.update.restore();
    });

    it('retorna o método "status" passando 200', async () => {
      await SalesController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna o método "json" contendo um array', async () => {
      await SalesController.update(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});