import { enumType } from 'nexus'
import { RenderTarget } from '@etu/tiptap/src/index'

export const RenderTargetKind = enumType({
  name: 'RenderTarget',
  members: RenderTarget,
})
