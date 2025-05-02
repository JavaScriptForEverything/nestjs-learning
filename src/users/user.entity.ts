import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	id: number

	@Column({
		type: 'varchar',
		length: 20,
		nullable: true,
	})
	name: string

	@Column({
		type: 'varchar',
		length: 20,
		nullable: true,
		unique: true
	})
	email: string

	@Column({
		type: 'varchar',
		length: 20,
		nullable: true,
	})
	password: string

	@Column({
		type: 'varchar',
		length: 20,
		nullable: false,
	})
	confirmPassword: string
}