interface ModeratorBaseDTO {
    id: number
}

interface ModeratorBaseOutputDTO extends ModeratorBaseDTO {}

export interface ModeratorGetOutputDTO extends ModeratorBaseOutputDTO {}

export interface ModeratorCreateInputDTO extends ModeratorBaseDTO {}

export interface ModeratorCreateOutputDTO extends ModeratorBaseOutputDTO {}