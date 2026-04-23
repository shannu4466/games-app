import calcgame from "../public/calcgame.jpg";

export const games = [
    {
        id: 1,
        imageUrl: calcgame,
        name: "Math Blaster",
        description: "Solve math problems and become expert in speed calculation.",
        instructions: {
            gameModes: {
                Easy: "Simple addition & subtraction, more time.",
                Medium: "Includes multiplication & division, moderate time.",
                Hard: "Mixed operations, tricky questions, less time.",
            },
            howToPlay: "Choose a mode, solve the math question before time runs out, and earn points.",
            scoringDetails: "Easy gives lower score, Hard gives highest score. Faster answers earn bonus points.",
            tips: "Start with Easy mode, focus on accuracy, then move to Hard.",
        },
        mediumInstructions: {
            intro: "Get ready to solve fun math problems and test your skills!",
            easy: "For easy mode, you have 10 questions. Each question carries 10 marks. For each wrong answer -5 is deducted. The time will be 3 minutes",
            medium: "For medium mode, you have 10 questions. Each question carries 10 marks. For each wrong answer -3 is deducted. The time will be 4 minutes",
            hard: "For hard mode, you have 10 questions. Each question carries 10 marks. For each wrong answer -2 is deducted. The time will be 5 minutes"
        }
    },
    {
        id: 2,
        imageUrl: "https://i.imgur.com/ndu6pfe.png",
        name: "Dummy Game",
        description: "Another fun game with math challenges.",
        instructions: {
            gameModes: {
                Easy: "Simple sums.",
                Medium: "Multiplication added.",
                Hard: "Mixed tricky questions.",
            },
            howToPlay: "Select mode and answer quickly. Fastest answers gives more points.",
            scoringDetails: "Hard mode gives more points.",
            tips: "Practice daily.",
        },
        mediumInstructions: {
            intro: "Dummy instructions Get ready to solve fun math problems and test your skills!",
            easy: "Dummy Easy mode",
            medium: "Dummy Medium Mode",
            hard: "Dummy Hard Mode"
        }
    },
];