import { MockSession } from './session.mock';
import { MockItems } from './items.mock';
import { MockMe } from './me.mock';
import type { MockMethod } from 'vite-plugin-mock'

export default [
  MockMe, MockItems, MockSession
] as MockMethod[]