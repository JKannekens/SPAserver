var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "123456"));
var session = driver.session();

module.exports = {
    readAll(req, res) {
        session.run("MATCH (n:Sport) RETURN n")
            .then((result) => {
            const sportArr = [];
            result.records.forEach((record) => {
                sportArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name
                })
            });
            res.status(200)
            res.json(sportArr);
            session.close();
            });
    },

    readOne(req, res) {
        var id = req.params.id;
        session.run("MATCH(a:Sport) WHERE id(a)=toInt({idParam}) RETURN a", {idParam: id})
            .then((result) => {
                const sportArr = [];
                result.records.forEach((record) => {
                    sportArr.push({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.name
                    })
                });
                res.status(200)
                res.json(sportArr);
                session.close();
            });
    },

    create(req, res) {
        var name = req.body.name;

        session
            .run("CREATE(n:Sport {name:{nameParam}}) RETURN n.name", {nameParam: name})
            .then(function (result) {
                res.redirect('/');
                session.close();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};







