var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://hobby-ilohfblfobflgbkeekpegjal.dbs.graphenedb.com:24786", neo4j.auth.basic("neo4j", "123456"));
var session = driver.session();

module.exports = {
    readAll(req, res) {
        session.run("MATCH (a: Sport) RETURN a")
            .then(result => {
                var sportArray = [];

                result.records.forEach(record => {
                   sportArray.push({
                       id: record._fields[0].identity.low,
                       name: record._fields[0].properties.name,
                   });
                   console.log(record._fields[0]);
                });
                    res.status(200);
                    res.json(sportArray);
                    session.close();
                    })
                    .catch(error => {
                        console.log(error);
                    });
    },

    readOne(req, res) {
        var id = req.params.id;
        session.run("MATCH(a:Sport) WHERE id(a)=toInt({idParam}) RETURN a.name as name", {idParam: id})
            .then(function (result) {
                var name = result.records[0].get("name");

                session
                    .run("OPTIONAL MATCH (a:Sport)-[r:NEEDS]-(b:Attribute) WHERE id(a)=toInt({idParam}) RETURN b.attributeName as attributeName, r.attributeAmount as attributeAmount", {idParam: id})
                    .then(function (result2) {
                        var attributeName = result2.records[0].get("attributeName");
                        var attributeAmount = result2.records[0].get("attributeAmount");

                        res.json({
                            id: id,
                            name: name,
                            attributeName: attributeName,
                            attributeAmount: attributeAmount
                    });

                        session.close();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
    },

    createSport(req, res) {
        var name = req.body.name;
        session
            .run("CREATE(n:Sport {name:{nameParam}}) RETURN n.name", {nameParam: name})
            .then(function (result) {
                res.redirect('/sports');
                session.close();
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    createAttribute(req, res) {
        var attributeName = req.body.name;
        session
            .run("CREATE(n:Attribute {attributeName:{attributeNameParam}}) RETURN n.attributeName", {attributeNameParam: attributeName})
            .then(function (result) {
                res.redirect('/attributes');
                session.close();
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    addAttributeToSport(req, res) {
        var name = req.body.name;
        var attributeName = req.body.attributeName;
        var attributeAmount = req.body.attributeAmount;

        session
            .run("MATCH(a:Sport {name:{nameParam}}),(b:Attribute {attributeName:{attributeNameParam}}) MERGE(a)-[r:NEEDS {attributeAmount:{attributeAmountParam}}]->(b) RETURN a,b", {
                nameParam: name,
                attributeNameParam: attributeName,
                attributeAmountParam: attributeAmount
            })
            .then(function (result) {
                res.redirect('/sports');
                session.close();
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateSport(req, res) {
      res.contentType('application/json');
      const id = req.params.id;
      const body = req.body;

      session.run('MATCH (a: Sport) WHERE id(a)=toInt({paramID}) SET a.name={paramName} RETURN a',
          {
              paramID: id,
              paramName: body.name
          })
          .then(result => {
              const record = result.records[0];
              const sportArr = ({
                  id: record._fields[0].properties.low,
                  name: record._fields[0].properties.name
              });
              res.status(200).send(sportArr);
              session.close();
          })
          .catch(error => {
              res.status(400).json(error);
              console.log(error);
              session.close();
          });
    },

    removeSport(req, res) {
        res.contentType('application/json');
        const id = req.params.id;

        session.run('MATCH (a:Sport) WHERE id(a)=toInt({paramID}) DETACH DELETE a', {paramID: id})
            .then(result => {
                res.status(200).json({id: id});
                session.close();
            }).catch(error => {
                res.status(400).json(error);
                session.close()
        })
    }
};







