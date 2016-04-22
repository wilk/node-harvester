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

describe('Harvest Clients', () => {
    it('should create a new client', async function (): Promise<void> {
        try {
            let client: IClient = await harvest.clients.create(clientConfig);

            console.log(client);

            expect(client).to.be.not.null;
            expect(client.id).to.be.a('number');
            expect(client.name).to.equal(clientConfig.name);
            expect(client.currency_symbol).to.equal(clientConfig.currency_symbol);
            clientId = client.id;
        }
        catch (err) {
            console.log(err);
            expect(err).to.be.null;
        }
    });

    it('should return the clients list', async function (): Promise<void> {
        try {
            let clients: IClient[]|Error = await harvest.clients.list();

            expect(clients).to.be.not.null;
            expect(clients).to.have.length.above(0);
        }
        catch (err) {
            expect(err).to.be.null;
        }
    });

    it('should return the created client', async function (): Promise<void> {
        try {
            let client: IClient = await harvest.clients.single(clientId);

            expect(client).to.be.not.null;
            expect(client.id).to.be.a('number');
            expect(client.name).to.equal(clientConfig.name);
            expect(client.currency_symbol).to.equal(clientConfig.currency_symbol);
        }
        catch (err) {
            expect(err).to.be.null;
        }
    });

    xit('should toggle the created client', async function (): Promise<void> {
        try {
            await harvest.clients.toggle(clientId);
        }
        catch (err) {
            expect(err).to.be.null;
        }
    });

    it('should delete the created client', async function (): Promise<void> {
        try {
            await harvest.clients.delete(clientId);
            let client: IClient = await harvest.clients.single(clientId);

            expect(client).to.be.null;
        }
        catch (err) {
            expect(err).to.be.not.null;
            expect(err).to.be.not.instanceOf(Error);
            expect(err.status).to.be.equal(404);
        }
    });
});