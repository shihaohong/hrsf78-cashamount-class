function CashAmount(amount) {
  this.cash = amount * 100;
};

CashAmount.prototype.totalInPennies = function() {
  return this.cash;
};

CashAmount.prototype.addDoubleAmount = function(value) {
  this.cash = this.cash + (value * 100);
};

CashAmount.prototype.quantityOfEachDomination = function() {
  var change = this.cash;
  var result = {
    'hundreds': 0,
    'fifties': 0,
    'twenties': 0,
    'tens': 0,
    'fives': 0,
    'ones': 0,
    'quarters': 0,
    'dimes': 0,
    'nickels': 0,
    'pennies': 0
  };

  var quantities = [
    [10000, 'hundreds'], 
    [5000, 'fifties'], 
    [2000, 'twenties'], 
    [1000, 'tens'], 
    [500, 'fives'], 
    [100, 'ones'], 
    [25, 'quarters'], 
    [10, 'dimes'], 
    [5, 'nickels'],
    [1, 'pennies']
  ];

  for (let i = 0; i < quantities.length; i++) {
    while (change >= quantities[i][0]) {
      change = change - quantities[i][0];
      result[quantities[i][1]] += 1;
    }
  }

  return result;
}

CashAmount.prototype.toDouble = function() {
  return this.cash / 100;
}

CashAmount.prototype.toDoubleString = function() {
  return this.cash / 100 + '';
}


// Self-aware testSuite
class TestSuite {
  runTests() {
    this.testTotalInPennies();
    this.testAddDoubleAmount();
    this.testQuantityOfEachDomination();
    this.testToDouble();
    this.testToDoubleString();
    this.testCanonicalFloatingPoint();
  }

  testTotalInPennies() {
    var cash = new CashAmount(10.50);
    var actual = cash.totalInPennies();
    var expected = 1050;
    if (actual === expected) {
      console.log('test passed');
    } else {
      console.log('expected ' + actual + ' to equal ' + expected);
    }
  } 

  testAddDoubleAmount() {
    var cash = new CashAmount(10.50);
    cash.addDoubleAmount(10.20);
    var actual = cash.totalInPennies();
    var expected = 2070;
    if (actual === expected) {
      console.log('test passed');
    } else {
      console.log('expected ' + actual + ' to equal ' + expected);
    }
  }

  testQuantityOfEachDomination() {
    const cash = new CashAmount(967.93);
    var actual = cash.quantityOfEachDomination();
    var expected = {
      'hundreds': 9,
      'fifties': 1,
      'twenties': 0,
      'tens': 1,
      'fives': 1,
      'ones': 2,
      'quarters': 3,
      'dimes': 1,
      'nickels': 1,
      'pennies': 3
    }

    actual = JSON.stringify(actual);
    expected = JSON.stringify(expected);

    if (actual === expected) {
      console.log('test passed');
    } else {
      console.log('expected ' + actual + ' to equal ' + expected);
    }
  }

  testToDouble() {
    var cash = new CashAmount(10.50);
    cash.addDoubleAmount(29.33);
    var actual = cash.toDouble();
    var expected = 39.83;

    if (actual === expected) {
      console.log('test passed');
    } else {
      console.log('expected ' + actual + ' to equal ' + expected);
    }
  }

  testToDoubleString() {
    var cash = new CashAmount(10.50);
    cash.addDoubleAmount(29.33);
    var actual = cash.toDoubleString();
    var expected = '39.83'
    if (actual === expected) {
      console.log('test passed');
    } else {
      console.log('expected ' + actual + ' to equal ' + expected);
    }
  }

  testCanonicalFloatingPoint() {
    var cash = new CashAmount(0.10);
    cash.addDoubleAmount(0.20);
    var actual = cash.totalInPennies() === 30
    var expected = true;

    if (actual === expected) {
      console.log('test passed');
    } else {
      console.log('expected ' + actual + ' to equal ' + expected);
    }
  }
}

const suite = new TestSuite();
suite.runTests();