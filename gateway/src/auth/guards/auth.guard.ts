import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { AppsService } from '@/apps/apps.service';

import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class AuthGuard extends JwtAuthGuard implements CanActivate {
  constructor(@Inject(AppsService) private readonly appsService: AppsService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.query.clientId) {
      return this.appsService
        .findOne({
          where: {
            clientId: request.query.clientId,
            originUrl: request.hostname.split('/')[0],
          },
        })
        .then((res) => Boolean(res));
    } else {
      return super.canActivate(context);
    }
  }
}
