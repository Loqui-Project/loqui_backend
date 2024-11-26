import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { Public } from '@/common/decorators';
import { ZodPipe } from '@/common/pipe/zod.pipe';
import {
  SignInSchema,
  SignInSchemaType,
  SignUpSchema,
  SignUpSchemaType,
} from '../schema';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse({
    status: 201,
    description: 'Sign In Successfuly',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
      },
    },
  })
  signIn(@Body(new ZodPipe(SignInSchema)) signInDto: SignInSchemaType) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({
    status: 201,
    description: 'Sign Up Successfuly',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        refresh_token: { type: 'string' },
      },
    },
  })
  signUp(@Body(new ZodPipe(SignUpSchema)) body: SignUpSchemaType) {
    return this.authService.signUp(body);
  }
}
