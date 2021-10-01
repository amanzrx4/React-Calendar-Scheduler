const now = new Date();

export const defaultEvents = [
    {
        id: 1,
        start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
        end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
        title: "Lunch @ Butcher's",
        color: '#26c57d',
    },
    {
        id: 2,
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16),
        title: 'General orientation',
        color: '#fd966a',
    },
    {
        id: 3,
        start: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 1,
            18
        ),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22),
        title: 'Dexter BD',
        color: '#37bbe4',
    },
    {
        id: 4,
        start: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            10,
            30
        ),
        end: new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            11,
            30
        ),
        title: 'Stakeholder mtg.',
        color: '#d00f0f',
    },
];
