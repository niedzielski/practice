import fetchAbc from './fetchAbc.test.json'
import fetchMock, {MockResponseInit} from 'jest-fetch-mock'

const abcURL =
  'https://en.wikipedia.org/w/rest.php/v1/search/title?q=abc&limit=10'
const fetchAbcResponse: MockResponseInit = {
  body: JSON.stringify(fetchAbc),
  headers: {
    'cache-control': 'public, max-age=10800',
    'content-type': 'application/json'
  },
  status: 200,
  statusText: '',
  url: abcURL
}

describe('fetch', () => {
  beforeAll(() => fetchMock.enableMocks())

  afterAll(() => fetchMock.disableMocks())

  beforeEach(() => fetchMock.resetMocks())

  test('fetch ok', async () => {
    fetchMock.once(fetchAbcResponse.body!, fetchAbcResponse)

    const response = await fetch(abcURL, {
      headers: {accept: 'application/json'},
      method: 'GET'
    })
    expect(response.ok).toBe(true)
    const json = await response.json()
    expect(json.pages.length).toBe(10)
  })

  test('fetch partial', async () => {
    // Use actual fetch. jest-fetch-mock doesn't respect range.
    fetchMock.disableMocks()

    // Use example.com. Wikipedia incorrectly advertises support for ranges but
    // does not actually support it. The only hint is the HTTP status of 200
    // instead of 206:
    //
    //   curl -iH 'Range: bytes=0-127' 'https://en.wikipedia.org/w/rest.php/v1/search/title?q=abc&limit=10'
    //   HTTP/2 200
    //   …
    //   accept-ranges: bytes
    //   content-length: 3133
    //   …
    //
    // Firefox reports similarly. Chromium fakes it. The network response is
    // complete but scripts access a truncated response with an adjusted
    // content-length header and body.
    const response = await fetch('https://www.example.com', {
      headers: {accept: 'application/json', range: 'bytes=0-127'},
      method: 'GET'
    })
    expect(response.ok).toBe(true)
    expect(response.headers.get('content-length')).toBe('128')
  })

  test('abort fetch', async () => {
    // Use actual fetch. jest-fetch-mock seems to want to have mockAbortOnce()
    // called which will yield an aborted request whether or not the signal is
    // used.
    fetchMock.disableMocks()

    const controller = new AbortController()
    const request = fetch(abcURL, {
      headers: {accept: 'application/json'},
      method: 'GET',
      signal: controller.signal
    })
    controller.abort()
    await expect(request).rejects.toThrow()
  })
})
