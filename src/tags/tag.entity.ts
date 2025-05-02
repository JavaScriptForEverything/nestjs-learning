import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Tag {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		type: 'varchar',
		nullable: false
	})
	name: string

	@Column({
		type: 'varchar',
		nullable: false
	})
	slug: string

	@Column({
		type: 'text',
		nullable: true
	})
	description?: string

	@Column({
		type: 'text',
		nullable: true
	})
	schema?: string

	@Column({
		type: 'varchar',
		nullable: true
	})
	featuredImageUrl?: string


	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@DeleteDateColumn() 	// soft-delete
	deletedAt: Date
}