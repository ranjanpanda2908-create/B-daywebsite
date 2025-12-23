
export interface BentoItem {
    title: string;
    text: string;
    className: string;
}

export interface StepContent {
    step: number;
    icon?: string;
    headline: string;
    paragraph: string;
    buttonText: string;
    bentoGrid?: BentoItem[];
    memory?: {
        image: string;
        caption: string;
    };
    finalMessage?: string;
}

export const STEPS_DATA: StepContent[] = [
    {
        step: 1,
        icon: '❤️',
        headline: "Hey Beautiful,",
        paragraph: "I built a little world for you, just to bring a smile to your face on your special day.",
        buttonText: "Let's Begin",
    },
    {
        step: 2,
        icon: '🎉',
        headline: "Happy Birthday!",
        paragraph: "Another year of you making the world brighter. Your existence is a gift, and I'm so lucky to witness it.",
        buttonText: "There's more...",
    },
    {
        step: 3,
        headline: "A Few Things I Adore About You",
        paragraph: "",
        buttonText: "Remember this?",
        bentoGrid: [
            { title: "✨ Your Unmatched Kindness", text: "The genuine warmth you show to everyone is something truly rare and beautiful.", className: "col-span-2" },
            { title: "😊 That Smile", text: "It's a work of art.", className: "" },
            { title: "🚀 Your Radiant Spirit", text: "Your passion for life is infectious. Being around you makes everything feel more exciting and possible.", className: "col-span-2" },
        ],
    },
    {
        step: 4,
        headline: "That One Time...",
        paragraph: "Every moment with you feels like a scene from a movie I'd watch on repeat.",
        buttonText: "One last thing...",
        memory: {
            image: "https://i.ibb.co/6Z6XgCg/crush.webp",
            caption: "Our favorite memory."
        }
    },
    {
        step: 5,
        icon: '🎂',
        headline: "My Wish For You",
        paragraph: "May the next year bring you all the love, success, and pure happiness you so rightfully deserve. May your dreams soar higher than ever.",
        buttonText: "Celebrate!",
        finalMessage: "Happy Birthday, my Love! ❤️"
    }
];
