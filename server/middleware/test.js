const app = require('../server');

module.exports = {
  first: () => {
    // const docs = await app.models.Doctors.find();
    // console.log('docs from await', docs);
    // console.log(app.models);

    app.models.Chat.find()
      .then(res => { console.log(res); });


    // app.models.User.create({ email: 'user@example.com', password: 'user' }, function (err, userInstance) {
    //   console.log(userInstance);
    // });
    app.models.User.find()
      .then(res => { console.log(res); });
    // app.models.Contacts.count((error, count) => {
    //   console.log(count);
    // });
    // app.dataSources.mongoDs.automigrate('Doctors', (err) => {
    //   if (err) throw err;

    //   app.models.Doctors.find((err, res) => console.log(res));
    // });
    // app.models.Doctors.find((err, res) => console.log(res));
    // console.log(app.models);

    // console.log(app.dataSources.mongoDs.ready('Doctors'));
    // return Docs;
  },
};
