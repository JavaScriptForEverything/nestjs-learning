import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PostMetaOptionsService } from './post-meta-options.service'
import { CreatePostMetaOptionDto } from './post-meta-options.dto'

@Controller('post-meta-options')
export class PostMetaOptionsController {

	constructor(
		private readonly postMetaOptionService: PostMetaOptionsService
	) {}

	@Post('/')
	public create(@Body( new ValidationPipe({ whitelist: true })) body: CreatePostMetaOptionDto) {
		return this.postMetaOptionService.createPostMetaOption(body)
	}
	@Get('/')
	public getAll() {
		return this.postMetaOptionService.getPostMetaOptions()
	}
}
