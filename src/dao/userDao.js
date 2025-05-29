const pool = require('../db');

async function insertUsers(records) {
  if (records.length === 0) return;

  try {
    const values = [];
    const placeholders = records.map((record, i) => {
      const idx = i * 4;
      values.push(record.name, record.age, record.address, record.additional_info);
      return `($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4})`;
    }).join(', ');

    const queryText = `
      INSERT INTO public.users ("name", age, address, additional_info)
      VALUES ${placeholders}
    `;

    await pool.query(queryText, values);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function getUsersAge() {
  try {
    const query = `
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN age < 20 THEN 1 ELSE 0 END) AS under_20,
        SUM(CASE WHEN age BETWEEN 20 AND 40 THEN 1 ELSE 0 END) AS age_20_40,
        SUM(CASE WHEN age > 40 AND age <= 60 THEN 1 ELSE 0 END) AS age_40_60,
        SUM(CASE WHEN age > 60 THEN 1 ELSE 0 END) AS over_60
      FROM public.users;
    `;
    const res = await pool.query(query);
    return res.rows[0];
  } catch (e) {
    console.log(e);
    return { total: 0, under_20: 0, age_20_40: 0, age_40_60: 0, over_60: 0 };
  }
}

module.exports = { insertUsers, getUsersAge };
