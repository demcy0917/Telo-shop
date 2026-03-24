import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)//enanleImplicitConversons: true
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number)//enanleImplicitConversons: true
    offset?: number;
}