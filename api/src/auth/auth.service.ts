import { Injectable } from '@nestjs/common';
import { from, map, Observable, ObservedValueOf, switchMap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { IUser } from './models/user.interface';
import { Role } from './models/role.enum';
import { UserDto } from './models/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  registerAccount(user: IUser): Observable<IUser> {
    const { firstName = '', lastName = '', email = '', password = '' } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: Role.USER,
          }),
        ).pipe(
          map((user: IUser) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }
  login(user: UserDto): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: IUser) => {
        if (user) {
          // create JWT - credentials
          return from(this.jwtService.signAsync({ user }));
        }
      }),
    );
  }
  validateUser(
    email: string,
    password: string,
  ): Observable<
    ObservedValueOf<
      Observable<{
        password: string;
        email: string;
      }>
    >
  > {
    return from(this.userRepository.findOneBy({ email })).pipe(
      switchMap((user) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              const { email, password } = user;
              return { email, password };
            }
          }),
        ),
      ),
    );
  }
}
