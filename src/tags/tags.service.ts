import { Injectable } from '@nestjs/common';
import { CreateTag } from './tags.dto'
import { Repository } from 'typeorm'
import { Tag } from './tag.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class TagsService {

	constructor(
		@InjectRepository(Tag)
		private readonly tagsRepository: Repository<Tag>
	) {}

	public async handleGetTags() {
		const tags = await this.tagsRepository.find({})

		return tags
	}
	public async handleAddTag(body: CreateTag) {
		let tag = this.tagsRepository.create(body)
		tag = await this.tagsRepository.save(tag)

		return tag
	}
}
