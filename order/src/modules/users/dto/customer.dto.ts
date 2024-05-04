interface CustomerBaseDto {}

interface CustomerBaseOutputDto extends CustomerBaseDto {
    id: string
}

export interface CustomerGetOutputDto extends CustomerBaseOutputDto {}

export interface CustomerCreateInputDto extends CustomerBaseDto {
    id: bigint
}

export interface CustomerCreateOutputDto extends CustomerBaseOutputDto {}