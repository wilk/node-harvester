import {Gateway} from '../gateway';

export interface IClient {
    id?: number;
    name: string;
    active?: boolean;
    currency?: string;
    currency_symbol?: string;
    details?: string;
    highrise_id?: string;
    cache_version?: number;
    updated_at?: string;
    created_at?: string;
    default_invoice_timeframe?: string;
    last_invoice_kind?: string;
}

export class Clients {
    gateway: Gateway;

    constructor(gateway: Gateway) {
        this.gateway = gateway;
    }

    async list(): Promise<IClient[]|Error> {
        return new Promise<IClient[]|Error>(async function (resolve: Function, reject: Function): Promise<void> {
            try {
                let response: any = await this.gateway.get('/clients');
                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        }.bind(this));
    }

    async single(clientId: number): Promise<IClient|Error> {
        return new Promise<IClient|Error>(async function (resolve: Function, reject: Function): Promise<void> {
            try {
                let response: any = await this.gateway.get(`/clients/${clientId}`);
                resolve(response.data.client);
            }
            catch (err) {
                reject(err);
            }
        }.bind(this));
    }

    async create(client: IClient): Promise<IClient|Error> {
        return new Promise<IClient|Error>(async function (resolve: Function, reject: Function): Promise<void> {
            try {
                let response: any = await this.gateway.post('/clients', {client: client});
                client.id = parseInt(response.headers.location.replace('/clients/', ''));
                resolve(client);
            }
            catch (err) {
                reject(err);
            }
        }.bind(this));
    }

    async update(clientId: number, client: IClient): Promise<IClient|Error> {
        return new Promise<IClient|Error>(async function (resolve: Function, reject: Function): Promise<void> {
            try {
                let response: any = await this.gateway.put(`/clients/${clientId}`, client);
                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        }.bind(this));
    }

    async delete(clientId: number): Promise<void|Error> {
        return new Promise<void|Error>(async function (resolve: Function, reject: Function): Promise<void> {
            try {
                let response: any = await this.gateway.delete(`/clients/${clientId}`);
                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        }.bind(this));
    }

    async toggle(clientId: number): Promise<void|Error> {
        return new Promise<void|Error>(async function (resolve: Function, reject: Function): Promise<void> {
            try {
                let response: any = await this.gateway.delete(`/clients/${clientId}/toggle`);
                resolve(response.data);
            }
            catch (err) {
                reject(err);
            }
        }.bind(this));
    }
}