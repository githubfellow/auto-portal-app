import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {IsNumber, IsOptional } from 'class-validator'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { Category } from 'src/category/schema/category.schema'
import { Review } from 'src/review/schema/review.schema'
import { User } from 'src/user/schema/user.schema'

export type ProductDocument = HydratedDocument<Product>

@Schema({ timestamps: true })
export class Product {
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    slug: string

    @Prop()
    imageUrl: string

    @Prop()
    videoUrl?: string

    @Prop()
    brand: string

    @Prop()
    oldPrice?: number;

    @Prop()
    price: number

    @Prop()
    countInStock: number

    @Prop({ default: 0 })
    countOfViews: number

    @Prop({ default: 0 })
    countOfReviews: number

    @Prop({ default: 0 })
    rating: number

    @Prop()
    isSendTelegram: boolean

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ type: Types.ObjectId, ref: 'Review' })
    reviews: Types.ObjectId[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
