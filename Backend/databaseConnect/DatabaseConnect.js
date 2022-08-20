const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://yugkhokhar:S2k3c0s2@cluster0.wkg5bdx.mongodb.net/?retryWrites=true&w=majority',
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
