import { Bonus } from "./Bonus";
import { FactoryBonus } from "./Factories";
import { IFrame } from "./IFrame";

export class Frame implements IFrame {
  private rolls: number[] = [];
  private bonus: Bonus = null;

  public roll(knockedPins: number) {
    this.rolls.push(knockedPins);
    const bonus = FactoryBonus.createBonus(this.rolls);
    if(!bonus) {
      return;
    }
    this.bonus = bonus;
  }

  public getScore(bonusRolls?: number[]) {
    const knockedPinsFromFrame = this.getKnockedPins();
    if (!bonusRolls || !this.hasBonus()) {
      return knockedPinsFromFrame;
    }
    const knockedPinsForBonus = [knockedPinsFromFrame];

    for (let i = 0; i < this.bonus.getBonusRoll(); i++ ) {
      if (!bonusRolls[i]) {
        continue;
      }
      knockedPinsForBonus.push(bonusRolls[i]);
    }

    return this.bonus.getScore(knockedPinsForBonus);
  }

  public isStrike(): boolean {
    return this.rolls.some((roll) => roll === 10);
  }

  public getNumberRolls(): number {
    return this.rolls.length;
  }

  public getRolls(): number[] {
    return this.rolls;
  }

  public isSpare(): boolean {
    return this.getKnockedPins() === 10 && this.getNumberRolls() === 2;
  }

  public hasFinished(): boolean {
    return this.getNumberRolls() === 2 || this.getKnockedPins() === 10;
  }

  public areEnoughRolls(playedRolls: number, allRolls: number): boolean {
    if (!this.hasBonus()) {
      return false;
    }
    return this.bonus.areEnoughRolls(playedRolls, allRolls);
  }

  private hasBonus(): boolean {
    return !!this.bonus;
  }

  private getKnockedPins(): number {
    return this.rolls.reduce((knockedPins, roll) => knockedPins + roll, 0);
  }
}