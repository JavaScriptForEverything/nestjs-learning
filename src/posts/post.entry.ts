import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { PostStatus, PostType } from './enums/post.enum'
import { CreatePostBodyDTO, PostBodyMetaOptionDTO } from './dtos/posts.dtos'

@Entity()
export class Post {

	@PrimaryGeneratedColumn()
	id: number

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false
	})
	title: string

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false
	})
	slug: string

  @BeforeInsert() 											// remove slug validation from dtos, use here instead
  generateSlug() {
    if (!this.slug && this.title) {
      this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
  }



	// @Column({
	// 	type: 'varchar',
	// 	length: 255,
	// 	nullable: false,
	// 	enum: PostType
	// })
	// type: PostType

	@Column({
		type: 'enum',
		enum: PostType,
		default: PostType.POST,
		nullable: false,
	})
	type: PostType


	// @Column({ type: 'varchar', length: 255, unique: true })
  // slug: string;



	// Method-1: with `enum` constrain, used for complex senerio
	// @Column({
	// 	type: 'varchar',
	// 	length: 255,
	// 	nullable: false,
	// 	enum: PostStatus
	// })
	// status: PostStatus

	// Method-2: (Recommended) with `enum` type 
  @Column({ 
		type: 'enum', 
		enum: PostStatus, 
		default: PostStatus.DRAFT 
	})
  status: PostStatus;



	@Column({
		type: 'text',
		nullable: true,
	})
	content: string


	@Column({
		type: 'text',
		nullable: true,
	})
	schema: string



	@Column({
		type: 'text',
		nullable: true,
	})
	featuredImageUrl: string


	@Column({
		type: 'timestamptz',
		nullable: false,
	})
	publishedOn: Date


	@Column({
		type: 'varchar',
		length: 50,
		nullable: false,
	})
	tags: string[]


	@Column({
		type: 'varchar',
		length: 50,
		nullable: false,
	})
	metaOptions: PostBodyMetaOptionDTO[] 	// metaOptions: [ metaOptionSchema ]
}