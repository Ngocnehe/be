import { IsNumber, IsString } from "class-validator";

export class ParamPaginationDto {

    limit: number;

    page: number;
    
    @IsString()
    sort: string;

    @IsString()
    keyword: string;

}