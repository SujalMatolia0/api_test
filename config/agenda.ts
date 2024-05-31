import { Agenda } from '@hokify/agenda'

const mongoConnectionString =
  'mongodb+srv://matoliasujal:X02IrdpK6i6wdCws@cluster0.ptzajol.mongodb.net/'

export const agenda = new Agenda({
  db: { address: mongoConnectionString },
})
