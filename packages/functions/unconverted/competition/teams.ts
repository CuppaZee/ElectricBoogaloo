module.exports = function (db: any) {
  let teams: any = [];

  let hasData = false;

  let waiting: any = [];

  db.collection('data').where('team','==',true)
    .onSnapshot((querySnapshot: any) => {
      teams = querySnapshot.docs.map((i: any) => i.data());
      hasData = true;
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
      waiting.forEach(i=>i());
      waiting = [];
    });

  return function () {
    return new Promise((resolve, reject) => {
      if(hasData) {
        resolve(teams);
        return;
      } else {
        waiting.push(()=>resolve(teams));
      }
    })
  };
}