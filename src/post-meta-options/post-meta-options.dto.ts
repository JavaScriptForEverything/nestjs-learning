import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePostMetaOptionDto {

	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	slug: string
}