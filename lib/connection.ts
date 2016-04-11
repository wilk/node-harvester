import * as IHarvestConfig from './interfaces';
import axios from 'axios';

export class Connection {
    config: IHarvestConfig;
    req: axios;
    
    constructor(config: IHarvestConfig) {
        this.config = config;
        this.req = axios;
    }
}