var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');

var UserAccount = require('./models/usersaccount');
var User = require('./models/user');
var Policy = require('./models/policy');
var Dob = require('./models/dob');
var Agent = require('./models/agent');
var csv = require('csvtojson');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

var excelToJson = require('convert-excel-to-json');
var xlsx = require('node-xlsx');
var fs = require('fs');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var uploads = multer({ storage: storage });
//connect to db  
mongoose.connect('mongodb+srv://User12345:User12345@cluster0.hd2oz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err))
    //init app  
var app = express();
//set the template engine  
app.set('view engine', 'ejs');
//fetch data from the request  
app.use(bodyParser.urlencoded({ extended: false }));
//static folder  
app.use(express.static(path.resolve(__dirname, 'public')));
//default pageload  
app.get('/useraccount', (req, res) => {
    UserAccount.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data != '') {
                res.render('userAccount', { data: data });
            } else {
                res.render('userAccount', { data: '' });
            }
        }
    });
});
var temp;

//for user account model
app.post('/add-useraccount', uploads.single('csv'), async(req, res) => {

    const jsonArray = await csv().fromFile(req.file.path);
    console.log(jsonArray[0]);
    console.log(req.file.path.split(' ')); //req.originalname
    var datacsv = [];
    jsonArray.forEach(function(cssv, index) {
        datacsv[index] = {
            userType: cssv.userType,
            producer: cssv.producer,
            premium_amount_written: cssv.premium_amount_written,
            company_name: cssv.company_name,
            category_name: cssv.category_name,
            csr: cssv.csr,
            account_name: cssv.account_name,
            account_type: cssv.account_type,
        };
    });
    UserAccount.insertMany(datacsv, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/useraccount');
        }
    });
    // });
});


//for user model
app.get('/user', (req, res) => {
    User.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data != '') {
                res.render('user', { data: data });
            } else {
                res.render('user', { data: '' });
            }
        }
    });
});
var temp;

//for user account model
app.post('/adduser', uploads.single('csv'), async(req, res) => {

    const jsonArray = await csv().fromFile(req.file.path);
    console.log(jsonArray[0]);
    console.log(req.file.path.split(' ')); //req.originalname
    var datacsv = [];
    jsonArray.forEach(function(cssv, index) {
        datacsv[index] = {
            email: cssv.email,
            gender: cssv.gender,
            firstname: cssv.firstname,
            city: cssv.city,
            phone: cssv.phone,
            address: cssv.address,
            state: cssv.state,
            zip: cssv.zip,
        };
    });
    User.insertMany(datacsv, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/user');
        }
    });
    // });
});

//for policy model

app.get('/policy', (req, res) => {
    Policy.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data != '') {
                res.render('policy', { data: data });
            } else {
                res.render('policy', { data: '' });
            }
        }
    });
});
var temp;


app.post('/add-policy', uploads.single('csv'), async(req, res) => {

    const jsonArray = await csv().fromFile(req.file.path);
    console.log(jsonArray[0]);
    console.log(req.file.path.split(' ')); //req.originalname
    var datacsv = [];
    jsonArray.forEach(function(cssv, index) {
        datacsv[index] = {
            policy_number: cssv.policy_number,
            policy_mode: cssv.policy_mode,
            policy_type: cssv.policy_type,
            policy_start_date: cssv.policy_start_date,
            policy_end_date: cssv.policy_end_date,

        };
    });
    Policy.insertMany(datacsv, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/policy');
        }
    });
    // });
});

//for dob model


app.get('/dob', (req, res) => {
    Dob.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data != '') {
                res.render('dob', { data: data });
            } else {
                res.render('dob', { data: '' });
            }
        }
    });
});
var temp;


app.post('/add-dob', uploads.single('csv'), async(req, res) => {

    const jsonArray = await csv().fromFile(req.file.path);
    console.log(jsonArray[0]);
    console.log(req.file.path.split(' ')); //req.originalname
    var datacsv = [];
    jsonArray.forEach(function(cssv, index) {
        datacsv[index] = {
            dob: cssv.dob,
        };
    });
    Dob.insertMany(datacsv, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/dob');
        }
    });
    // });
});



//for dob model


app.get('/agent', (req, res) => {
    Agent.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data != '') {
                res.render('dob', { data: data });
            } else {
                res.render('dob', { data: '' });
            }
        }
    });
});
var temp;


app.post('/add-agent', uploads.single('csv'), async(req, res) => {

    const jsonArray = await csv().fromFile(req.file.path);
    console.log(jsonArray[0]);
    console.log(req.file.path.split(' ')); //req.originalname
    var datacsv = [];
    jsonArray.forEach(function(cssv, index) {
        datacsv[index] = {
            agent: cssv.agent,
            agency_id: cssv.agency_id,
        };
    });
    Agent.insertMany(datacsv, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/agent');
        }
    });
    // });
});

// APIs for CRUD Operation
//edit User
app.use(express.json());
app.post('/user/edit/:user_id', async(req, res) => {

    if (req.params.user_id) {

        console.log(req.body.email);
        const user = await User.findByIdAndUpdate({ _id: req.params.user_id }, { email: req.body.email }, {
            new: true,
        });
        const updateuser = await user.save();
        if (updateuser) {
            res.json({ status: true, message: "user updated successfully", data: { updateuser } });
        } else {
            res.json({ status: false, message: "something went wrong!", data: {} });
        }
        // });
    } else {
        res.json({ status: false, message: "User not found !!", data: {} });
    }
});

//delete user
app.get('/user/delete/:user_id', async(req, res) => {


    try {
        User.findOneAndRemove({ _id: req.params.user_id }, async(err) => {
            if (!err) {

                res.json({ status: true, message: "User deleted successfully", data: {} })
            } else {
                res.json({ status: false, message: "something went wrong!", data: {} })
            }
        });

    } catch (err) {
        res.json({ status: false, message: "something went wrong!", data: {} })
    }
    // });
});


//get user
app.get('/get-user', async(req, res) => {


    User.find().sort({ created_at: -1 }).limit(100).exec(function(err, users) {
        if (!err) {

            var userMap = [];

            users.forEach(function(user, index) {
                userMap[index] = {
                    _id: user._id,
                    email: user.email,
                    gender: user.gender,
                    firstname: user.firstname,
                    city: user.city,
                    phone: user.phone,
                    address: user.address,
                    state: user.state,
                    zip: user.zip

                };
            });
            res.status(200).json({ status: true, message: 'Data fetched successfully', data: userMap });


        } else {
            res.status(200).json({ status: false, message: 'unable to fetch data', data: {} });
        }
    });

    // });
});



//edit Account

app.post('/account/edit/:account_id', async(req, res) => {


    const account = await UserAccount.findByIdAndUpdate({ _id: req.params.account_id }, {
        ...req.body,

    }, {
        omitUndefined: true,
        new: true,
    });
    res.send('User Updated succesfully');
    const updateuseraccount = await account.save();
    if (updateuseraccount) {
        res.json({ status: true, message: "User deleted successfully", data: { updateuseraccount } })
    } else {
        res.json({ status: false, message: "something went wrong!", data: {} })
    }
    // });
});

//useraccount delete

//delete user
app.get('/account/delete/:account_id', async(req, res) => {


    try {
        UserAccount.findOneAndRemove({ _id: req.params.account_id }, async(err) => {
            if (err) {
                res.json({ status: false, message: "something went wrong!", data: {} })
            } else {
                res.json({ status: true, message: "User deleted successfully", data: {} })
            }
        });

    } catch (err) {
        res.json({ status: false, message: "something went wrong!", data: {} })
    }
    // });
});



//get User Account
app.get('/get-useraccount', async(req, res) => {


    UserAccount.find().sort({ created_at: -1 }).limit(100).exec(function(err, useraccounts) {
        if (!err) {

            var useraccountMap = [];

            useraccounts.forEach(function(useraccount, index) {
                useraccountMap[index] = {
                    _id: useraccount._id,
                    userType: useraccount.userType,
                    producer: useraccount.producer,
                    premium_amount_written: useraccount.premium_amount_written,
                    company_name: useraccount.company_name,
                    category_name: useraccount.category_name,
                    csr: useraccount.csr,
                    account_name: useraccount.account_name,
                    account_type: useraccount.account_type,

                };
            });
            res.status(200).json({ status: true, message: 'Data fetched successfully', data: useraccountMap });


        } else {
            res.status(200).json({ status: false, message: 'unable to fetch data', data: {} });
        }
    });

    // });
});



//policy


//edit policy

app.post('/policy/edit/:policy_id', async(req, res) => {


    const policy = await Policy.findByIdAndUpdate({ _id: req.params.policy_id }, {
        ...req.body,

    }, {
        omitUndefined: true,
        new: true,
    });
    const updatepolicy = await policy.save();
    if (updatepolicy) {
        res.json({ status: true, message: "User deleted successfully", data: { updatepolicy } })
    } else {
        res.json({ status: false, message: "something went wrong!", data: {} })
    }
    // });
});

//useraccount delete

//delete user
app.get('/policy/delete/:policy_id', async(req, res) => {


    try {
        Policy.findOneAndRemove({ _id: req.params.policy_id }, async(err) => {
            if (err) {
                res.json({ status: false, message: "something went wrong!", data: {} })
            } else {
                res.json({ status: true, message: "Policy deleted successfully", data: {} })
            }
        });

    } catch (err) {
        res.json({ status: false, message: "something went wrong!", data: {} })
    }
    // });
});



//get User Account
app.get('/get-policy', async(req, res) => {


    Policy.find().sort({ created_at: -1 }).limit(10).exec(function(err, policys) {
        if (!err) {

            var policyMap = [];

            policys.forEach(function(policy, index) {
                policyMap[index] = {
                    _id: policy._id,
                    policy_number: policy.email,
                    policy_mode: policy.gender,
                    policy_type: policy.firstname,
                    policy_start_date: policy.city,
                    policy_end_date: policy.phone,


                };
            });
            res.status(200).json({ status: true, message: 'Data fetched successfully', data: policyMap });


        } else {
            res.status(200).json({ status: false, message: 'unable to fetch data', data: {} });
        }
    });

    // });
});




var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server run at port ' + port));