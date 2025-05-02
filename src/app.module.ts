import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { User } from './users/user.entity'
import { Post } from './posts/post.entry'
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tag.entity'
import { PostMetaOptionsModule } from './post-meta-options/post-meta-options.module';
import { PostMetaOption } from './post-meta-options/post-meta-options.entity'


@Module({
  imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
		// TypeOrmModule.forRoot({
		// 	type: 'postgres',
		// 	host: 'localhost',
		// 	port: 5432,
		// 	username: 'myuser',
		// 	password: 'mypass',
		// 	database: 'mydb',

		// 	entities: [],
		// 	synchronize: true
		// }),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService], 													// for .env
			useFactory: (config: ConfigService) => ({
				type: 'postgres',
				host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        synchronize: config.get<string>('NODE_ENV') === 'development',
				entities: [User, Post, Tag, PostMetaOption],
				// autoLoadEntities: true
			})
		}),

		UsersModule, 
		PostsModule, 
		AuthModule, TagsModule, PostMetaOptionsModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
