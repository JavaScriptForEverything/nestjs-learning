import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class PostMetaOption {

	@PrimaryGeneratedColumn()
	id: number

	// @Column({
	// 	type: 'json',
	// 	nullable: false
	// })
	// metaValue: string

	@Column()
	name: string

	@Column()
	slug: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}