import { Game } from './Bowling';

describe('Game', () => {  
  describe('score', () => {
    let game;

    beforeAll(() => {
      game = new Game()
    });


    it('should return 0 when a new game has started', () => {
      const result = game.score();

      expect(result).toEqual(0);
    });

    it('should return 300 for a perfect game', () => {
      const newGame = new Game();
      
      rollMany(12, 10, newGame);
      
      expect(newGame.score()).toEqual(300);
    });

    it('should return 290 for an almost perfect game', () => {
      const newGame = new Game();
      
      rollMany(11, 10, newGame);
      newGame.roll(0);
      
      expect(newGame.score()).toEqual(290);
    });

    it('should return 0 for a shitty game', () => {
      const newGame = new Game();
      
      rollMany(22, 0, newGame);
      
      expect(newGame.score()).toEqual(0);
    });
  });

  describe('roll', () => {
    it('should return 2 if it has scored 2 the first roll', () => {
      const newGame = new Game();
      newGame.roll(2);
      const result = newGame.score();

      expect(result).toEqual(2);
    });

    it('should have 10 points when knocked 10 pins on the first roll', () => {
      const newGame = new Game();

      newGame.roll(10);
      const result = newGame.score();

      expect(result).toEqual(10);
    });

    it('should have 14 points when strike on the first roll and 1 in two the next ones', () => {
      const newGame = new Game();

      newGame.roll(10);
      newGame.roll(1);
      newGame.roll(1);
      const result = newGame.score();

      expect(result).toEqual(14);
    });

    it('should have 30 points when spare on the first roll and 10 in the next one', () => {
      const newGame = new Game();

      newGame.roll(4);
      newGame.roll(6);
      newGame.roll(10);
      const result = newGame.score();

      expect(result).toEqual(30);
    });

    it('should have the expected points when rolling the second time of the first frame', () => {
      const newGame = new Game();

      newGame.roll(4);
      newGame.roll(4);
      const result = newGame.score();

      expect(result).toEqual(8);
    });

    it('should have added a new Frame when first frame has ended', () => {
      const newGame = new Game();

      newGame.roll(4);
      newGame.roll(5);

      expect(newGame['frameNumber']).toEqual(2);
      expect(newGame['frames'].length).toEqual(2);
    })

    it('should have added a new Frame when strike at the first frame', () => {
      const newGame = new Game();

      newGame.roll(10);

      expect(newGame['frameNumber']).toEqual(2);
      expect(newGame['frames'].length).toEqual(2);
    })

    it('should have added a new Frame when spare at the first frame', () => {
      const newGame = new Game();

      newGame.roll(4);
      newGame.roll(6);

      expect(newGame['frameNumber']).toEqual(2);
      expect(newGame['frames'].length).toEqual(2);
    })
  });

  function rollMany(times: number, pins: number, game: Game):void {
    for (let i = 0; i < times; i++) {
      game.roll(pins);
    }
  }
});