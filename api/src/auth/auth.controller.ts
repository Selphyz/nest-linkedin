import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from './models/user.interface';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() user: IUser): Observable<IUser> {
    return from(this.authService.registerAccount(user));
  }
}
