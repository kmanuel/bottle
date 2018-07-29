import Bottle from '../Bottle';

it('should create a new bottle', () => {
    const bottle = new Bottle('title', 'body', 1, 2, 'admin');

    expect(bottle.title).toEqual('title');
    expect(bottle.body).toEqual('body');
    expect(bottle.position).toEqual({lat: 1, lng: 2});
    expect(bottle.author).toEqual('admin');
});

it('returns that bottle is not held by somebody', () => {
    const bottle = new Bottle('title', 'body', 1, 2, 'admin');
    expect(bottle.isCollected()).toBeFalsy();
});

it('returns that bottle is held by somebody', () => {
    const bottle = new Bottle('title', 'body', 1, 2, 'admin');
    bottle.collectedBy = 'me';
    expect(bottle.isCollected()).toBeTruthy();
});

it('returns that bottle is held by me', () => {
   const bottle = new Bottle('title', 'body', 1, 2, 'admin', null, 'me');
   expect(bottle.isCollectedBy('me')).toBeTruthy();
});

it('returns that bottle is not held by me', () => {
    const bottle = new Bottle('title', 'body', 1, 2, 'admin', null, 'someone else');
    expect(bottle.isCollectedBy('me')).toBeFalsy();
});

it('should return the distance to the bottle', () => {
    const bottle = new Bottle('title', 'body', 1, 2, 'admin');
    expect(bottle.meterDistanceFrom({lat: 2, lng: 2})).toEqual(11120);
});


