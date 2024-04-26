export const colorSet = {
    timeTracker: {
        black: '#131b26',
        cyan: '#00d2e3',
        violet: '#6118fc',
        softViolet: '#8076b0',
        softGray: '#434462',
        softPurple: '#3c1a9f',
        dark: '#1b232e',
        white: '#f1f0fb'
    },
    auth: {
        background: '#201a30',
        primary: '#0df5e3',
        dark: '#1e2438',
        white: '#ffffff',
        gray: '#817e8b'
    }
}

export const fontSet = {
    timeTracker: {
        regular: { fontSize: 16, fontWeight: 500 },
        small: { fontSize: 12, fontWeight: 500 },
        h1Bold: { fontSize: 26, fontWeight: 700 },
        h1Light: { fontSize: 26, fontWeight: 500 },
        h2Bold: { fontSize: 24, fontWeight: 700 },
        h2Light: { fontSize: 24, fontWeight: 500 },
        h3Bold: { fontSize: 22, fontWeight: 700 },
        h3Light: { fontSize: 22, fontWeight: 500 },
        h4Bold: { fontSize: 20, fontWeight: 700 },
        h4Light: { fontSize: 20, fontWeight: 500 },
        h5Bold: { fontSize: 18, fontWeight: 700 },
        h5Light: { fontSize: 18, fontWeight: 500 },
    }
}

export const margin = {
    sm: {
        margin: 5 // Margin of 5 units
    },
    md: {
        margin: 10 // Margin of 10 units
    },
    lg: {
        margin: 20 // Margin of 20 units
    }
}

export const padding = {
    sm: {
        padding: 5 // padding of 5 units
    },
    md: {
        padding: 10 // padding of 10 units
    },
    lg: {
        padding: 20 // padding of 20 units
    }
}

export const justifyCenter = { flexDirection: 'row', justifyContent: 'center' }
export const justifyBetween = { flexDirection: 'row', justifyContent: 'space-between' }
export const justifyAround = { flexDirection: 'row', justifyContent: 'space-around' }
export const itemsCenter = { flexDirection: 'row', alignItems: 'center' }
export const centercenter = { justifyContent: 'center', alignItems: 'center' }
export const avatar = {
    lg: { width: 60, height: 60, borderRadius: 9999 },
    md: { width: 50, height: 50, borderRadius: 9999 },
    sm: { width: 40, height: 40, borderRadius: 9999 }
}

export const rounded = {
    sm: { borderRadius: 5 },
    md: { borderRadius: 8 },
    lg: { borderRadius: 12 },
}

export const background = { flex: 1, backgroundColor: colorSet.timeTracker.black, paddingTop: 40, ...padding.lg }
export const backgroundBlackWidget = { ...padding.md, marginVertical: 10, ...rounded.sm, backgroundColor: colorSet.timeTracker.dark, flexDirection: 'row' }

