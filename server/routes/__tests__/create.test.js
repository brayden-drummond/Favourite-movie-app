const request = require('supertest')
const server = require('../../server')

const { addMovie } = require('../../db/create')

jest.mock('../../db/create')
jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

const checkJwt = require('../../auth0')
jest.mock('../../auth0')

checkJwt.mockImplementation((req, res, next) => {
  req.user = { sub: 'testAuth0Id' }
  next()
})

const mockMovie = {
  uploader_id: 'testAuth0Id',
  name: 'test',
  description: 'test',
  image_url: 'test',
}

describe('POST /api/v1/create', () => {
  it('post new movie to movies array', () => {
    addMovie.mockReturnValue(Promise.resolve([5]))
    return request(server)
      .post('/api/v1/create')
      .send(mockMovie)
      .then((res) => {
        expect(res.status).toBe(204)
        expect(addMovie.mock.calls[0][0].uploader_id).toBe('testAuth0Id')
        return null
      })
  })
  it('return status 500 and consoles error when problem', () => {
    addMovie.mockImplementation(() => Promise.reject(new Error('fail')))
    console.error.mockImplementation(() => {})
    return request(server)
      .post('/api/v1/create')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(console.error).toHaveBeenCalledWith('fail')
        return null
      })
  })
})
