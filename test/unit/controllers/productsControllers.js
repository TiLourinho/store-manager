const { expect } = require('chai');
const sinon = require('sinon');
const ProductController = require('../../../controllers/ProductController');
const ProductService = require('../../../services/ProductService');

describe('3 - Camada ProductController:', () => {
  describe('Quando não há produtos cadastrados no BD', () => {
    describe('testa se a função "getAll"', () => {
      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves([]);
      });

      after(() => {
        ProductService.getAll.restore();
      });

      it('retorna o método "status" passando 200', async () => {
        await ProductController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um array', async () => {
        await ProductController.getAll(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });

  describe('Quando há produtos cadastrados no BD', () => {
    describe('testa se a função "getAll"', () => {
      const data = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        }
      ];

      const request = {};
      const response = {};

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getAll').resolves(data);
      });

      after(() => {
        ProductService.getAll.restore();
      });

      it('retorna o método "status" passando 200', async () => {
        await ProductController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um array', async () => {
        await ProductController.getAll(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });

  describe('Quando não há produtos cadastrados no BD', () => {
    describe('testa se a função "getById"', () => {
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(null);
      });

      after(() => {
        ProductService.getById.restore();
      });

      it('retorna o método "status" passando 404', async () => {
        await ProductController.getById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um objeto', async () => {
        await ProductController.getById(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });

  describe('Quando há produtos cadastrados no BD', () => {
    describe('testa se a função "getById"', () => {
      const data = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        }
      ];

      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(data);
      });

      after(() => {
        ProductService.getById.restore();
      });

      it('retorna o método "status" passando 200', async () => {
        await ProductController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um array', async () => {
        await ProductController.getById(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });

  describe('Quando não há produtos com o mesmo "name" cadastrados no BD', () => {
    describe('testa se a função "create"', () => {
      const request = {};
      const response = {};

      before(() => {
        request.body = [
          {
            "name": "Armadura do Homem de Ferro",
            "quantity": 1
          }
        ];
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductService, 'create').resolves(request.body);
      });
  
      after(() => {
        ProductService.create.restore();
      });

      it('retorna o método "status" passando 201', async () => {
        await ProductController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('retorna o método "json" contendo um array', async () => {
        await ProductController.create(request, response);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });
});