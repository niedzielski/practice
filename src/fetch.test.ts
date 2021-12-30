import fetchAbc from './fetchAbc.test.json'
import fetchMock, {MockResponseInit} from 'jest-fetch-mock'

const url = 'https://en.wikipedia.org/w/rest.php/v1/search/title?q=abc&limit=10'
const fetchAbcResponse: MockResponseInit = {
  body: JSON.stringify(fetchAbc),
  headers: {
    'cache-control': 'public, max-age=10800',
    'content-type': 'application/json'
  },
  status: 200,
  statusText: '',
  url
}

describe('fetch', () => {
  beforeAll(() => fetchMock.enableMocks())

  afterAll(() => fetchMock.disableMocks())

  beforeEach(() => fetchMock.resetMocks())

  test('fetch ok', async () => {
    fetchMock.once(fetchAbcResponse.body!, fetchAbcResponse)

    const response = await fetch(url, {
      headers: {accept: 'application/json'},
      method: 'GET'
    })
    expect(response.ok).toBe(true)
    const json = await response.json()
    expect(json.pages.length).toBe(10)
  })

  test('abort fetch', async () => {
    // Use actual fetch. jest-fetch-mock seems to want to have mockAbortOnce()
    // called which will yield an aborted request whether or not the signal is
    // used.
    fetchMock.disableMocks()

    const controller = new AbortController()
    const request = fetch(url, {
      headers: {accept: 'application/json'},
      method: 'GET',
      signal: controller.signal
    })
    controller.abort()
    await expect(request).rejects.toThrow()
  })
})
