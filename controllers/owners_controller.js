const { Router } = require('express');
const router = Router();
const db = require('./../db')


router.get('/', (req, res) => {
    const sql = 'SELECT DISTINCT owner FROM petrol_stations;'

    db.query(sql)
        .then(dbRes => dbRes.rows)
        .then(owners => res.json(owners))
})


module.exports = router;