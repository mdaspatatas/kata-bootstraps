import { BonusStrike } from "./Bonus";

describe('BonusStrike', () => {
  let bonus;
  beforeEach(() => {
    bonus = new BonusStrike();
  });

  it('should have type strike', () => {
    const result = bonus.getType();

    expect(result).toEqual('STRIKE');
  });

  it('should return the double of the knockedPins', () => {
    const result = bonus.getScore([10, 5, 5]);

    expect(result).toEqual(20);
  });

  it('should return the bonusRoll', () => {
    const result = bonus.getBonusRoll();

    expect(result).toEqual(2);
  });
});