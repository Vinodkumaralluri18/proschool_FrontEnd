export const appConfig = {
    apiUrl: 'http://13.126.140.230:4005/api',
    // apiUrl: 'http://localhost:4005/api',

    // authenticationUrl: 'http://13.126.140.230:4005',
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