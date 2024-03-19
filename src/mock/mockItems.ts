import { faker } from '@faker-js/faker'
import type { MockMethod } from 'vite-plugin-mock'

export const mockItems: MockMethod[] = [
  {
    url: '/api/v1/items',
    method: 'get',
    statusCode: 200,
    timeout: 500,
    response: ({ query }: ResponseParams): Resources<Item> =>
      createResponse({ count: 30, perPage: 10, page: parseInt(query.page) || 1 })
  },
  {
    url: '/api/v1/items/balance',
    method: 'get',
    statusCode: 200,
    response: () => ({
      balance: 40400,
      expenses: 90900,
      income: 131300
    })
  }
]

let id = 0
const createId = () => {
  id += 1
  return id
}

const createItem = (attrs?: Partial<Item>): Item => {
  return {
    id: createId(),
    user_id: 1,
    amount: faker.number.int({ min: 99, max: 100000 }),
    tags: [{
      id: 1,
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      user_id: 1,
      deleted_at: null,
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.past().toISOString(),
      kind: 'expenses',
      ...attrs
    }],
    tag_ids: [1, 2],
    happen_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    ...attrs
  }
}

const createList = (n: number, attrs?: Partial<Item>): Item[] => Array.from({ length: n }).map(() => createItem(attrs))

const createResponse = ({ count = 10, page = 1, perPage = 10 }, attrs?: Partial<Item>): Resources<Item> => {
  const sendCount = (page - 1) * perPage
  const restCount = count - sendCount
  return {
    resources: restCount > 0 ? createList(Math.min(restCount, perPage), attrs) : [],
    pager: {
      page,
      per_page: perPage,
      count
    }
  }
}
