import { enumType } from 'nexus'
import { RenderTarget } from '@etu/tiptap'

export const RenderTargetKind = enumType({
  name: 'RenderTarget',
  members: RenderTarget,
})
