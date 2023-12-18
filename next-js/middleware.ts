export { default } from 'next-auth/middleware'


export const config = {
    matcher: [
        '/api/teams',
        '/api/teams/:username*',
        '/api/projects',
        '/api/projects/:username*',
    ]
}
