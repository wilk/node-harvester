import {Gateway} from '../gateway';

export class Expenses {
    gateway: Gateway;

    constructor(gateway: Gateway) {
        this.gateway = gateway;
    }

    list(): any {
        return this.gateway.get('/expenses');
    }
}