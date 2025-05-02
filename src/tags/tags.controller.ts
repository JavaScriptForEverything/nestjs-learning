import { Body, Controller, DefaultValuePipe, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateTag } from './tags.dto'
import { TagsService } from './tags.service'

@Controller('tags')
export class TagsController {
	constructor(
		private readonly tagService: TagsService
	){}


	@Get()
	public getTags() {
		// return {
		// 	tags: []
		// }
		return this.tagService.handleGetTags()
	}

	@Post('/')
	public addTag(
		// @Body( new ValidationPipe()) body: CreateTag
		@Body( new ValidationPipe({ whitelist: true })) body: CreateTag
	) {
		return this.tagService.handleAddTag(body)
	}

}
