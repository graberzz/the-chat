import typers, * as selectors from './typers';

describe('typers reducer', () => {
  it('handles TYPERS_UPDATE action', () => {
    const action = {
      type: 'TYPERS_UPDATE',
      typers: {
        roomOne: {
          'typer1': {
            username: 'typer1',
          },
          'typer2': {
            username: 'typer2',
          },
        },
        roomTwo: {
          'typer3': {
            username: 'typer3',
          },
        },
      },
    };

    const expectedState = {
      roomOne: ['typer1', 'typer2'],
      roomTwo: ['typer3'],
    };

    const result = typers(undefined, action);

    expect(result).toEqual(expectedState);
  });
});

describe('typers selectors', () => {
  it('getRoomTypers selector', () => {
    const state = {
      roomOne: ['typer1', 'typer2'],
      roomTwo: ['typer3'],
    };
    const roomId = 'roomOne';
    const expected = ['typer1', 'typer2'];

    expect(selectors.getRoomTypers(state, roomId)).toEqual(expected);
  });
});