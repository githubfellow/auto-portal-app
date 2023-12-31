import {IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateAutoDto {
	@IsString()
	title: string

	@IsString()
	brand: string

	@IsString()
	slug: string

	@IsString()
	imageUrl: string

	@IsOptional()
	@IsString()
	videoUrl?: string

	@IsNumber()
	countInStock: number

	@IsNumber()
	countOfViews: number

	@IsString()
	color: string

	@IsOptional()
	@IsNumber()
	oldPrice?: number;

	@IsNumber()
	price: number

	@IsBoolean()
	isSendTelegram: boolean

	@IsString()
	characteristics: string
}