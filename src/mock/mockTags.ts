import type { MockMethod } from 'vite-plugin-mock'
import type { Tag, TagParams } from '../apis/tagApi'
import { faker } from '@faker-js/faker'

let id = 0
const createId = () => {
  id += 1
  return id
}
const createTag = (attrs?: TagParams): Tag => {
  return {
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    user_id: 1,
    deleted_at: null,
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    ...attrs
  }
}

const createTagList = (n: number, attrs?: TagParams): Tag[] => {
  return Array.from({ length: n }).map(() => createTag(attrs))
}

const createResponse = ({ count = 10, perPage = 10, page = 1 }, attrs?: TagParams,): Resources<Tag> => {
  const sendCount = (page - 1) * perPage
  const left = count - sendCount
  return {
    resources: left > 0 ? createTagList(Math.min(left, perPage), attrs) : [],
    pager: {
      page,
      per_page: perPage,
      count
    }
  }
}
export const mockTags: MockMethod[] = [
  {
    url: '/api/v1/tags',
    method: 'get',
    statusCode: 200,
    response: ({ query }: ResponseParams): Resources<Tag> => {
      return createResponse({ count: 91, perPage: 50, page: parseInt(query.page) || 1 })
    }
  },
  {
    url: '/api/v1/tags',
    method: 'post',
    statusCode: 200,
    response: (): Resource<Tag> => {
      return {
        resource: createTag()
      }
    }
  },
  {
    url: '/api/v1/tags/:id',
    method: 'patch',
    statusCode: 200,
    response: (): Resource<Tag> => {
      return {
        resource: createTag()
      }
    }
  },
  {
    url: '/api/v1/tags/:id',
    method: 'get',
    statusCode: 200,
    response: (): Resource<Tag> => {
      return {
        resource: createTag()
      }
    }
  },
  {
    url: '/api/v1/tags/:id',
    method: 'delete',
    statusCode: 200,
  }
]
