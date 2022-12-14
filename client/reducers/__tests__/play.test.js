import { SET_PLAY_CONTENT, DELETE_PLAY_CONTENT } from '../../actions/play'
import { SET_RESULT } from '../../actions/winner'
import play from '../play'

const mockMoviesData = [
  {
    id: 1,
    uploader_id: '1',
    name: 'Top Gun Maverick',
    description: 'Tom Cruise Placeholder',
    image_url: '/images/topgun-maverick.jpg',
  },
  {
    id: 2,
    uploader_id: '1',
    name: 'Bohemian Rhapsody',
    description: 'Queen Placeholder',
    image_url: '/images/bohemian-rhapsody.jpg',
  },
]

describe('home reducer', () => {
  it('returns action payload for the type SET_HOME_CONTENT', () => {
    const action = {
      type: SET_PLAY_CONTENT,
      payload: mockMoviesData,
    }
    const initialState = []
    const expectedState = mockMoviesData
    const outputState = play(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns action payload for the type SET_RESULT', () => {
    const action = {
      type: SET_RESULT,
      payload: [],
    }
    const initialState = []
    const expectedState = []
    const outputState = play(initialState, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).toEqual(initialState)
  })
  it('returns action payload for the type DELETE_PLAY_CONTENT', () => {
    const action = {
      type: DELETE_PLAY_CONTENT,
      payload: 1,
    }
    const initialState = [
      { id: 1, name: 'Hello' },
      { id: 2, name: 'Fail' },
    ]

    const expectedState = [{ id: 2, name: 'Fail' }]
    const outputState = play(initialState, action)
    expect(outputState).toStrictEqual(expectedState)
    expect(outputState).not.toEqual(initialState)
  })
  it('returns the default initial state for an undefined state and no action type.', () => {
    const expectedState = []
    const outputState = play(undefined, [])

    expect(outputState).toEqual(expectedState)
  })
})
