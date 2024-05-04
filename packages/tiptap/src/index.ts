import { Extensions } from '@tiptap/core'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Heading from '@tiptap/extension-heading'
import HardBreak from '@tiptap/extension-hard-break'

import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'

import History from '@tiptap/extension-history'

import { TemplateVariableNode, TemplateVariableId } from './extensions/template-variable'

export const extensions: Extensions = [
  Document,
  Paragraph,
  Text,
  OrderedList,
  BulletList,
  ListItem,
  HorizontalRule,
  Heading,
  HardBreak,
  Bold,
  Italic,
  Underline,
  History,
  TemplateVariableNode,
]

export { TemplateVariableNode, TemplateVariableId }
