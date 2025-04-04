import { IsArray, IsEnum, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { PostStatus, PostType } from '../enums/post.enum'
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'

// type MetaOption = {
// 	[key: string]: string
// }

/* 
// Step-1: Create Types for post's body
export class PostBodyDTO {
	title: string
	type: PostType
	slug: string
	status: PostStatus
	content?: string
	schema?: string
	featuredImageUrl?: string
	publishedOn: Date
	tags: string[]
	metaOptions: MetaOption[]
}
*/

/*
// Step-2: Add validation on DTOs
export class PostBodyDTO {
	@IsString() 					// type: String,
	@MinLength(3) 				// minLength: true,
	@IsNotEmpty() 				// required: true,
	title: string

	@IsEnum(PostType) 		// enums: Object.values( PostType )
	@IsNotEmpty() 				
	type: PostType

	@IsString() 					
	@IsNotEmpty() 				
	@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 							// validate: function(value) { return  }
		message: 'slug-allow-small-letter-without-space'
	})
	slug: string

	@IsEnum(PostStatus) 		
	@IsNotEmpty() 				
	status: PostStatus

	@IsString() 					
	@IsOptional() 									// required: false
	content?: string

	@IsOptional() 									// required: false
	@IsJSON() 											// json string, not regular string
	schema?: string

	@IsOptional() 									
	@IsUrl() 												// url string
	featuredImageUrl?: string

	@IsISO8601() 										// type: Date, 	but in ISO format
	@IsOptional() 									
	publishedOn: Date

	@IsOptional() 									
	@IsArray() 											// [{ type: String }]
	@IsString({ each: true }) 			// Check every item String
	@MinLength(3, { each: true }) 	// apply for every item
	tags: string[]

	// metaOptions?: MetaOption[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true }) 				// To validate nested DTOs Object
	@Type(() => PostBodyMetaOptionDTO)
	metaOptions?: PostBodyMetaOptionDTO[] 	// metaOptions: [ metaOptionSchema ]
}
class PostBodyMetaOptionDTO {
	@IsString()
	@IsNotEmpty()
	key: string

	@IsNotEmpty()
	value: any
}
*/

// Step-3: Documentation: Decorator for Swagger API 
export class CreatePostBodyDTO {
	// @ApiProperty() 				// for mandatory field 
	@ApiProperty({
		example: 'my post title', 												// provide value, instead of property type
		description: 'explain why title for in details' 	// provide explaination
	}) 				
	@IsString() 					
	@MinLength(3) 				
	@IsNotEmpty() 				// required: true,
	title: string

	@ApiProperty({
		// example: 'this is title', 												// provide value, instead of property type
		enum: PostType, 																		// automatically set one for example too
		description: 'explain ...' 	
	}) 				
	@IsEnum(PostType) 		// enums: Object.values( PostType )
	@IsNotEmpty() 				
	type: PostType

	@ApiProperty({
		example: 'slug-allow-small-letter-without-space',
	}) 				
	@IsString() 					
	@IsNotEmpty() 				
	@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 							// validate: function(value) { return  }
		message: 'slug-allow-small-letter-without-space'
	})
	slug: string

	@ApiProperty({
		enum: PostStatus
	}) 				
	@IsEnum(PostStatus) 		
	@IsNotEmpty() 				
	status: PostStatus

	@ApiPropertyOptional({
		example: 'content goes here ...'
	})
	@IsString() 					
	@IsOptional() 									// required: false
	content?: string

	@ApiPropertyOptional({
		example: '"{\"name\":\"riajul\",\"age\":30}"'
	})
	@IsOptional() 									// required: false
	@IsJSON() 											// json string, not regular string
	schema?: string

	@ApiPropertyOptional({
		example: 'http://image.jpg'
	})
	@IsOptional() 									
	@IsUrl() 												// url string
	featuredImageUrl?: string

	@ApiPropertyOptional({
		example: '2025-04-04T10:23:31.502Z'
	})
	@IsISO8601() 										// type: Date, 	but in ISO format
	@IsOptional() 									
	publishedOn: Date

	@ApiPropertyOptional({
		example: ['one', 'two']
	})
	@IsOptional() 									
	@IsArray() 											// [{ type: String }]
	@IsString({ each: true }) 			// Check every item String
	@MinLength(3, { each: true }) 	// apply for every item
	tags?: string[]

	// metaOptions?: MetaOption[]

	@ApiPropertyOptional({
		type: 'array',
		required: false,
		items: {
			type: 'object',
			properties: {
				key: {
					type: 'string',
					example: 'isOpen',
					description: 'any string value',
				},
				value: {
					type: 'any',
					example: true,
					description: 'any value',
				},

			}
		}
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true }) 				// To validate nested DTOs Object
	@Type(() => PostBodyMetaOptionDTO)
	metaOptions?: PostBodyMetaOptionDTO[] 	// metaOptions: [ metaOptionSchema ]
}
class PostBodyMetaOptionDTO {
	@IsString()
	@IsNotEmpty()
	key: string

	@IsNotEmpty()
	value: any
}



/*
// Step-1: Add extra properites
export class UpdatePostBodyDto {

	@ApiProperty()
	@IsInt()
	@IsNotEmpty()
	id: number

}
*/


// Step-2: inherit from CreatePostBodyDTO
export class UpdatePostBodyDto extends PartialType(CreatePostBodyDTO) {

	@ApiProperty()
	@IsInt()
	@IsNotEmpty()
	id: number

}