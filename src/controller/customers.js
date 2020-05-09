const Customer = require('../model/Customer');

module.exports = {
    index : async (req, res, next ) => {
        const customers = await Customer.find({});
        res.status(201).json(customers);
    },

    create : async (req, res, next) => {

        console.log(" create customer req body : ", req.body);
        let customer = new Customer({
            ...req.body,
            created : Date.now(),
            updated : Date.now()
        });

        try {
            await customer.save();
            
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
            let customer = await Customer.findById(req.body.id);

            if (!customer) {
                let error = new Error('Not Found');
                error.status = 201;
                error.message = "User does not exist, please try another!";
                next(error);
            }

            customer.rtn = req.body.rtn || customer.rtn;
            customer.email = req.body.email || customer.email;
            customer.salutation = req.body.salutation || customer.salutation;
            customer.first_name = req.body.first_name || customer.first_name;
            customer.middle_name = req.body.middle_name || customer.middle_name;
            customer.last_name = req.body.last_name || customer.last_name;
            customer.address_line_one = req.body.address_line_one || customer.address_line_one;
            customer.address_line_two = req.body.address_line_two || customer.address_line_two;
            customer.area = req.body.area || customer.area;
            customer.city = req.body.city || customer.city;
            customer.state = req.body.state || customer.state;
            customer.pincode = req.body.pincode || customer.pincode;
            customer.mobile_primary = req.body.mobile_primary || customer.mobile_primary;
            customer.mobile_secondary = req.body.mobile_secondary || customer.mobile_secondary;
            customer.landline = req.body.landline || customer.landline;


            await customer.save();

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
            let result = await Customer.deleteOne({ _id : req.params.id }).exec();
            if (result.n === 0) {
                let error = new Error('Not Found');
                error.status = err.status;
                error.message = "Customer does not exist, please try another!";
                next(error);
            } else {
                res.json({ message: 'Successfully deleted monitor: ' + req.params.id + '!' });
            }
        } catch(err) {
            let error = new Error('Not Found');
            error.status = err.status;
            error.message = "Something went wrong while deleting Customer, please try again later!";
            next(error);
        }
    }
}