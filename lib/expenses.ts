import * as Connection from './connection';

export class Expenses extends Connection {
    list(): Connection.axios.Promise {
        return this.req.get();
    }
}