import { ResourceWithOptions } from 'adminjs';

import { Account } from '@/accounts/entities/account.entity';

import { mainNav } from '../navigation';

const AccountResource: ResourceWithOptions = {
  resource: Account,
  options: {
    navigation: mainNav,
  },
};

export default AccountResource;
