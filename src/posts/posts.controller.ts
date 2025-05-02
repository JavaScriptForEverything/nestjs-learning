import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './providers/posts.service'
import { CreatePostBodyDTO, UpdatePostBodyDto } from './dtos/posts.dtos'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'


@Controller('posts')
export class PostsController {

	constructor( private readonly postService: PostService) {}

	@Get('/')
	public getPosts () {
		return this.postService.getPosts()
	}

	// @Get('/:userId')
	// public getPosts (
	// 	@Param('userId') userId: string
	// ) {
	// 	return this.postService.getPosts(userId)
	// }

	@Get('/:postId')
	public getPostById (
		@Param('postId', ParseIntPipe) postId: number
	) {
		return this.postService.getPostById(postId)
	}


	@ApiOperation({
		summary: 'create post' 		// add label to route's right side
	})
	@ApiResponse({
		status: 201,
		description: 'new post is created'
	})
	@Post('/')
	public createPost (
		@Body( new ValidationPipe()) body: CreatePostBodyDTO
	) {

		return this.postService.createPost(body)
	}


	@ApiOperation({
		summary: 'To update post' 		
	})
	@ApiResponse({
		status: 200,
		description: 'post is updated'
	})
	@Patch('/')
	public updatePost (
		// @Body( new ValidationPipe()) body: UpdatePostBodyDto
		@Body( new ValidationPipe()) body: UpdatePostBodyDto
	) {

		return body
	}


}
