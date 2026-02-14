export const resumes: Resume[] = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "4",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "5",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "6",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
];

export const AIResponseFormat = `
interface Feedback {
  overallScore: number; //max 100

  ATS: {
    score: number; //rate based on ATS suitability
    tips: {
      type: "good" | "improve";
      tip: string; // 3-4 tips, НА РУССКОМ
    }[];
  };

  toneAndStyle: {
    score: number; //max 100
    tips: {
      type: "good" | "improve";
      tip: string; // короткий заголовок, НА РУССКОМ
      explanation: string; // подробно, НА РУССКОМ
    }[];
  };

  content: {
    score: number; //max 100
    tips: {
      type: "good" | "improve";
      tip: string; // НА РУССКОМ
      explanation: string; // НА РУССКОМ
    }[];
  };

  structure: {
    score: number; //max 100
    tips: {
      type: "good" | "improve";
      tip: string; // НА РУССКОМ
      explanation: string; // НА РУССКОМ
    }[];
  };

  skills: {
    score: number; //max 100
    tips: {
      type: "good" | "improve";
      tip: string; // НА РУССКОМ
      explanation: string; // НА РУССКОМ
    }[];
  };
}`;

export const prepareInstructions = ({
    jobTitle,
    jobDescription,
}: {
    jobTitle: string;
    jobDescription: string;
}) => `
Ты эксперт по ATS (Applicant Tracking System) и анализу резюме.

Задача:
1) Проанализируй резюме.
2) Поставь оценки (можно низкие, если резюме слабое).
3) Дай конкретные рекомендации по улучшению.

Правила:
- Отвечай СТРОГО на русском языке.
- Ключи JSON и структура должны быть ТОЧНО как в формате ниже (не переименовывай поля).
- Внутри JSON все строки (tip, explanation, summary и т.д.) должны быть на русском.
- Будь подробным и честным, не бойся указывать ошибки и слабые места.
- Учитывай вакансию и описание вакансии, если они даны.

Название позиции: ${jobTitle}
Описание вакансии: ${jobDescription}

Формат ответа (ОБЯЗАТЕЛЕН):
${AIResponseFormat}

Верни результат как JSON-объект:
- без бэктиков
- без дополнительного текста
- без комментариев
`;