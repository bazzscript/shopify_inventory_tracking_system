let date = new Date();

const custom_uid = {};

custom_uid.sku_number =  () => {
  const head = Date.now().toString(36);
  const tail = 'xxxxx-xxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
  return `SKU-${head}-${tail}`;
}

// console.log(custom_uid.sku_number());

module.exports = custom_uid;