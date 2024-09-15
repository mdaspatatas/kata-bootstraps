import { BonusSpare, BonusStrike } from "./Bonus";
import { Frame } from "./Frame";

describe('Frame', () => {
  describe('roll', () => {
    it('should set the expected knocked pins', () => {
      const frame = new Frame();
  
      frame.roll(5);
  
      expect(frame.getNumberRolls()).toEqual(1)
      expect(frame.getScore()).toEqual(5);
    })
  
    it('should set 10 knocked pins', () => {
      const frame = new Frame();
  
      frame.roll(5);
      frame.roll(5);
  
      expect(frame.getNumberRolls()).toEqual(2);
      expect(frame.getScore()).toEqual(10);
    })
  });

  describe('getScore', () => {
    describe('without bonus', () => {
      it('should return the expected value and call getKnockedPins', () => {
        const frame = new Frame();
        const stubGetKnockedPins = spyOn<any>(frame, 'getKnockedPins').and.callThrough();
  
        frame.roll(5);
        frame.roll(5);
        const result = frame.getScore();
        
        expect(result).toEqual(10);
        expect(stubGetKnockedPins).toHaveBeenCalledTimes(1);
      });
  
      it('should return the expected value and call getKnockedPins', () => {
        const frame = new Frame();
        const stubGetKnockedPins = spyOn<any>(frame, 'getKnockedPins').and.callThrough();
        const stubHasBonus = spyOn<any>(frame, 'hasBonus').and.callThrough();
        const newRoll = [1];
        
        frame.roll(5);
        frame.roll(5);
        const result = frame.getScore(newRoll);
    
        expect(result).toEqual(11);
        expect(stubGetKnockedPins).toHaveBeenCalledTimes(1);
        expect(stubHasBonus).toHaveBeenCalledTimes(1);
      });
    });

    describe('with spare bonus', () => {
      it('should return the expected value when no bonus roll has been passed to it', () => {
        const spareFrame = new Frame();

        spareFrame.roll(5);
        spareFrame.roll(5);
        const result = spareFrame.getScore();

        const expectedValue = spareFrame['getKnockedPins']();
        
        expect(result).toEqual(expectedValue);
      });
  
      it('should return the expected value', () => {
        const spareFrame = new Frame();
        const newRoll = [1];

        spareFrame.roll(5);
        spareFrame.roll(5);
        const expectedValue = spareFrame['getKnockedPins']();
        const result = spareFrame.getScore(newRoll);
        
        expect(result).not.toEqual(expectedValue);
        expect(result).toEqual(11)
      });
    });

    describe('with strike bonus', () => {
      it('should return the expected value when no bonus roll has been passed to it', () => {
        const strikeFrame = new Frame();

        strikeFrame.roll(5);
        strikeFrame.roll(5);
        const expectedValue = strikeFrame['getKnockedPins']();
        const result = strikeFrame.getScore();
        
        
        expect(result).toEqual(expectedValue);
      });
  
      it('should return the expected value', () => {
        const strikeFrame = new Frame();
        const twoRolls = [1, 2];

        strikeFrame.roll(10);
        const result = strikeFrame.getScore(twoRolls);
        const expectedValue = strikeFrame['getKnockedPins']();
        
        expect(result).not.toEqual(expectedValue);
        expect(result).toEqual(13)
      });
    });
  });
});