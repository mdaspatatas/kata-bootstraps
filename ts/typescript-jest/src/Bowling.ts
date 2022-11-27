import { FactoryFrame } from "./Factories";
import { Frame } from "./Frame";
import { IFrame } from "./IFrame";

export class Game {
  private frameNumber: number;
  private frames: IFrame[];

  constructor() {
    this.frameNumber = 1;
    this.frames = [new Frame()];
  }
  
  public roll(knockedPins: number): void {
    const currentFrame = this.frames[this.frameNumber - 1];
    currentFrame.roll(knockedPins);
    if(!currentFrame.hasFinished()) {
      return;
    }
    if(this.gameHasFinished(currentFrame)) {
      return;
    }
    this.frames.push(FactoryFrame.createFrame(this.frameNumber));
    this.frameNumber++;
  }

  public score(): number {
    let totalScore = 0;
    const playedRolls = this.getAllRolls();
    for (let i = 0; i < this.frames.length; i++) {
      const currentFrame = this.frames[i];
      totalScore += this.getFrameScore(currentFrame, i, playedRolls);
    }
    return totalScore;
  }

  private getFrameScore(frame: IFrame, frameIndex: number, playedRolls: number): number {
    const currentFrameNumber = frameIndex + 1;
    const currentRolls = this.getAllRolls(currentFrameNumber);
    const enoughRolls = frame.areEnoughRolls(currentRolls, playedRolls);
    if (!enoughRolls) {
      return frame.getScore();
    }
    const nextFrameIndex = frameIndex + 1;
    return frame.getScore(this.getNextRolls(nextFrameIndex));
  }

  private getNextRolls(nextFrameIndex: number): number[] {
    let nextRolls = [];
    const nextFrame = this.frames[nextFrameIndex];
    let rolls = nextFrame.getNumberRolls() < 2
      ? nextFrame.getRolls().concat(this.frames[nextFrameIndex + 1].getRolls())
      : nextFrame.getRolls(); 
    nextRolls.push(...rolls);
    return nextRolls;
  }

  private getAllRolls(frameNumber: number = this.frameNumber): number {
    let totalRolls: number = 0;
    for (let i = 0; i < frameNumber; i++) {
      totalRolls += this.frames[i].getNumberRolls();
    }
    return totalRolls;
  }

  private gameHasFinished(frame: IFrame): boolean {
    return this.frameNumber === 10 && frame.hasFinished();
  }
}


