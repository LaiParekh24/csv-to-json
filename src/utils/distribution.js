const { getUsersAge } = require("../dao/userDao");

async function calculateAgeDistribution() {

  const { total, under_20, age_20_40, age_40_60, over_60 } = await getUsersAge();

  console.log("Age-Group % Distribution");
  console.log(`< 20       ${(under_20 / total * 100).toFixed(2)}%`);
  console.log(`20 to 40   ${(age_20_40 / total * 100).toFixed(2)}%`);
  console.log(`40 to 60   ${(age_40_60 / total * 100).toFixed(2)}%`);
  console.log(`> 60       ${(over_60 / total * 100).toFixed(2)}%`);
}
module.exports = calculateAgeDistribution;
