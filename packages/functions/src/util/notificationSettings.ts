module.exports = function (db: any) {
  let devices: any = [];

  let hasData = false;

  let waiting: any = [];

  db.collection('push')
    .onSnapshot((querySnapshot: any) => {
      devices = querySnapshot.docs.map((i: any) => i.data());
      hasData = true;
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
      waiting.forEach(i=>i());
      waiting = [];
    });

  return function () {
    return new Promise((resolve, reject) => {
      if(hasData) {
        resolve(devices);
        return;
      } else {
        waiting.push(()=>resolve(devices));
      }
    })
  };
}