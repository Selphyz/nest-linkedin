import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from './models/user.interface';
import { from, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserDto } from './models/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() user: IUser): Observable<IUser> {
    return from(this.authService.registerAccount(user));
  }
  @Post('login')
  login(@Body() user: UserDto): Observable<{ token: string }> {
    return from(
      this.authService.login(user).pipe(map((jwt: string) => ({ token: jwt }))),
    );
  }
}
