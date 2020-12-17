const db = require('@cuppazee/types').default;
const TypeTags = require('@cuppazee/types/lib/munzee').TypeTags;
// const fs = require('fs');

// let page = ``;

for(const type of db.types.filter(i=>i.has_tag(TypeTags.TypePOI))) {
  console.log(type.name);
  // page += `<h2>${category.name}</h2>`
  // // console.log(JSON.stringify(category.types));
  // for(const type of category.types) {
  //   page += `<img style="height: 50px" src="${type.iconURL}" />`
  //   // page += `${type.category_raw}<br/>`
  // }
}

console.log(db.getType('https://munzee.global.ssl.fastly.net/images/pins/electricmystery.png').i)
console.log(db.getType('https://munzee.global.ssl.fastly.net/images/pins/electricmystery.png').has_tag(TypeTags.TypeMystery))

// console.log(db._categories.keys())

// fs.writeFileSync('index.html', page);