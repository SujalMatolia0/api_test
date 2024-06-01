import { agenda } from '#config/agenda'
import emitter from '@adonisjs/core/services/emitter'
import axios from 'axios'
import { IJobParameters } from '@hokify/agenda'
import logger from '@adonisjs/core/services/logger'

interface ScheduleJob extends IJobParameters {
  job: {
    url: string
  }
}

agenda.define<ScheduleJob>('schedule:job', async (job) => {
  const { url } = job.attrs.data.job

  try {
    const res = await axios.get(url)
    logger.info({ res: res.status }, 'Job executed successfully')
  } catch (error) {
    logger.error({ err: error }, 'Job execution failed')
  }
})

emitter.on('job:created', async (job) => {
  agenda.every(job.schedule, 'schedule:job', {
    job: {
      url: job.url,
    },
  })
})
