import {DurationPipe} from './duration.pipe';

describe('DurationPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return correct value',  () => {
      expect(pipe.transform(90)).toBe('1h 30min');
    });
  });
});
