import * as axios from 'axios';

export class Gateway {
    url: string;
    req: any;
    
    constructor(url: string) {
        this.url = url;
        this.req = axios;
    }
    
    get(url: string): any {
        return this.req.get(`${this.url}${url}`);
    }
}