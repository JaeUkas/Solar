var Pannel = require('../models/Pannel');

module.exports = {
    RegisterPannel: function (req, res, next) {

        var dayOutput_Array = [];
        var obj = new Object();

        obj.date = new Date().toISOString().substr(0, 10).replace('T', ' ');
        obj.output = "0";

        dayOutput_Array.push(obj);

        var newPannel = new Pannel({
            auth_id: req.body.auth_id,
            maxOutput: req.body.maxOutput,
            dayOutput: dayOutput_Array,
            lanx: req.body.lanx,
            lany: req.body.lany
        });

        newPannel.save(function (error, data) {
            if (error) {
                res.send({ success: false });
            }
            else {
                res.send({ success: true });
            }
        }); // DB 정보 저장
    },


    UpdatePannel: function (req, res, next) {

        var date = new Date().toISOString().substr(0, 10).replace('T', ' ');

        Pannel.find({ "dayOutput": { "$elemMatch": { "date": date } } }).exec(function (error, p) {
            if (p == null) {
                var obj = new Object();

                obj.date = new Date().toISOString().substr(0, 10).replace('T', ' ');
                obj.output = "0";

                Pannel.update({"_id" : req.body.params.pannel_id },{'$push':{"dayOutput" : obj}});
                res.send({ success: true });
            }
            else {
                Pannel.update({ "dayOutput": { "$elemMatch": { "date": date } } },{$set:{"dayOutput.$.output":req.body.output}});
                res.send({ success: true });
            }
        });

    },

    infoPannel: function (req, res, next) {
        Pannel.find({ auth_id: req.params.auth_id }).sort({}).exec(function (error, p) {
            if (error) {
                console.log(error);
            }
            else {
                res.send(p);
            }
        })

    }



}