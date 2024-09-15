import { Bonus, BonusSpare, BonusStrike } from "./Bonus";
import { FinalFrame } from "./FinalFrame";
import { Frame } from "./Frame";
import { IFrame } from "./IFrame";

export class FactoryFrame {
  static createFrame(frameNumber: number): IFrame {
    if (frameNumber !== 9) {
      return new Frame();
    }
    return new FinalFrame();
  }
}

export class FactoryBonus {
  static createBonus(rolls: number[]): Bonus | null {
    const knockedPins = rolls.reduce((knockedPins, roll) => knockedPins + roll, 0);
    const isSpare = knockedPins === 10 && rolls.length === 2;
    const isStrike = knockedPins === 10;
    if (!isStrike && !isSpare) {
      return null;
    }
    if (isSpare) {
      return new BonusSpare();
    }
    return new BonusStrike();
  }
}