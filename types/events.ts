import Job from '#models/job'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'Job:Created': Job
  }
}
