import emitter from '@adonisjs/core/services/emitter'
import { Agenda } from 'agenda'
import axios from 'axios'

const mongoConnectionString =
  'mongodb+srv://matoliasujal:X02IrdpK6i6wdCws@cluster0.ptzajol.mongodb.net/'
const agenda = new Agenda()
agenda.database(mongoConnectionString)

emitter.on('Job:Created', async (job: { url: string }) => {
  console.log('hi 1')

  await agenda.start()

  console.log('hi 2')

  await agenda.on('1 minute', function () {
    console.log('hi 3')
    try {
      axios.get(job.url)
      console.log('success')
    } catch (error) {
      console.log('failed', error)
    }
  })
})
