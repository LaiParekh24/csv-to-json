function parseLineToObject(headers, line) {
    const values = line.split(',').map(v => v.trim());
    const flatObject = {};
    headers.forEach((key, i) => {
      flatObject[key] = values[i];
    });
  
    const nestedObject = {};
    for (const key in flatObject) {
      const value = flatObject[key];
      const keys = key.split('.');
      let current = nestedObject;
      for (let j = 0; j < keys.length - 1; j++) {
        if (!current[keys[j]]) current[keys[j]] = {};
        current = current[keys[j]];
      }
      current[keys[keys.length - 1]] = value;
    }
  
    return nestedObject;
  }
  
  function extractFields(obj) {
    const name = `${obj.name?.firstName || ''} ${obj.name?.lastName || ''}`.trim();
    const age = parseInt(obj.age);
    const address = obj.address || null;
    delete obj.name;
    delete obj.age;
    delete obj.address;
  
    return {
      name,
      age,
      address,
      additional_info: obj
    };
  }
  
  module.exports = { parseLineToObject, extractFields };
  