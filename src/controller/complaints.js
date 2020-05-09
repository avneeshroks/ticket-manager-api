const Complaint = require('../model/Complaint');
const Customer = require('../model/Customer');
const Plumber = require('../model/Plumber');

module.exports = {
    index : async (req, res, next ) => {
        const complaints = await Complaint.find({}).populate('customer').populate('plumber');
        res.status(201).json(complaints);
    },

    create : async (req, res, next) => {

        console.log(" create complaint req body : ", req.body);

        let complaint = new Complaint({
            ...req.body,
            created : Date.now(),
            updated : Date.now()
        });

        complaint.customer = await Customer.findById(req.body.customer_id);
        complaint.plumber = await Plumber.findById(req.body.plumber_id);

        try {
            await complaint.save();

    
            res.status(200).json({
                ...req.body
            });
        } catch(err) {
            let error = new Error('Not Found');
            error.status = err.status;
            error.message = "Something went wrong while creating customer, please try again later!";
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            let complaint = await Complaint.findById(req.body.id);

            if (!complaint) {
                let error = new Error('Not Found');
                error.status = 201;
                error.message = "Complaint does not exist, please try another!";
                next(error);
            }

            complaint.srn = req.body.srn || complaint.srn;
            complaint.city = req.body.city || complaint.city;
            complaint.status = req.body.status || complaint.status;

            complaint.plumber = req.body.plumber_id ? await Plumber.findById(req.body.plumber_id) : complaint.plumber;

            await complaint.save();

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
            let result = await Complaint.deleteOne({ _id : req.params.id }).exec();
            if (result.n === 0) {
                let error = new Error('Not Found');
                error.status = err.status;
                error.message = "Complaint does not exist, please try another!";
                next(error);
            } else {
                res.json({ message: 'Successfully deleted complaint: ' + req.params.id + '!' });
            }
        } catch(err) {
            let error = new Error('Not Found');
            error.status = err.status;
            error.message = "Something went wrong while deleting Complaint, please try again later!";
            next(error);
        }
    }
}