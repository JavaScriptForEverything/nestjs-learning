import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTag {

	@IsString()
	@IsNotEmpty()
	name: 'tag sampl 1'

	@IsString()
	@IsNotEmpty()
	slug: 'tag-sampl-1'


	@IsString()
	description?: string

	@IsString()
	schema?: string

	@IsString()
	featuredImageUrl?: string


	@IsString({

	})
	createdAt: Date

	@IsString({
			
	})
	updatedAt: Date

	@IsString({
			
	})
	deletedAt: Date
}