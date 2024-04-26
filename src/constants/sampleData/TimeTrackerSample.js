export const activitiesHomeScreen = [
    {
        id: 1,
        name: 'Copywriting',
        start: 1713581151,
        end: 1713601331,
        type: 'Personal',
        isOnProgress: true
    },
    {
        id: 2,
        name: 'Gym',
        start: 1713503771,
        end: 1713505751,
        type: 'Workout',
        isOnProgress: false
    },
    {
        id: 3,
        name: 'Design',
        start: 1713518591,
        end: 1713528671,
        type: 'Job',
        isOnProgress: false
    },
]

export const activitiesTaskScreen = [
    {
        id: 1,
        name: 'UI Design',
        duration: '00:32:10',
        tags: ['Work', 'Project'],
    },
    {
        id: 2,
        name: '100x Pushups',
        duration: '02:22:10',
        tags: ['Personal', 'Workout'],
    },
]


export const timeTracker = {
    activities: {
        name: 'Time tracking project',
        timestamps: [
            {
                isPaused: true,
                timestamp: 12233333,
                totalResumeMiliSeconds: 16600
            },
            {
                isPaused: false,
                timestamp: 12333333,
                totalResumeMiliSeconds: 12000
            },
        ]
    }

} 