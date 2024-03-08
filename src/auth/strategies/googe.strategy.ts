import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

/**
 * TODO:
 * Move this config into a separate file
 */

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.GOOGLE_CLIENT_CALLBACK || 'http://localhost:3000'}/api/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  /**
   * Allows us to get the refresh token.
   * @see https://blog.stackademic.com/integrating-google-login-with-nestjs-using-passport-js-0f25e02e503b
   */
  public authorizationParams(): object {
    return {
      access_type: 'offline',
      prompt: 'consent',
    };
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<void> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
