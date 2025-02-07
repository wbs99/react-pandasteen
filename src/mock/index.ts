import type { MockMethod } from 'vite-plugin-mock'
import { mockItems } from './mockItems'
import { mockMe } from './mockMe'
import { mockSession } from './mockSession'
import { mockSummary } from './mockSummary'
import { mockTags } from './mockTags'

export default [
  ...mockMe, ...mockItems, ...mockSession, ...mockTags, ...mockSummary
] as MockMethod[]
