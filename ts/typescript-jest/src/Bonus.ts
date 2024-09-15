export type bonusType = 'STRIKE' | 'SPARE';

export abstract class Bonus {
  private bonusRoll: number;
  private type: bonusType;

  constructor(bonusRoll: number, bonusType: bonusType) {
    this.bonusRoll = bonusRoll;
    this.type = bonusType;
  }

  getScore(knockedPins: number[]): number {
    return knockedPins.reduce((frame, bonus) => frame + bonus);
  };

  getBonusRoll(): number {
    return this.bonusRoll;
  }

  getType(): bonusType {
    return this.type;
  }

  areEnoughRolls(playedRolls: number, allRolls: number): boolean {
    return allRolls - playedRolls >= this.bonusRoll;
  }
}

export class BonusSpare extends Bonus {
  constructor() {
    super(1, 'SPARE');
  }
}

export class BonusStrike extends Bonus {
  constructor() {
    super(2, 'STRIKE');
  }
}