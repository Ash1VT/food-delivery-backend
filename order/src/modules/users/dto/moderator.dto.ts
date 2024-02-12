interface ModeratorBaseDto {
    id: bigint
}

interface ModeratorBaseOutputDto extends ModeratorBaseDto {}

export interface ModeratorGetOutputDto extends ModeratorBaseOutputDto {}

export interface ModeratorCreateInputDto extends ModeratorBaseDto {}

export interface ModeratorCreateOutputDto extends ModeratorBaseOutputDto {}