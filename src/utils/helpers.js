const { generateRandomId, formatDate, calculateAverage, convertToUppercase } = require('./src/utils/helpers');

describe('Helper Functions', () => {
  describe('generateRandomId', () => {
    it('should generate a random ID with 10 characters', () => {
      const randomId = generateRandomId();
      expect(randomId).toHaveLength(10);
    });
  });

  describe('formatDate', () => {
    it('should format a date to a specific format', () => {
      const date = new Date('2022-01-01');
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe('January 1, 2022');
    });
  });

  describe('calculateAverage', () => {
    it('should calculate the average of an array of numbers', () => {
      const numbers = [1, 2, 3, 4, 5];
      const average = calculateAverage(numbers);
      expect(average).toBe(3);
    });
  });

  describe('convertToUppercase', () => {
    it('should convert a string to uppercase', () => {
      const str = 'hello world';
      const uppercaseStr = convertToUppercase(str);
      expect(uppercaseStr).toBe('HELLO WORLD');
    });
  });
});