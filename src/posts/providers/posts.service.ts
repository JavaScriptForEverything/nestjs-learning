import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service'

@Injectable()
export class PostService {

	constructor(private readonly userService: UserService) {}

	public getPosts(userId: string) {
		const user = this.userService.getUserById(Number(userId))
		return [
			{
				id: 1,
				title: 'post 1',
				user,
			},
			{
				id: 2,
				title: 'post 2',
				user,
			}
		]
	}

	public getPostById( postId: number) {
		return {
			id: postId,
			title: `post ${postId}`,
		}
	}
}
