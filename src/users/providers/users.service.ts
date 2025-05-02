import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/providers/auth.service'
import { Repository } from 'typeorm'
import { User } from '../user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../dtos/users.dto'

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,

		@Inject(forwardRef( () => AuthService ))
		private readonly authService: AuthService
	) {}

	public async createUser(body: CreateUserDto) {
		let user = this.usersRepository.create(body)
		user = await this.usersRepository.save(user)

		return user
	}

	public async findAll( params: any, _limit: number, _page: number) {

		return await this.usersRepository.find()

		// console.log({
		// 	params,
		// 	_limit,
		// 	_page
		// })

		// return [
		// 	{
		// 		id: 1,
		// 		name: 'user 1',
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'user 2',
		// 	}
		// ]
	}


	public async getUserById (userId: number) {

		// const user = await this.usersRepository.findOne({
		// 	where: {
		// 		id: userId
		// 	}
		// })
		const user = await this.usersRepository.findOneBy({
			id: userId
		})

		if(!user) return { message: 'No user found' }

		return user
	}

	public isAuthenticated () {
		return this.authService.isAuthenticated()
	}

}