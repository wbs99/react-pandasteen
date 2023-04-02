import { MockMethod } from 'vite-plugin-mock';
import { faker } from '@faker-js/faker';

export const MockItems: MockMethod[] = [{
  url: '/api/v1/items',
  method: 'get',
  statusCode: 200,
  timeout: 500,
  response: ({ query }: ResponseParams): Resources<Item> =>
    createResponse({ count: 30, perPage: 10, page: parseInt(query.page) || 1 })
}]

let id = 0
const createId = () => {
  id += 1
  return id
}

const createItem = (attrs?: Partial<Item>): Item => {
  return {
    id: createId(),
    user_id: 1,
    amount: faker.datatype.number({ min: 99, max: 1000_00 }),
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