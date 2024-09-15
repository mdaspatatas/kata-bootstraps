import { Bonus, bonusType } from "./Bonus";
import { FactoryBonus } from "./Factories";
import { IFrame } from "./IFrame";

export class FinalFrame implements IFrame {
  private rolls: number[] = [];
  private bonus: Bonus = null;

  public roll(knockedPins: number) {
    this.rolls.push(knockedPins);
  }

  public getScore() {
    return this.getKnockedPins();
  }

  public isStrike(): boolean {
    return this.rolls.some((roll) => roll === 10)
      && this.getNumberRolls() < 3;
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

  public hasExtraRoll() {
    return this.isSpare() || this.isStrike();
  }

  public hasFinished(): boolean {
    return this.getNumberRolls() === 3
      || this.getNumberRolls() === 2 && this.getKnockedPins() < 10;
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