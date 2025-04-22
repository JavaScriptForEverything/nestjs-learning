## Nestjs Learning | NestJS_Masterclass_NodeJS_Framework_Backend_Development

```
$ yarn dev
$ yarn start

(browser) http://localhost:3000                 : App
(browser) http://localhost:3000/api             : Swagger API Documentation


$ yarn doc

(browser) http://localhost:3001                 : CompoDoc API Documentation


$ docker compose up -d
(browser) http://localhost:5050                 : PostgreSQL DB with pgAdmin

        Email           : admin@admin.com
        Password        : admin123

$ docker container exec -it postgres_container bash
$ psql --version
$ pg_ctl --version
```


Nest.js
	- is nodejs framework
	- it is follows Angular pattern for backend node framework
	- it is typescript project ( pre-built for Node.js )
	- has pre-defined structure, which force developers to maintain same pattern, to work large scale application

	- NestJs used `Express` under the hood. so all express routes will work for nestjs too.

	Mongoose + Monbodb
	TypeORM + Postgress



NestJs
	- Routing
	- Middleware
	- Exception Handling
	- Testing
	- Documentation
	- Plugins



$ node -v 																: =>
$ npm -v 																	: =>

$ npm install -g @nestjs/cli 							: install globally
$ nest --version 													: =>
$ nest --help 														: ...
$ nest generate --help 										: help for sub-command


--dry-run 			: Simulate command without effecting changes, just for visualizing what it will be going to do.
								: once happy with that then remove `--dry-run` to perform that task.

	$ nest new my-app --dry-run 						: instead of generate project files, it just simulate files



$ nest --help
$ nest new <project-name> 								: $ next new my-app
$ nest generate <element-name> <name> 		: $ nest generate module users








$ nest new my-app           							: => $ yarn create next-app

$ code my-app
$ yarn start:dev 													: => $ yarn dev
$ curl localhost:3000 										: => ...


		$ nest generate module users           							: => users.module.ts
		$ nest generate controller users 	--no-spec       	: => users.controller.ts
		$ nest generate service users 		--no-spec         : => users.service.ts



|----------[ Modules ]---------- 																																		|

Modules:
	-

├── app.module.ts 							: entry file 	for app module, 		: like app/index.ts: connect all files
├── app.controller.ts 					: controller 	for app module 			: For Route logics 						: /routes/userRoute.ts
├── app.service.ts 							: service 		for app module 			: Move controller functions 	: /controllers/userController.ts
├── app.controller.spec.ts 			: controller 	for test app module : For testing
|
├── user.entry.ts 							: entry file for user TypeORM (SQL Database)
├── user.schema.ts 							: schema file for user model 	(Mongoose MongoDB database)
|
└── main.ts


 ├── src
    │ ├── main.ts
    │ │
    │ ├── app.module.ts					: app.module.ts => main.ts
    │ 	├── user.module.ts 			: user.module.ts => app.module.ts
    │ 	├── post.module.ts 			: post.module.ts => app.module.ts


User Created Module:


	Step-1: Creating /users/users.module.ts

			import { Module } from '@nestjs/common';

			@Module({})
			export class UsersModule {}


	Step-2: Connecting users.module.ts 	=>  /app/app.module.ts

			import { Module } from '@nestjs/common';
			import { AppController } from './app.controller';
			import { AppService } from './app.service';
			import { UsersModule } from 'src/users/users.module';

			@Module({
			  imports: [
			  	UsersModule
			  ],

			  controllers: [AppController],
			  providers: [AppService],
			})
			export class AppModule {}


User Generated Module:

		$ nest generate module users --dry-run 							: See what will be done
		$ nest generate module users           							: See users module generated and added in app.module.ts file too

---------------------------

User Created Controller:


	Step-1: Creating /users/users.controller.ts

			import { Controller } from '@nestjs/common';

			@Controller('users') 																			(1) : => http://localhost:3000/users
			export class UsersController {}


	Step-2: Connecting users.controller.ts 	=>  /users/users.module.ts

			import { Module } from '@nestjs/common';
			import { UsersController } from './users.controller';

			@Module({
			  controllers: [UsersController], 												(2)	: Connect controller with Module
			})
			export class UsersModule {}


	Step-3: Add getUsers Method to /users/users.controller.ts

			import { Controller, Get } from '@nestjs/common';

			@Controller('users') 																			(3.3) :  => http://localhost:3000/users
			export class UsersController {

			  @Get() 																									(3.2) : make bellow method as GET and connect with @Controller('users')
			  public getUsers() { 																		(3.1) : Create A method 'getUsers'
			    return 'get request to /users';
			  }

			}

			$ curl http://localhost:3000/users 															: =>  'get request to /users'



User Generated Controller:

		$ nest generate controller users --dry-run
		$ nest generate controller users --no-spec --dry-run 						: Not create users.controller.spec.ts
		$ nest generate controller users --no-spec




Get Params: 	/users/users.controller.ts 		with `@Param()` decorator

			import { Controller, Get, Param, Post } from '@nestjs/common';

			@Controller('users')
			export class UsersController {

			  @Get('/:userId') 																						(1)	: pass params in @Get('/:userId') decorator
			  public getUsers(@Param() params: { userId: string }) { 			(2) : access params with @Params() decorator + Types
			    return `GET to /users/${params.userId}`; 									(3) : Get params
			  }

			  @Post()
			  public createUser() {
			    return 'POST request to /users';
			  }
			}

			$ curl GET http://localhost:3000/users/1


Get Query: 	/users/users.controller.ts 		with `@Query()` decorator

			import { Controller, Get, Param, Post, Query } from '@nestjs/common';

			@Controller('users')
			export class UsersController {

			  @Get('/:userId')
			  public getUsers(@Param() params: { userId: string }, @Query() query: { _page: number; _limit: number }, ) {
			    console.log(params);
			    console.log(query);
			    return `GET to /users/${params.userId} ${query._page}`;
			  }


			  @Post()
			  public createUser() {
			    return 'POST request to /users';
			  }
			}

			$ curl GET http://localhost:3000/users/1?_page=2&_limit=20



Post Query: 	/users/users.controller.ts 		with `@Body()` decorator

			import type { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
			import type { Request } from 'express'

			@Controller('users')
			export class UsersController {

			  @Get('/:userId')

			  // Method-1:
			  @Post()
			  public createUser( @Body() body: { name: string }) { 				: Access body directly with `@Body()` decorator
			    console.log(body);
			    return 'POST request to /users';
			  }

			  // Method-2:
			  @Post()
			  public createUser(@Req() req: Request) { 										: Access req object with `@Req()` decorator + Types express
			    console.log(req.body);
			    return 'POST request to /users';
			  }
			}

	/users.post.controller.http

			POST http://localhost:3000/users
			Content-Type: application/json
			{
				"name": "riajul islam"
			}



Limit Param: 	/users/users.controller.ts 		with `@Param('filter')` decorator

			@Controller('users')
			export class UsersController {

			  @Get('/:userId/:reviewId?') 																(1)	: pass 2 params
			  public getUsers(@Param('userId') userId: string { 					(2) : but only get one by passing them to @Param('userId')
			    return `GET to /users/${userId}`; 												(3) : Get userId only
			  }

			  @Post()
			  public createUser() {
			    return 'POST request to /users';
			  }
			}

Get Headers: 	/users/users.controller.ts 		with `@Headers()` decorator

  @Post()
  public createUser(@Body() body: any, @Headers() headers: any) {
    console.log(body);
    console.log(headers);
    return 'POST request to /users';
  }

---------------------------


|----------[ Pipeline ]---------- 																																	|

Pipeline:
	- Request dosen't go directly to controller, it go through number of pipelines.
	- Pipe handle 2 task

		1. Validation 			:
		2. Transformation 	:


				Request -> Middleware -> Filter -> Response

				Filter:
					- Starter Filter
					- Guards
					- Interceptors
					- Pipes
					- Controller
					- Interceptors
					- Filters End

Built-in Pipes:
	- ParseIntPipe 				: Int 		: @Param('userId', ParseIntPipe) userId: number
	- ParseFloatPipe 			: Float
	- ParseBoolPipe 			: Bool
	- ParseArrayPipe 			: Array
	- ParseUUIDPipe 			: UUID
	- ParseEnumPipe 			: Enum
	- ParseFilePipe 			: File
	- ParseDatePipe 			: Date

	- DefaultValuePipe 		: @Query('_limit', new DefaultValuePipe(20), ParseIntPipe) _limit: number
	- ValidationPipe 			: @Body( new ValidationPipe({ whiteList: true } body: CreateUserDto ))

			whiteList: true 						: Filter out those properties, that not exist in DTO
			forbitNonWhiteList: true 		: throw error if those properties, that not exist in DTO
			transform: true 						: instead of type, it create instance of that class





ParseIntPipe:
	- just pass 'ParseIntPipe' as middleware function. it will parse or throw error


			import { Get, Param, ParseIntPipe, ... } from '@nestjs/common';


			...
		  @Get('/:userId')
		  public getUsers(@Param('userId') userId: string) {
		    console.log(userId, typeof userId); 										// => string

		    return `GET to /users/${userId}`;
		  }

			...
		  @Get('/:userId')
		  public getUsers(@Param('userId', ParseIntPipe) userId: number) {
		    console.log(userId, typeof userId); 										// => number

		    return `GET to /users/${userId}`;
		  }
		  ...


DefaultValuePipe():
	- To pass default value `new DefaultValuePipe( <value> )` as middleware

			import { Get, Param, ParseIntPipe, DefaultValuePipe ... } from '@nestjs/common';

		  ...
		  @Get('/:userId')
		  public getUsers(
				@Param() params: any,
				@Query('_limit', new DefaultValuePipe(20), ParseIntPipe) _limit: number
			) {
		    console.log(_limit, typeof _limit); 										// => _limit=20

		    return `GET to /users/${params.id}`;
		  }
		  ...



|----------[ DTOs ]---------- 																																			|

DTOs 	(Data Transform Object)
	- To validate params, query or body, or modify response object.


- NestJs uses 'class-validator' library for transfrom (Validate) Controller incomming data

	$ yarn add class-validator class-transformer


Register User Validate with DTO:

	Step-1: Creating /users.dto.ts

			import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

			export class CreateUserDto {

				@IsString() 							// type: String
				@MinLength(3) 						// minlength: 3
				@MaxLength(50) 						// maxlength: 50
				@IsNotEmpty() 						// required: true , 		[ missing unique, validate, ... ]
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


	Step-2: Apply /users.dto.ts to users/users.controller.ts file

		1. use `new ValidationPipe()` decorator to get validation error from 'class-validation' library
		2. use `CreateUserDto` type apply error to 'class-transform' library, from where NestJs catches error

			...
			import {
			  Controller,
			  Post,
			  Body,

				ValidationPipe,

			} from '@nestjs/common';

			import { CreateUserDto } from './users.dto' 						(1)

			@Controller('users')
			export class UsersController {

			  @Post() 												(3) 											(2)
		//	public createUser( @Body( new ValidationPipe() ) body: CreateUserDto ) {
			  public createUser( @Body( new ValidationPipe({ whiteList: true }) ) body: CreateUserDto ) {

			    console.log(body); 						// => remove those properties not availalbe in CreateUserDto class

			    return 'POST request to /users';
			  }
			}
			...


	Step-3: Global ValidationPipe
		- Instead of passing `ValidationPipe` decorator per controller's method, we can pass
			this directly to app level, globally

			/users/users.controller.ts
				...
			  @Post() 												(1) 											(2)
		//	public createUser( @Body( new ValidationPipe() ) body: CreateUserDto ) {
			  public createUser( @Body() body: CreateUserDto ) {

			    console.log(body);

			    return 'POST request to /users';
			  }


			/main.ts
			...
				import { ValidationPipe } from '@nestjs/common'

				async function bootstrap() {
				  const app = await NestFactory.create(AppModule);

					app.useGlobalPipes( new ValidationPipe() ) 					(1)	: Add Validation pipe here

				  await app.listen(process.env.PORT ?? 3000);
				}
				bootstrap();



To validate Body with nested DTOs complete Example:


/posts/posts.controller.ts:

			import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
			import { PostService } from './providers/posts.service'
			import { PostBodyDTO } from './dtos/posts.dtos' 			// (1)


			@Controller('posts')
			export class PostsController {
				...
				@Post('/')
				public createPost ( 	// (3) 						(2)
					@Body( new ValidationPipe()) body: PostBodyDTO
				) {

					return body
				}
			}


/posts/dtos/posts.dto.ts:

			import { PostStatus, PostType } from '../enums/post.enum'
			import { Type } from 'class-transformer'
			import {
				IsArray,
				IsEnum,
				IsISO8601,
				IsJSON,
				IsNotEmpty,
				IsOptional,
				IsString,
				IsUrl,
				Matches,
				MinLength,
				ValidateNested
			} from 'class-validator'


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

			// for nested metaOptions DTO
			class PostBodyMetaOptionDTO {
				@IsString()
				@IsNotEmpty()
				key: string

				@IsNotEmpty()
				value: any
			}


/posts/http/posts.post.endpoint.ts:

			POST http://localhost:3000/posts/
			Content-Type: application/json
			{
				"title": "my ",
				"type": "post",
				"slug": "unique-title-1",
				"status" : "draft",
				"content" : "content goes here",
				"schema": "{\"name\":\"riajul\",\"age\":30}",
				"featuredImageUrl": "http://image.jpg",
				"publishedOn": "2025-04-04T10:23:31.502Z",
				"tags": ["item1", "item2"],
				"metaOptions": [
					{
						"key": "isOpen",
						"value": "true"
					}
				]
			}





|----------[ Dependency Injection ]---------- 																											|

Dependency Injection:
	-


	Dependency Injection known as `Providers` can be many type:

		. Service
		.


	Dependencies Types
		. Intra-Modular Dependencies 			: One dependencies is inside Other Dependencies.
		. Inter-Modular Dependencies 			: Two dependencies side by side.
		. Circular Dependencies 					: Both module depends on each other.





Method-1: Regular Dependencies way

			class User = {
				constructor() {
					console.log('user class initiated')
				}
			}

			class Post = {
				constructor( private user = new User()) {
					console.log('post class initiated')
				}
			}

			class Page = {
				constructor( private user = new User()) {
					console.log('page class initiated')
				}
			}

			const post = new Post() 					// => invoke Post + User
			const page = new Page() 					// => invoke Page + User



Method-2: Dependency Injection way

			class User = {
				constructor() {
					console.log('user class initiated')
				}
			}

			class Post = {
				constructor( private user: User ) {
					console.log('post class initiated')
				}
			}

			class Page = {
				constructor( private user: User ) {
					console.log('page class initiated')
				}
			}

			const user = new User() 					// => instance once

			const post = new Post( user ) 		// => only invoke Post & get user from predefiend instance
			const page = new Page( user ) 		// => only invoke Page & get user from predefiend instance


|----------[ Providers ]---------- 																																	|

Providers:
	- ?
	- helper functions: with @Injectable() decorator class become Provider


	Step-1: Creating /providers/users.service.ts

			import { Injectable } from '@nestjs/common'

			@Injectable()
			export class UserService {}



	Step-2: Connecting providers with module

			import { Module } from '@nestjs/common'
			import { UsersController } from './users.controller'
			import { UserService } from './providers/users.service'

			@Module({
			  controllers: [UsersController],
				providers: [UserService]
			})
			export class UsersModule {}



	Step-3: To pass user provider inside controller, used in constructor properites

			import { Controller, ... } from '@nestjs/common'
			import { UserService } from './providers/users.service'
			...

			@Controller('users')
			export class UsersController {

				constructor(private readonly userService: UserService) { }

				...
			}


	Create Service Provider by CLI:

		$ nest generate service users --no-spec --dry-run       					:
		$ nest generate service users --no-spec         									: => /users/users.service.ts

		$ nest generate service posts/providers/users --flat --dry-run    : => /users/providers/users.service.ts





	Example: The use of Service to move business login outside of controller:

			import {
			  Controller,
			  Get,
			  Param,
			  Query,
				DefaultValuePipe,
				ParseIntPipe,
				...
			} from '@nestjs/common';

			@Controller('users')
			export class UsersController {

			  @Get('/:userId')
			  public getUsers(
					@Param() params: any,
					@Query('_limit', new DefaultValuePipe(20), ParseIntPipe) _limit: number,
					@Query('_page',  new DefaultValuePipe(1),  ParseIntPipe) _page: number,
				) {
			    console.log(_limit, typeof _limit)
			    console.log(_page, typeof _page)

			    return `GET to /users/${params.id}`
			  }

			  ...
			}

	Now Let's move the Business logic outside of controller => Provider

			// /providers/users.service.ts
			import { Injectable } from '@nestjs/common'

			@Injectable()
			export class UserService {

				public findAllUsers (params: any, _limit: number, _page: number) { 			(1) : Set method in Provider Service

					console.log({ params, _limit, _page })

					return [ 																															(5) : Return data back to response
						{ name: 'user 1', },
						{ name: 'user 2', }
					]

				}
			}



			// onnecting /providers/user.service.ts  => /users/users.module.ts
			import { Module } from '@nestjs/common'
			import { UsersController } from './users.controller'
			import { UserService } from './providers/users.service'

			@Module({
			  controllers: [UsersController],
				providers: [UserService] 																								(2) : Connection Provider with user module
			})
			export class UsersModule {}



	Step-3: To pass user provider inside controller, used in constructor properites

			import { Controller, ... } from '@nestjs/common'
			import { UserService } from './providers/users.service'
			...

			@Controller('users')
			export class UsersController {

				constructor(private readonly userService: UserService) {} 							(3) : make provider available in controller


			  @Get('/:userId')
			  public getUsers(
					@Param() params: any,
					@Query('_limit', new DefaultValuePipe(20), ParseIntPipe) _limit: number,
					@Query('_page',  new DefaultValuePipe(1),  ParseIntPipe) _page: number,
				) {
			    return this.userService.findAll(params, _limit, _page) 								(4) : invode provider's method and pass required params
			  }

			}


|----------[ Intra-module Dependencies ]---------- 																									|

If need to pass one Dependencies or Providers: (service, ...) to another Dependency.

	. To pass dependency Provider to others, the depencency provider must be exported from module's exports array

like: in posts service, need user service to get posts of that user


	Step-1: export particular Provider

		/users/users.module.ts
				import { Module } from '@nestjs/common'
				import { UsersController } from './users.controller'
				import { UserService } from './providers/users.service'

				@Module({
				  controllers: [UsersController],
					providers: [UserService],

					exports: [UserService] 															(1)	: Must be exported
				})
				export class UsersModule {}



	Step-2: import entire module (not specific Provider) before use it

		/posts/posts.module.ts
				import { Module } from '@nestjs/common'
				import { PostsController } from './posts.controller'
				import { PostService } from './providers/posts.service'
				import { UsersModule } from 'src/users/users.module'

				@Module({
				  controllers: [PostsController],
				  providers: [PostService],

					imports: [ UsersModule], 														(2) : import entire module before uses it
				})
				export class PostsModule {}



	Step-3: Not use userService inside postService

		/users/users.controller.ts
				import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
				import { PostService } from './providers/posts.service'

				@Controller('posts')
				export class PostsController {

					constructor( private readonly postService: PostService) {}

					@Get('/:userId')
					public getPosts (
						@Param('userId') userId: string
					) {
						return this.postService.getPosts(userId) 					(3) : call postService
					}

				}


		/posts/providers/posts.service.ts
				import { Injectable } from '@nestjs/common';
				import { UserService } from 'src/users/providers/users.service'

				@Injectable()
				export class PostService {

					constructor(private readonly userService: UserService) {} 					(4) : get userService in PostService

					public getPosts(userId: string) {
						const user = this.userService.getUserById( Number(userId) ) 			(5) : Get user By Id then pass in return

						return [
							{ id: 1, title: 'post 1', user, }, 															(6) : => users
							{ id: 2, title: 'post 2', user, },
						]
					}

				}


|----------[ Circular Dependencies ]---------- 																									|

When we need to impose one Provider (Service) to another Provider (Service), we must export that particular Provider (Service) from self module and the targeted Provider's module must be imported on there modules.

Now I we do so in 2 module, one from another which create Circular dependencies error.

Suppose
	. AuthService need UserService, 	for check authentication and
	. UserService need AuthService, 	to provide info if already authenticed. so


	/users/users.module.ts 																			/auth/auth.module.ts

				@Module({ 																									@Module({
				  controllers: [UsersController], 														controllers: [AuthController],
					providers: [UserService], 																	providers: [AuthService],

					exports: [UserService], 	(1)																imports: [UsersModule], 		(2)
					imports: [AuthModule] 		(4)																exports: [AuthService] 			(3)
				}) 																													})

				=> 1 => 2 => 3 => 4 => 1 --- 		=> throw infinite loop => Error


		To resolve this problem, we have to follow 2 stpes:

				1. When we Import we must import with `forwardRef( callback ) argument, instead direct array import
				2. When inject in service's constructor() here used `@Inject( forwardRef( callback )`


	/users/users.module.ts 																			/auth/auth.module.ts
				...
				@Module({ 																									@Module({
				  controllers: [UsersController], 														controllers: [AuthController],
					providers: [UserService], 																	providers: [AuthService],

					exports: [UserService], 																		imports: [forwardRef(() => UsersModule)], 		(1.1)
					imports: [forwardRef(() => AuthModule)] 	(1.2)							exports: [AuthService]
				}) 																													})
				...


	/users/providers/users.service.ts 													/auth/providers/auth.service.ts
				... 																												...
				constructor(	 																							constructor(
					@Inject(forwardRef( () => AuthService ))  (2.2)								@Inject(forwardRef(() => UserService)) 				(2.1)
					private readonly authService: AuthService 									private readonly userService: UserService
				) {} 																												) {}

				public isAuthenticated () { 																public login (body: { email: string; password: string; id: number }) {
					return this.authService.isAuthenticated() 									const user = this.userService.getUserById(body.id)
				} 																														return {
				...																															authToken: 'Bearer secret-auth-token'
				    																													}
				    																												}

 																																		public isAuthenticated () {
 																																			return true
 																																		}
 																																		...

 	Example:

		$ nest generate module users  																			: => /users/users.module.ts
		$ nest generate controller users --no-spec 													: => /users/users.controller.ts
		$ nest generate service users/providers/users --flat --no-spec 			: => /users/providers/users.service.ts

		$ nest generate module auth  																				: => /auth/auth.module.ts
		$ nest generate controller auth --no-spec 													: => /auth/auth.controller.ts
		$ nest generate service auth/providers/auth --flat --no-spec 				: => /auth/providers/auth.service.ts
		...



|----------[ Documentation ]---------- 																													|

$ yarn add @nestjs/swagger

/src/main.ts

			import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
			...
			const app = await NestFactory.create( AppModule )


			const config = new DocumentBuilder().setVersion('1.0').build()
			const document = SwaggerModule.createDocument( app, config )

			SwaggerModule.setup( 'api', app, document )


			app.listen(3000)
			...

(Browser) http://localhost:3000/api


Example: 1
	- Let's apply Documentation for POST /api/posts 	end point, [ We validated with DTOs above example ]

		API Documentation is build with decorator comes from '@nestjs/swagger' package, which can be applied on

			1. On Controller
			2. On DTOsValidator Class


				@ApiOperation() 							: add label to route's right side: POST /posts <summary>
				@ApiProperty() 								: body: required field
				@ApiPropertyOptional() 				: body: optional field
				@ApiResponse() 								: Response: Type, Description

	@ApiOperation({
		summary: 'create post' 		// add label to route's right side
	})
	@ApiResponse({
		status: 201,
		description: 'new post is created'
	})

				{
					example: 'to set value',
					description: 'to set explaination for the property',
					enum: EnumType, 						: no need example, it auto set value for 1st one from EnumType

					type: 'array', 							: if not literal value, object, array, function, ...
					required: false,

					items: { 										: nested items' details
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

				}

