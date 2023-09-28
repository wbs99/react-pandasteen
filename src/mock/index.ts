import type { MockMethod } from 'vite-plugin-mock'
import { MockItems } from './mockItems'
import { MockMe } from './mockMe'
import { MockSession } from './mockSession'
import { summaryMock } from './mockSummary'
import { tagsMock } from './mockTags'

export default [
  ...MockMe, ...MockItems, ...MockSession, ...tagsMock, ...summaryMock
] as MockMethod[]
