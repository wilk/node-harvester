import {Harvest, IHarvestConfig, IClient} from '../index';
import * as chai from 'chai';
import * as config from 'config';
import ExpectStatic = Chai.ExpectStatic;

let expect: ExpectStatic = chai.expect,
    harvestCfg: IHarvestConfig = config.get<IHarvestConfig>('harvest'),
    harvest: Harvest = new Harvest(harvestCfg),
    clientConfig: IClient = {
        name: 'An Example Ltd',
        currency: 'Europe Euro - EUR',
        currency_symbol: '€',
        details: '123 Via XXV Aprile, Italy 12345'
    },
    clientId: number;

let errorHandlerBuilder: Function = function (done: Function, status: number): Function {
    return function (err: Error|any): void {
        if (err instanceof Error) return done(err);
        try {
            expect(err).to.be.not.instanceOf(Error);
            expect(err.status).to.not.equal(status);
            done();
        }
        catch (err) {
            done(err);
        }
    };
};

describe('Harvest Clients', function (): void {
    it('should create a new client', function (done: Function): void {
        harvest.clients.create(clientConfig)
            .then((client: IClient): void => {
                expect(client).to.be.not.null;
                expect(client.id).to.be.a('number');
                expect(client.name).to.equal(clientConfig.name);
                expect(client.currency_symbol).to.equal(clientConfig.currency_symbol);
                clientId = client.id;
                done();
            })
            .catch(errorHandlerBuilder(done, 200));
    });

    it('should return the clients list', function (done: Function): void {
        harvest.clients.list()
            .then((clients: IClient[]|Error): void => {
                expect(clients).to.be.not.null;
                expect(clients).to.have.length.above(0);
                done();
            })
            .catch(errorHandlerBuilder(done, 200));
    });

    it('should return the created client', function (done: Function): void {
        harvest.clients.single(clientId)
            .then(function (client: IClient): void {
                expect(client).to.be.not.null;
                expect(client.id).to.be.a('number');
                expect(client.name).to.equal(clientConfig.name);
                expect(client.currency_symbol).to.equal(clientConfig.currency_symbol);
                done();
            })
            .catch(errorHandlerBuilder(done, 200));
    });

    xit('should toggle the created client', function (done: Function): void {
        harvest.clients.toggle(clientId)
            .then((): void => {
                done();
            })
            .catch(errorHandlerBuilder(done, 200));
    });

    it('should delete the created client', function (done: Function): void {
        harvest.clients.delete(clientId)
            .then((): Promise<IClient|Error> => {
                return harvest.clients.single(clientId);
            })
            .then((client: IClient): void => {
                expect(client).to.be.null;
                done();
            })
            .catch(errorHandlerBuilder(done, 404));
    });
});