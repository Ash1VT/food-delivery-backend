interface CustomerBaseDto {
    id: bigint
}

interface CustomerBaseOutputDto extends CustomerBaseDto {}

export interface CustomerGetOutputDto extends CustomerBaseOutputDto {}

export interface CustomerCreateInputDto extends CustomerBaseDto {}

export interface CustomerCreateOutputDto extends CustomerBaseOutputDto {}