import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import { ProfileService } from '../profile/profile.service';

@Injectable()
export class MasterOrAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private profileService: ProfileService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Getting userId from token
    const authToken = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ')[1];
    const userData: { userId: number; roles: string[] } =
      this.jwtService.verify(authToken, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

    //Admin section
    return userData.roles.includes('ADMIN');

    //Getting userId by accessed entity
    const profileMethods = ['deleteProfile', 'updateProfile'];

    const calledMethodName = context.getHandler().name;

    if (profileMethods.includes(calledMethodName)) {
      // Profiles section
      const profileId = context.switchToHttp().getRequest().params.id;
      const accessedProfile = await this.profileService.getProfileById(
        profileId,
      );
      return accessedProfile.userId == userData.userId;
    }
  }
}
