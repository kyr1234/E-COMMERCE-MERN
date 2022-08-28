const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://yugkhokhar:S2k3c0s2@cluster0.uaegm.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('connected')
  })
  .catch((err) => {
    console.log(err)
  })
