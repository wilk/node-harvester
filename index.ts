interface IHarvestOptions {
    subdomain: string;
    username: string;
    password: string;
}

export class Harvest {
    constructor(opts: IHarvestOptions) {
        console.log(opts);
    }
}

let harvest: Harvest = new Harvest({password: 'tst', subdomain: 'test', username: 'tst'});
console.log(harvest);
