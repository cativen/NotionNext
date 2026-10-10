const mockGetPage = jest.fn()
const mockConstructor = jest.fn()

jest.mock('notion-client', () => ({
  NotionAPI: function (options) {
    mockConstructor(options)
    this.getPage = mockGetPage
  }
}))
jest.mock('@/blog.config', () => ({
  API_BASE_URL: 'https://www.notion.so/api/v3'
}))
jest.mock('../RateLimiter', () => ({ RateLimiter: jest.fn() }))

const notionAPI = require('../getNotionAPI').default

test('Notion requests identify the client and share concurrent work', async () => {
  let resolve
  mockGetPage.mockReturnValueOnce(new Promise(done => { resolve = done }))
  const first = notionAPI.getPage('same-page')
  const second = notionAPI.getPage('same-page')
  await Promise.resolve()
  expect(mockGetPage).toHaveBeenCalledTimes(1)
  expect(mockConstructor.mock.calls[0][0].ofetchOptions.headers['User-Agent']).toContain('NotionNext')
  resolve({ block: {} })
  expect(await first).toEqual(await second)
})

test('a rejected request is consumed and can be retried', async () => {
  mockGetPage.mockRejectedValueOnce(new Error('Notion unavailable'))
  await expect(notionAPI.getPage('retry-page')).rejects.toThrow('Notion unavailable')
  mockGetPage.mockResolvedValueOnce({ block: { page: {} } })
  await expect(notionAPI.getPage('retry-page')).resolves.toEqual({ block: { page: {} } })
  // Any unhandled rejection from cleanup fails the Jest process.
  await new Promise(resolve => setTimeout(resolve, 0))
})
