import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

type Mock = (config: AxiosRequestConfig) => [number, any]
faker.setLocale('zh_CN');

export const mockMe: Mock = (config) => {
  return [200, { resource: {id: 1, email: '11010@qq.com'} }]
}
export const mockSession:Mock = (config) => {
  return [200, { jwt: faker.random.word() }]
}
let id = 0
  const createId = () => {
    id += 1
    return id
  }
export const mockTagIndex: Mock = (config) => {
  const {kind, page} = config.params
  
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
  return [200, {
    resource: {
      "id": 2264,
      "user_id": 1312,
      "amount": 9900,
      "note": null,
      "tags_id": [3508],
      "happen_at": "2020-10-29T16:00:00.000Z",
      "created_at": "2022-07-03T15:35:56.301Z",
      "updated_at": "2022-07-03T15:35:56.301Z",
      "kind": "expenses"
    }
  }]
}

export const mockTagShow: Mock = (config) => {
  const createTag = (n = 1, attrs?: any) => 
    ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: 'expenses',
      ...attrs
    })
  return [200, {resource: createTag()}]
}

export const mockTagEdit: Mock = config => {
  const createTag = (attrs?: any) =>
    ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: 'expenses',
      ...attrs
    })
  return [200, {resource: createTag()}]
}

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createTag = (attrs?: any) =>
  ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tags_id: [createId()],
      tags: [createTag()],
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind,
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page),
    summary: {
      income: 9900,
      expenses: 9900,
      balance: 0
    }
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  }else{
    return [200, {}]
  }
}

export const mockItemIndexBalance: Mock = (config) => {
  return [200, {
    expenses: 9900,
    income: 9900,
    balance: 0
  }]
}

export const mockItemSummary: Mock = config => {
  const {group_by, kind} = config.params
  if (group_by === 'happen_at' && kind === 'expenses') {
    return [200, {
      "groups": [
        { "happen_at": "2023-03-11T00:00:00.000+0800", "amount": 100 },
        { "happen_at": "2023-03-22T00:00:00.000+0800", "amount": 300 },
        { "happen_at": "2023-03-29T00:00:00.000+0800", "amount": 200 }
      ],
      "summary": 600
    }]
  } else if (group_by === 'happen_at' && kind === 'income') {
    return [200, {
      "groups": [
        { "happen_at": "2023-03-01T00:00:00.000+0800", "amount": 100 },
        { "happen_at": "2023-03-14T00:00:00.000+0800", "amount": 300 },
        { "happen_at": "2023-03-21T00:00:00.000+0800", "amount": 200 }
      ],
      "summary": 600
    }]
  } else if (group_by === 'tag_id' && kind === 'expenses') {
    return [200, {
      groups: [
        {tag_id: 1, tag: { id: 1, name: '吃饭', sign: faker.internet.emoji() }, amount: 400},
        {tag_id: 2, tag: { id: 2, name: '交通', sign: faker.internet.emoji() }, amount: 100},
        {tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200}
      ],
      summary: 700
    }]
  } else {
    return [200, {
      groups: [
        {tag_id: 1, tag: { id: 1, name: '吃饭', sign: faker.internet.emoji() }, amount: 100},
        {tag_id: 2, tag: { id: 2, name: '交通', sign: faker.internet.emoji() }, amount: 200},
        {tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 300}
      ],
      summary: 600
    }]
  }
  
}