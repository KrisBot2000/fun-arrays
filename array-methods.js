var dataset = require('./dataset.json');
var bankAccounts = dataset.bankBalances.map(convert);


function convert(account){
  return {
    "amount": parseFloat(account.amount),
    "state": account.state,
  };
}
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/

var hundredThousandairs = dataset.bankBalances.filter(isRich);

function isRich(account){
  return account.amount>100000;
}

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = dataset.bankBalances.map(round);

function round(account){
  return {
    "amount": account.amount,
    "state": account.state,
    "rounded": Math.round(account.amount)
  };
}

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = dataset.bankBalances.map(roundAgain);

function roundAgain(account){
  return {
    "amount": account.amount,
    "state": account.state,
    "roundedDime": Math.round(account.amount*10)/10
  };
}

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = dataset.bankBalances.reduce(sum, 0);

function sum(total, account){
  return Math.round((total + parseFloat(account.amount))*100)/100;
}

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and calculate 18.9% interest rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = dataset.bankBalances.filter(states).map(interest).reduce(getInterest, 0);


function states(account){
  if(account.state==="WI" || account.state==="IL" || account.state==="WY" || account.state==="OH" || account.state==="GA" || account.state==="DE"){
    return account;
  }
}

function interest(account){
  return {
    "amount": account.amount,
    "state": account.state,
    "interest": (Math.round(((parseFloat(account.amount))*.189)*100))/100
  };
}

function getInterest(total, account){
  return Math.round((parseFloat(total + account.interest))*100)/100;
}

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point during your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */

//USED NEW bankAccounts ARRAY STARTING HERE, DECLARED AT BEGINNING!
var stateSums = bankAccounts.reduce(stateObj, {});


function stateObj(obj, account){
  if (obj.hasOwnProperty(account.state)){
    console.log("if amount");
    console.log(account.amount);
    obj[account.state] += parseFloat(account.amount.toFixed(2));
  }else{
    console.log("else amount");
    console.log(account.amount);
    obj[account.state] = account.amount;
  }
  //console.log(bankAccounts);
  console.log(obj);
  return obj;
}









/*
  Exclude the following states from your filter:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  Take each `amount` returned from the filter and add 18.9% interest to it. If the added amount is over 50,000, sum the `amounts` and save result to `sumOfHighInterests`.

  note: During your summation (
    If at any point during your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
