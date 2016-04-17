import {Gateway} from '../gateway';

export class Account {
    gateway: Gateway;

    constructor(gateway: Gateway) {
        this.gateway = gateway;
    }

    async whoami(): Promise<any|Error> {
        return new Promise<any|Error>(async function (resolve: Function, reject: Function): Promise<void> {
            try {
                let response: any = await this.gateway.get('/account/who_am_i');
                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        }.bind(this));
    }
}