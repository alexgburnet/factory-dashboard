export const barChartData = {
    labels: ["1", "2", "3", "17", "19", "26", "27", "28"],
    datasets: [
        {
            data: [73, 80, 64, 30, 45, 30, 60, 12],
            backgroundColor: ["green", "green", "orange", "red", "red", "red", "orange", "red"],
            borderWidth: 1,
        },
    ],
    options: {
        Legend: {
            display: false
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 100,
            }
        }
    },
};

export const pieChartData = {
    labels: ["Warp Off", "Maintenance", "Piece Change", "End Out Bar 2", "Knitting Elements"],
    datasets: [
        {
            label: "Time Spent",
            data: [120, 60, 30, 90, 45],
            backgroundColor: [
                "red",
                "blue",
                "green",
                "yellow",
                "orange",
            ],
            hoverOffset: 4,
        }
    ]
};