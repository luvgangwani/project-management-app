export { default } from 'next-auth/middleware'


export const config = {
    matcher: [
        // api
        '/api/teams',
        '/api/teams/:username*',
        '/api/projects',
        '/api/projects/:username*',
        '/api/tasks',
        '/api/tasks/:username*',
        '/api/teammembers',
        '/api/teammembers/team/:teamId*',
        '/api/projectaccess',
        // pages
        '/',
    ]
}
