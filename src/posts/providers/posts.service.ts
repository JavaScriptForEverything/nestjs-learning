import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service'
import { CreatePostBodyDTO } from '../dtos/posts.dtos'
import { Post } from '../post.entry'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PostService {

	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,

		private readonly userService: UserService,
	) {}

	public async getPosts() {
		let posts = await this.postsRepository.find({})

		return posts
	}

	public getPostById( postId: number) {
		return {
			id: postId,
			title: `post ${postId}`,
		}
	}


	public async createPost(body: CreatePostBodyDTO) {
		let post = this.postsRepository.create(body)
		post = await this.postsRepository.save(post)

		if(!post) return { error: 'post created failed' }

		return post
	}
}
