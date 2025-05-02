import { Injectable } from '@nestjs/common';
import { CreatePostBodyDTO, PostBodyMetaOptionDTO } from 'src/posts/dtos/posts.dtos'
import { Repository } from 'typeorm'
import { PostMetaOption } from './post-meta-options.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePostMetaOptionDto } from './post-meta-options.dto'

@Injectable()
export class PostMetaOptionsService {

	constructor(
		@InjectRepository(PostMetaOption)
		private readonly postMetaOptionRepository: Repository<PostMetaOption>
	){}

	public async createPostMetaOption (body: CreatePostMetaOptionDto) {
		let postMetaOption = this.postMetaOptionRepository.create(body)
		postMetaOption = await this.postMetaOptionRepository.save(postMetaOption)

		return postMetaOption
	}

	public async getPostMetaOptions () {
		const postMetaOption = await this.postMetaOptionRepository.find({})

		return postMetaOption
	}
}
