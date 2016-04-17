import {Expenses} from './lib/harvest/expenses';
import {Account} from './lib/harvest/account';
import {IHarvestConfig} from './lib/interfaces';
import {Gateway} from './lib/gateway';

export class Harvest {
    gateway: Gateway;
    expenses: Expenses;
    account: Account;

    constructor(config: IHarvestConfig) {
        this.gateway = new Gateway(`https://${config.account}.harvestapp.com`, config.username, config.password);
        this.expenses = new Expenses(this.gateway);
        this.account = new Account(this.gateway);
    }
}

export {IHarvestConfig} from './lib/interfaces';

/*harvest.expenses();
harvest.expenses.list();
harvest.expenses.categories();
harvest.expensesCategories();
harvest.accounts.list();*/