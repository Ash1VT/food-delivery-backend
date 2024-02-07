interface CustomerBaseDTO {
    id: bigint
}

interface CustomerBaseOutputDTO extends CustomerBaseDTO {}

export interface CustomerGetOutputDTO extends CustomerBaseOutputDTO {}

export interface CustomerCreateInputDTO extends CustomerBaseDTO {}

export interface CustomerCreateOutputDTO extends CustomerBaseOutputDTO {}