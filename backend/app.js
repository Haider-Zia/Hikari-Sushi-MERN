const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const Customers = require("../backend/models/customer");
const Reservations = require("../backend/models/reservation");
const Orders = require("../backend/models/order")
const app = express();
const port = 3001;

mongoose
  .connect(
    "mongodb+srv://waseem:7oEK4EXSChmsV5Rh@cluster0.e2b0f.mongodb.net/RestaurantMS",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.log("FAILED to connect with the DB!!!, Errors are as below:");
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World andwndjawnd!");
});
///////////////////////////////////////////////
////////ORDERS ROUTES BEGIN

app.post("/api/createOrderinDB", (req, res, next) => {
  const order = new Orders({
    Order: req.body.Order,
    Address: req.body.Address,
    Phone: req.body.Phone,
    TotalPrice: req.body.TotalPrice,
  });

  order.save().then((result) => {
    res.status(201).json({
      message:
        "Order has been placed successfuly! response from app.js file.",
      result: result,
    });
  });

  console.log(
    "   ==> {/api/createOrderinDB} Total Price == ",
    order.TotalPrice
  );
});

app.get("/api/getAllOrders", (req, res, next) => {
  Orders.find().then((result) => {
    res.status(200).json({
      message: "All Orders are downloaded from DB.",
      orders: result,
    });

    console.log(
      "   ==> {/api/getAllOrders} All Orders downloaded."
    );
  });
});

////////ORDERS ROUTES ABOVE
///////////////////////////////////////////////

///////////////////////////////////////////////
////////CUSTOMER ROUTES BEGIN


app.post("/api/createCustomerinDB", (req, res, next) => {
  const customer = new Customers({
    Username: req.body.Username,
    Name: req.body.Name,
    Password: req.body.Password,
    Email: req.body.Email,
    UserType: req.body.UserType,
  });

  customer
    .save()
    .then((result) => {
      res.status(201).json({
        message:
          "Customer has been created succefully! resposne from app.js file.",
        result: result,
      });
    })

  console.log(
    "   ==> {/api/createCustomerinDB} Username == ",
    customer.Username
  );
});

app.get("/api/getThisCustomer", (req, res, next) => {
  Customers.find({Username:req.body.Username, Password:req.body.Password}).then((result) => {
    res.status(200).json({
      message: "User downloaded.",
      customers: result,
    });

    console.log(
      "   ==> {/api/getThisCustomer} Username = "+req.body.Username
    );
  });
});






////////CUSTOMER ROUTES END
///////////////////////////////////////////////





///////////////////////////////////////////////
////////RESERVATION ROUTES BEGIN
app.post("/api/createReservationinDB", (req, res, next) => {
  const reservation = new Reservations({
    DateAndTime: req.body.DateAndTime,
    Phone: req.body.Phone,
    Seats: req.body.Seats,
  });

  reservation.save().then((result) => {
    res.status(201).json({
      message:
        "Reservations has been created succefully! resposne from app.js file.",
      result: result,
    });
  });

  console.log(
    "   ==> {/api/createReservationinDB} DateAndTime == ",
    reservation.DateAndTime
  );
});


app.post("/api/RemoveOrder", (req, res, next) => {
  Orders.deleteOne({
    Order: req.body.Order
  })
    .then((document) => {
      res.status(200).json({
        message: "Order Deleted.",
        result: document,
      });

      console.log("Order Deleted for Order ", req.body.Order);
    })

});



app.post("/api/RemoveReservation", (req, res, next) => {
  Reservations.deleteOne({
    DateAndTime: req.body.DateAndTime,
    Phone: req.body.Phone,
    Seats: req.body.Seats,
  })
    .then((document) => {
      res.status(200).json({
        message: "Reservation Deleted.",
        result: document,
      });

      console.log("Reservation Deleted for Date and Time =  ", req.body.DateAndTime);
    })

});

app.get("/api/getAllReservations", (req, res, next) => {
  Reservations.find().then((result) => {
    res.status(200).json({
      message: "All reservations are downloaded from DB.",
      reservations: result,
    });

    console.log(
      "   ==> {/api/getAllReservations} All reservations downloaded."
    );
  });
});

////////RESERVATION ROUTES END
///////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Backend is running at port  =  " + port + "!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost: ${port}`);
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// const express = require('express');
// const UsersRoutes = require('./routes/users-routes');
// const LabTasksRoutes = require('./routes/labTasks-routes');
// const StudentActivityHistoryRoutes = require('./routes/student-activity-history-routes');
// const StudentAttemptedLabTasksRoutes = require('./routes/student-attempted-lab-tasks-routes');
// const StudentAttemptedLabChallengesRoutes = require('./routes/student-attempted-lab-challenges-routes');
// const StudentLabDataRoutes = require('./routes/student-lab-data-routes');
// const LabsRoutes = require('./routes/labs-routes');
// const LabChallengesRoutes = require('./routes/labChallenges-routes');

// mongodb+srv://abdurrehman:<password>@cluster0.jlslm.mongodb.net/<dbname>?retryWrites=true&w=majority
// const app = express();

// following line establishes the connection with GBCLDatabase.

// app.get("/", (req, res, next) => {
//   res.status(200).json("Server is running!");
// });

// let cors = require('cors')
// app.use(cors())

//-->  /api/Homepage + [/CreateUser && /FetchTHISUser]
// app.use("/api/LabChallenges", LabChallengesRoutes);
// app.use("/api/StudentAttemptedLabChallenges", StudentAttemptedLabChallengesRoutes);
// app.use("/api/StudentAttemptedLabTasks", StudentAttemptedLabTasksRoutes);
// app.use("/api/Labs", LabsRoutes);
// app.use("/api/Users", UsersRoutes);
// app.use("/api/LabTasks", LabTasksRoutes);
// app.use("/api/StudentActivityHistory", StudentActivityHistoryRoutes);
// app.use("/api/StudentLabData", StudentLabDataRoutes);

// module.exports = app;
