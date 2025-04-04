import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module'

@Module({
  controllers: [PostsController],
  providers: [PostService],
	imports: [ UsersModule],
})
export class PostsModule {}
