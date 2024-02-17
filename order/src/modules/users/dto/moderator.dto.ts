interface ModeratorBaseDto {}

interface ModeratorBaseOutputDto extends ModeratorBaseDto {
    id: string
}

export interface ModeratorGetOutputDto extends ModeratorBaseOutputDto {}

export interface ModeratorCreateInputDto extends ModeratorBaseDto {
    id: bigint
}

export interface ModeratorCreateOutputDto extends ModeratorBaseOutputDto {}