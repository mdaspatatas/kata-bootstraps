export interface IFrame {
  roll(knockedPins: number);
  getScore(bonusRolls?: number[]);
  isStrike(): boolean;
  getNumberRolls(): number;
  getRolls(): number[];
  isSpare(): boolean;
  hasFinished(): boolean;
  areEnoughRolls(playedRolls: number, allRolls: number): boolean;
}