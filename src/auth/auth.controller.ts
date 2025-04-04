import { Body, Controller, forwardRef, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './providers/auth.service'

@Controller('auth')
export class AuthController {

	constructor( 
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService
	) {}

	@Get('/login')
	public login (
		@Body() body: { email: string, password: string, id: number }
	) {
		return this.authService.login(body)
	}

}
