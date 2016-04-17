import {Harvest, IHarvestConfig} from '../index';
import * as chai from 'chai';
import * as config from 'config';
import ExpectStatic = Chai.ExpectStatic;

let expect: ExpectStatic = chai.expect,
    harvestCfg: IHarvestConfig = config.get<IHarvestConfig>('harvest');

describe('Harvest Account', () => {
    it('should return info about the current user', async function (): Promise<void> {
        try {

            let harvest: Harvest = new Harvest(harvestCfg);
            let response: any = await harvest.account.whoami();
            expect(response).not.to.be.null;
            expect(response.company).not.to.be.null;
            expect(response.company.name).to.be.equal(harvestCfg.account);
        }
        catch (err) {
            expect(err).to.be.null;
        }
    });
});