import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { AuthService } from '../../auth';
import { TokenExpiry } from '../../auth/guards/token-expiry.guard';

@Controller('auth/google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  @UseGuards(AuthGuard('google'))
  public googleLogin(): void {}

  @Get('/callback')
  @UseGuards(AuthGuard('google'))
  public googleProviderCallback(@Req() req: any, @Res() res: Response): void {
    // Extract the tokens from the request object
    const googleToken = req.user.accessToken;
    const refreshToken = req.user.refreshToken;

    // These are using to set the tokens into cookies in the client's browser
    res.cookie('access_token', googleToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    res.redirect(process.env.FRONTEND || 'http://localhost:5173');
  }

  @UseGuards(TokenExpiry)
  @Get('/profile')
  public async getProfile(@Req() req: Request): Promise<any> {
    const token = req.cookies['access_token'];
    return this.authService.getProfile(token);
  }

  @Get('/logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    const refreshToken = req.cookies['refresh_token'];
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    // revoke the refresh token from google itself.
    this.authService.revokeGoogleToken(refreshToken);
    res.redirect(process.env.FRONTEND || 'http://localhost:5173');
  }
}
