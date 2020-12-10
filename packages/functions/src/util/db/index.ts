var types = require('./types.json');
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var typekeys = require('./typekeys.json');
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var idkeys = require('./idkeys.json');
function g(icon: any) {
  if(icon.startsWith('https://munzee.global')) icon = icon.slice(49,-4);
  var x = decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'');
  if(x!=="munzee"&&x.endsWith('munzee')) return x.replace(/munzee$/,'');
  return x;
}

module.exports = {
  get(by: any,check: any){
    if(by==="icon") {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return types[typekeys[g(check)]];
    } else if(by==="id") {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return types[idkeys[check]];
    } else {
      return types.find((i: any) => i[by]===check);
    }
  },
  g
}