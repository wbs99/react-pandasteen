import { MockItems } from './items.mock';
import { MockMe } from './me.mock';
import type { MockMethod } from 'vite-plugin-mock'

export default [
  MockMe, MockItems
] as MockMethod[]