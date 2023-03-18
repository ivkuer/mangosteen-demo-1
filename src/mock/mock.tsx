import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

type Mock = (config: AxiosRequestConfig) => [number, any]
faker.setLocale('zh_CN');

export const mockSession:Mock = (config) => {
  return [200, { jwt: faker.random.word() }]
}

export const mockTagIndex: Mock = (config) => {
  let id = 0
  const {kind, page} = config.params
  const createId = () => {
    id += 1
    return id
  }
  const createTag = (n = 1, attrs?: any) => 
    Array.from({length: n}).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: kind,
      ...attrs
    }))
  const createPage = (page: number = 1) => {
    return  {
      page,
      per_page: 25,
      count: 26
    }
  }

  const createBody = (n = 1, attrs?:any ) => {
    return {
      resources: createTag(n), 
      pager: createPage(page)
    }
  }

  if ((kind === 'expenses' || 'income') && (page === 1 || !page)) {
    return [200, createBody(25) as Resources<Tag>]
  } else if ((kind === 'expenses' || 'income') && page === 2) {
    return [200, createBody(1) as Resources<Tag>]
  } else {
    return [200, { resources: createTag(20) }]
  }
}

export const mockItemCreate: Mock = (config) => {
  return [422, {
    errors: {
      tags_id: ['必须选择标签'],
      amouunt: ['金额不能为0'],
    }
  }]
  // return [200, {
  //   resource: {
  //     "id": 2264,
  //     "user_id": 1312,
  //     "amount": 9900,
  //     "note": null,
  //     "tags_id": [3508],
  //     "happen_at": "2020-10-29T16:00:00.000Z",
  //     "created_at": "2022-07-03T15:35:56.301Z",
  //     "updated_at": "2022-07-03T15:35:56.301Z",
  //     "kind": "expenses"
  //   }
  // }]
}