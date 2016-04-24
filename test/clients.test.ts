import {Harvest, IHarvestConfig, IClient} from '../index';
import * as chai from 'chai';
import * as config from 'config';
import ExpectStatic = Chai.ExpectStatic;

let expect: ExpectStatic = chai.expect,
    harvestCfg: IHarvestConfig = config.get<IHarvestConfig>('harvest'),
    harvest: Harvest = new Harvest(harvestCfg),
    clientConfig: IClient = {
        name: 'Test Client',
        currency: 'Europe Euro - EUR',
        currency_symbol: '€',
        details: '123 Via XXV Aprile, Italy 12345'
    },
    clientId: number;

describe('Harvest Clients', function (): void {
    it('should create a new client', async function (done: Function): Promise<void> {
        try {
            let client: IClient = await harvest.clients.create(clientConfig);

            expect(client).to.be.not.null;
            expect(client.id).to.be.a('number');
            expect(client.name).to.equal(clientConfig.name);
            expect(client.currency_symbol).to.equal(clientConfig.currency_symbol);
            clientId = client.id;
            done();
        }
        catch (err) {
            console.log(err);
            done(err);
        }
    });

    it('should return the clients list', async function (done: Function): Promise<void> {
        try {
            let clients: IClient[]|Error = await harvest.clients.list();

            expect(clients).to.be.not.null;
            expect(clients).to.have.length.above(0);
            done();
        }
        catch (err) {
            expect(err).to.be.null;
            done(err);
        }
    });

    it('should return the created client', async function (done: Function): Promise<void> {
        try {
            let client: IClient = await harvest.clients.single(clientId);

            expect(client).to.be.not.null;
            expect(client.id).to.be.a('number');
            expect(client.name).to.equal(clientConfig.name);
            expect(client.currency_symbol).to.equal(clientConfig.currency_symbol);
            done();
        }
        catch (err) {
            expect(err).to.be.null;
            done(err);
        }
    });

    xit('should toggle the created client', async function (done: Function): Promise<void> {
        try {
            await harvest.clients.toggle(clientId);
            done();
        }
        catch (err) {
            expect(err).to.be.null;
            done(err);
        }
    });

    it('should delete the created client', async function (done: Function): Promise<void> {
        try {
            await harvest.clients.delete(clientId);
            let client: IClient = await harvest.clients.single(clientId);

            expect(client).to.be.null;
            done();
        }
        catch (err) {
            expect(err).to.be.not.null;
            expect(err).to.be.not.instanceOf(Error);
            expect(err.status).to.be.equal(404);
            done(err);
        }
    });
});