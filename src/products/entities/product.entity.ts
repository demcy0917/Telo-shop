import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {ApiProperty} from '@nestjs/swagger';
import { ProductImage } from "./product-image.entity";
import { User } from "../../auth/entities/user.entity";


@Entity({name: 'products' })
export class Product {

    @ApiProperty({
        example: '16d4e4de-a670-4851-86ef-628f6a794495',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title: string;
    
    @ApiProperty({
        example: 0,
        description: 'Product price',
    })
    @Column('float',{
        default: 0
    })
    price: number;


    @ApiProperty({
        example: 'Lorem ipsum Anim reprehederit in anim',
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Produc SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text',{
        unique: true,
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product Stock',
        default: 0
    })
    @Column('int',{
        default: 0,
    })
    stock: number;

    @ApiProperty({
        example: ['M', 'XL', 'XS', 'L'],
        description: 'Product sizes',
    })
    @Column('text',{
        array: true,
        default: [],
    })
    sizes: string[];

    @ApiProperty()
    @Column('text',{
        array: true,
        default: [],
    })
    tags: string[];

    @ApiProperty({
        example: 'Women',
        description: 'Product gender'
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager: true}
    )
    user: User

    generateSlug() {
    this.slug = (this.slug || this.title)
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/'/g, '')
      .replace(/´/g, '');
     }
    
   
}
