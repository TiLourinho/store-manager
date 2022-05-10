const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductService = require('../../../services/ProductService');
const ProductModel = require('../../../models/ProductModel');
const AuxiliaryFunctions = require('../../../utils/auxiliaryFunctions');

describe('2 - Camada ProductService:', () => {
  describe('Quando não há produtos cadastrados no BD', () => {
    describe('testa se a função "getAll"', () => {
      const data = [[]];

      before(() => {
        sinon.stub(connection, 'execute').resolves(data);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array', async () => {
        const result = await ProductService.getAll();
        expect(result).to.be.an('array');
      });
  
      it('retorna um array vazio', async () => {
        const result = await ProductService.getAll();
        expect(result).to.be.empty;
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
  
      before(() => {
        sinon.stub(connection, 'execute').resolves([data]);
      });
  
      after(() => {
        connection.execute.restore();
      });
  
      it('retorna um array', async () => {
        const result = await ProductService.getAll();
        expect(result).to.be.an('array');
      });
  
      it('retorna um array preenchido', async () => {
        const result = await ProductService.getAll();
        expect(result).to.be.not.empty;
      });
  
      it('retorna um array com objetos', async () => {
        const [result] = await ProductService.getAll();
        expect(result).to.be.an('object');
      });
  
      it('retorna um array em que os objetos inseridos nele possuam as chaves "id", "name" e "quantity"', async () => {
        const [result] = await ProductService.getAll();
        expect(result).to.have.all.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('Quando não há produtos cadastrados no BD', () => {
    describe('testa se a função "getById"', () => {
      const data = [[]];

      before(() => {
        sinon.stub(connection, 'execute').resolves(data);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna null', async () => {
        const result = await ProductService.getById();
        expect(result).to.be.equal(null);
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
  
      before(() => {
        sinon.stub(connection, 'execute').resolves([data]);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um array preenchido', async () => {
        const result = await ProductService.getById(1);
        expect(result).to.be.not.empty;
      });

      it('retorna um array com objetos', async () => {
        const result = await ProductService.getById(1);
        expect(result).to.be.an('object');
      });

      it('retorna um array em que os objetos inseridos nele possuam as chaves "id", "name" e "quantity"', async () => {
        const result = await ProductService.getById(1);
        expect(result).to.have.all.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('Quando não há produtos com o mesmo "name" cadastrados no BD', () => {
    describe('testa se a função "create"', () => {
      const data = [
        {
          "name": "Armadura do Homem de Ferro",
          "quantity": 1
        }
      ];

      before(() => {
        const registerId = [{ insertId: 1 }]
        sinon.stub(connection, 'execute').resolves(registerId);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um objeto', async () => {
        const result = await ProductService.create(data);
        expect(result).to.be.an('object');
      });

      it('retorna um objeto que possua as chaves "id", "name" e "quantity"', async () => {
        const result = await ProductService.create(data);
        expect(result).to.have.all.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('Testa se a função "update"', () => {
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

    it('retorna um objeto', async () => {
      const result = await ProductService.update(data);
      expect(result).to.be.an('object');
    });

    it('retorna um objeto que possua as chaves "id", "name" e "quantity"', async () => {
      const result = await ProductService.update(data);
      expect(result).to.have.all.keys('id', 'name', 'quantity');
    });
  });
});