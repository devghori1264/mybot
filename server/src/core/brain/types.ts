import type {
  NEREntity,
  NLPAction,
  NLPDomain,
  NLPSkill,
  NLPUtterance,
  NLUResolver,
  NLUResult,
  NLUSlot,
  NLUSlots
} from '@/core/nlp/types'
import type { SkillConfigSchema } from '@/schemas/skill-schemas'
import type { ShortLanguageCode } from '@/types'

interface SkillCoreData {
  restart?: boolean
  isInActionLoop?: boolean
  showNextActionSuggestions?: boolean
  showSuggestions?: boolean
}

export interface SkillResult {
  domain: NLPDomain
  skill: NLPSkill
  action: NLPAction
  lang: ShortLanguageCode
  utterance: NLPUtterance
  entities: NEREntity[]
  slots: NLUSlots
  output: {
    codes: string[]
    speech: string
    core: SkillCoreData | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Record<string, any>
  }
}

export enum SkillBridges {
  Python = 'python',
  NodeJS = 'nodejs'
}
export enum SkillActionTypes {
  Logic = 'logic',
  Dialog = 'dialog'
}

export interface ActionParams {
  lang: ShortLanguageCode
  utterance: NLPUtterance
  current_entities: NEREntity[]
  entities: NEREntity[]
  current_resolvers: NLUResolver[]
  resolvers: NLUResolver[]
  slots: { [key: string]: NLUSlot['value'] | undefined }
}

export interface IntentObject extends ActionParams {
  id: string
  domain: NLPDomain
  skill: NLPSkill
  action: NLPAction
}

export interface BrainProcessResult extends NLUResult {
  speeches: string[]
  executionTime: number
  utteranceID?: string
  lang?: ShortLanguageCode
  core?: SkillCoreData | undefined
  action?: SkillConfigSchema['actions'][string]
  nextAction?: SkillConfigSchema['actions'][string] | null | undefined
}
