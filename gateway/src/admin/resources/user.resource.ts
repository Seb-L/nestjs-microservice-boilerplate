import passwordFeature from '@adminjs/passwords';
import { ResourceWithOptions } from 'adminjs';
import * as bcrypt from 'bcrypt';

import { User } from '@/users/entities/user.entity';

import { mainNav } from '../navigation';

const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    properties: {
      encryptedPassword: { isVisible: false },
      twoFactorAuthenticationSecret: { isVisible: false },
    },
    navigation: mainNav,
  },
  features: [
    passwordFeature({
      properties: {
        password: 'password',
        encryptedPassword: 'password',
      },
      hash: (pass) => bcrypt.hash(pass, 10),
    }),
  ],
};

export default UserResource;
