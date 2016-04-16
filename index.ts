import {Expenses} from './lib/harvest/expenses';
import {IHarvestConfig} from './lib/interfaces';
import {Gateway} from './lib/gateway';

export class Harvest {
    gateway: Gateway;
    expenses: Expenses;

    constructor(config: IHarvestConfig) {
        this.gateway = new Gateway(`https://${config.account}.harvestapp.com`, config.username, config.password);
        this.expenses = new Expenses(this.gateway);
    }
}

let harvest: Harvest = new Harvest({password: 'tst', account: 'test', username: 'tst'});
harvest.expenses.list();


/*harvest.expenses();
harvest.expenses.list();
harvest.expenses.categories();
harvest.expensesCategories();
harvest.accounts.list();*/