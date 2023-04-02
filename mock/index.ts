import { MockSession } from './session.mock';
import { MockItems } from './items.mock';
import { MockMe } from './me.mock';
import type { MockMethod } from 'vite-plugin-mock'
import { tagsMock } from './tags.mock';

export default [
  MockMe, MockItems, MockSession, tagsMock
] as MockMethod[]