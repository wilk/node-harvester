import * as Expenses from './lib/expenses';
import * as IHarvestConfig from './lib/interfaces';

export class Harvest {
    config: IHarvestConfig;
    expenses: Expenses;
    
    constructor(config: IHarvestConfig) {
        this.config = config;
        this.expenses = new Expenses(config);
    }
}

let harvest: Harvest = new Harvest({password: 'tst', subdomain: 'test', username: 'tst'});
console.log(harvest);


harvest.expenses();
harvest.expenses.list();
harvest.expenses.categories();
harvest.expensesCategories();
harvest.accounts.list();