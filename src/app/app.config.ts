export const appConfig = {
    apiUrl: 'https://api.proschool.in/api',
    // apiUrl: 'http://localhost:4005/api',

    // authenticationUrl: 'https://api.proschool.in',
    // authenticationUrl: 'http://localhost:4005/api',

    role: JSON.parse(localStorage.getItem('currentUser')).role,

    token: JSON.parse(localStorage.getItem('currentUser')).token,

    school_id: JSON.parse(localStorage.getItem('currentUser')).school_id,

    employee_id: JSON.parse(localStorage.getItem('currentUser')).employee_id,

    log_id: JSON.parse(localStorage.getItem('currentUser')).log_id,

    activities: [
        {
            module: 'dashboard',
            clicks: 0
        },
        {
            module: 'dashboard',
            clicks: 0
        }
    ]

};