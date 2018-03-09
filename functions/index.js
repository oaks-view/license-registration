// The Firebase Admin SDK to access the Firebase Realtime Database.


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// function to send email whenever new license registration is saved
exports.sendContactMessage = functions.database.ref('/licenseApplications{pushKey}').onWrite(event => {
    const snapshot = event.data;
    // Only send email for new messages.
    if (snapshot.previous.val() || !snapshot.val().name) {
        return;
    }

    const val = snapshot.val();

    const mailOptions = {
        to: 'captainoak@example.com',
        subject: `New licence rgistration`
    };

    return mailTransport.sendMail(mailOptions).then(() => {
        return console.log('Mail sent successfully');
    })
  });


// EXAMPLE STARTER
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({ original: original }).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref);
    });
});