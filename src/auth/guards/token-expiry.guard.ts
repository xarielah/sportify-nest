import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenExpiry implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['access_token'];

    // Check if the token is expired
    if (await this.authService.isTokenExpired(accessToken)) {
      // Get the refresh token from the cookies
      const refreshToken = request.cookies['refresh_token'];

      // If the refresh token is not found, throw an error
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token not found');
      }

      try {
        // Get a new access token using the refresh token
        const newAccessToken =
          await this.authService.getNewAccessToken(refreshToken);

        // Set the new access token in the cookies then later be set in the client's browser
        request.res.cookie('access_token', newAccessToken, { httpOnly: true });

        // Set the new access token in the request object
        request.cookies['access_token'] = newAccessToken;
      } catch (error) {
        throw new UnauthorizedException('Failed to refresh the access token');
      }
    }

    return true;
  }
}
