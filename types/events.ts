import Job from '#models/job'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'job:created': Job
  }
}
