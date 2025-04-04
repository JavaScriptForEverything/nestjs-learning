import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
	ParseIntPipe,
	DefaultValuePipe,
	ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/users.dto'
import { UserService } from './providers/users.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('users')
// @ApiTags('users') 						// to add swagger tags to override default one
export class UsersController {
	 
	constructor(private readonly userService: UserService) { }


	@Get('/authenticated')
	public isAuth() {
		return this.userService.isAuthenticated()
	}


  // @Get('/:userId')
  // public getUsers(
  //   @Param() params: { userId: string },
  //   @Query() query: { _page: number; _limit: number },
  // ) {
  //   console.log(params);
  //   console.log(query);
  //   return `GET to /users/${params.userId} ${query._page}`;
  // }

  // @Get('/:userId')
  // public getUsers(@Param('userId', ParseIntPipe) userId: number | undefined) {
  //   console.log(userId, typeof userId);

  //   return `GET to /users/${userId}`;
  // }

  // @Get('/:userId')
  // public getUsers(
	// 	@Param() params: any, 
	// 	@Query('_limit', new DefaultValuePipe(20), ParseIntPipe) _limit: number,
	// 	@Query('_page',  new DefaultValuePipe(1),  ParseIntPipe) _page: number,
	// ) {
  //   console.log(_limit, typeof _limit)
  //   console.log(_page, typeof _page)

  //   return `GET to /users/${params.id}`
  // }
  @Get('/')
  public getUsers(
		@Param() params: any, 
		@Query('_limit', new DefaultValuePipe(20), ParseIntPipe) _limit: number,
		@Query('_page',  new DefaultValuePipe(1),  ParseIntPipe) _page: number,
	) {
    return this.userService.findAll(params, _limit, _page)
  }

	 

	@Get('/:userId')
	public getUserById (
		@Param('userId', ParseIntPipe) userId: number
	) {
		return this.userService.getUserById(userId)
	}


  // @Post()
  // public createUser(@Body() body: any, @Headers() headers: any) {
  //   console.log(body);
  //   console.log(headers);
  //   return 'POST request to /users';
  // }

  @Post()
  public createUser(@Body(new ValidationPipe({ whitelist: true })) body: CreateUserDto ) {
  // public createUser(@Body() body: CreateUserDto ) {
    console.log(body);
    return 'POST request to /users';
  }
}
