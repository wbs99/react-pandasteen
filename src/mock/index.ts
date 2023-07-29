import type { MockMethod } from 'vite-plugin-mock'
import { MockSession } from './mockSession';
import { MockItems } from './mockItems';
import { MockMe } from './mockMe';
import { tagsMock } from './mockTags';
import { summaryMock } from './mockSummary';

export default [
  ...MockMe, ...MockItems, ...MockSession, ...tagsMock, ...summaryMock
] as MockMethod[]