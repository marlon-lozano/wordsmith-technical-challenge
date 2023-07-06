function arabicToRoman(num: number): string {
  if (num < 1 || num > 3999) {
    throw new Error('Input must be between 1 and 3999');
  }
  
  const romanNumeralsMap: { [key: number]: string } = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M'
  };

  let romanNumerals: string = '';

  // array of keys sorted in descending order
  const keys = Object.keys(romanNumeralsMap).map(Number).sort((a, b) => b - a);

  for (let i = 0; i < keys.length; i++) {
    while (num >= keys[i]) {
      romanNumerals += romanNumeralsMap[keys[i]];
      num -= keys[i];
    }
  }

  return romanNumerals;
}

console.log(arabicToRoman(123)); // prints: CXXIII
