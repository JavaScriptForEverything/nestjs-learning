import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/providers/auth.service'

@Injectable()
export class UserService {

	constructor(
		@Inject(forwardRef( () => AuthService ))
		private readonly authService: AuthService
	) {}

	public findAll ( params: any, _limit: number, _page: number) {

		console.log({
			params,
			_limit,
			_page
		})

		return [
			{
				id: 1,
				name: 'user 1',
			},
			{
				id: 2,
				name: 'user 2',
			}
		]
	}


	public getUserById (userId: number) {

		return {
			id: userId,
			name: `user ${userId}`,
		}
	}

	public isAuthenticated () {
		return this.authService.isAuthenticated()
	}

}