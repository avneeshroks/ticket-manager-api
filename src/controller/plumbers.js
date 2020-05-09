const Plumber = require('../model/Plumber');

module.exports = {
    index : async (req, res, next ) => {
        const plumbers = await Plumber.find({});
        res.status(201).json(plumbers);
    },

    create : async (req, res, next) => {

        console.log(" create plumber req body : ", req.body);

        let plumber = new Plumber({
            ...req.body,
            created : Date.now(),
            updated : Date.now()
        });

        try {
            await plumber.save();

            res.status(200).json({
                ...req.body
            });
        } catch(err) {
            let error = new Error('Not Found');
            error.status = err.status;
            error.message = "Something went wrong while creating plumber, please try again later!";
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            let plumber = await Plumber.findById(req.body.id);

            if (!plumber) {
                let error = new Error('Not Found');
                error.status = 201;
                error.message = "Plumber does not exist, please try another!";
                next(error);
            }

            plumber.first_name = req.body.first_name || plumber.first_name; 
            plumber.last_name = req.body.last_name || plumber.last_name; 
            plumber.mobile_primary = req.body.mobile_primary || plumber.mobile_primary; 
            plumber.address = req.body.address || plumber.address; 
            plumber.city = req.body.city || plumber.city; 
            plumber.state = req.body.state || plumber.state; 

            await plumber.save();

            res.status(200).json(req.body);
        } catch (err) {

            let error = new Error('Not Found');
            error.status = err.status;
            error.message = "Something went wrong while updating user, please try again later!";
            next(error);
        }
    },

    delete : async (req, res, next) => {
        try {
            let result = await Plumber.deleteOne({ _id : req.params.id }).exec();
            if (result.n === 0) {
                let error = new Error('Not Found');
                error.status = err.status;
                error.message = "Pluber does not exist, please try another!";
                next(error);
            } else {
                res.json({ message: 'Successfully deleted plumber: ' + req.params.id + '!' });
            }
        } catch(err) {
            let error = new Error('Not Found');
            error.status = err.status;
            error.message = "Something went wrong while deleting plumber, please try again later!";
            next(error);
        }
    }
}