const { Router } = require('express');
const router = Router();
const db = require("../db");
var _ = require('underscore');

router.get("/all", (req, res) => {

    const sql = "SELECT * FROM petrol_stations LIMIT 400;";

    db.query(sql)
        .then(dbRes => res.json(dbRes.rows))
        ;
})

router.get("/random", (req, res) => {
    const sql = "SELECT * FROM petrol_stations;";

    db.query(sql)
        .then(dbRes => res.json(dbRes.rows[_.random(0, dbRes.rows.length - 1)]))
})


router.get('/bounds', (req, res) => {

    const [lowerLat, upperLat, lowerLng, upperLng] = [req.query.lowerlat, req.query.upperlat, req.query.lowerlng, req.query.upperlng]

    const sql = 'SELECT * FROM petrol_stations WHERE latitude BETWEEN $1 and $2 AND longitude BETWEEN $3 and $4;'

    db.query(sql, [lowerLat, upperLat, lowerLng, upperLng])
        .then(dbRes => res.json(dbRes.rows))
        ;
})



module.exports = router;