import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {

	@IsString() 							// type: String
	@MinLength(3) 						// minlength: 3
	@MaxLength(50) 						// maxlength: 50
	@IsNotEmpty() 						// required: true
	name = "riajul islam"

	@IsEmail()
	@MinLength(3)
	@MaxLength(50)
	@IsNotEmpty()
	email = "riajul@gmail.com"

	@IsString()
	@MinLength(8)
	@MaxLength(50)
	@IsNotEmpty()
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
	password = "asdfasdf"

	@IsString()
	@MinLength(3)
	@MaxLength(50)
	@IsNotEmpty()
	confirmPassword = "asdfasdf"
}