import { Module } from '@nestjs/common';
import { PostMetaOptionsController } from './post-meta-options.controller';
import { PostMetaOptionsService } from './post-meta-options.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostMetaOption } from './post-meta-options.entity'

@Module({
  controllers: [PostMetaOptionsController],
  providers: [PostMetaOptionsService],
	imports: [
		TypeOrmModule.forFeature([ PostMetaOption ])
	]
})
export class PostMetaOptionsModule {}
