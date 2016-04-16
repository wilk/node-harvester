import * as axios from 'axios';
import AxiosHttpBasicAuth = Axios.AxiosHttpBasicAuth;

export class Gateway {
    url: string;
    auth: AxiosHttpBasicAuth;
    req: any;
    
    constructor(url: string, username: string, password: string) {
        this.url = url;
        this.auth = {username: username, password: password};
        this.req = axios.create({
            baseURL: this.url,
            auth: this.auth
        });
    }
    
    get(url: string): any {
        return this.req.get(`${this.url}${url}`);
    }
}