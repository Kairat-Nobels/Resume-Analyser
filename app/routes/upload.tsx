import { type FormEvent, useState } from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);

        setStatusText('Загрузка файла...');
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatusText('Ошибка: не удалось загрузить файл');

        setStatusText('Преобразование в изображение..');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText('Ошибка: не удалось преобразовать PDF');

        setStatusText('Загрузка изображения...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Ошибка: не удалось загрузить изображение');

        setStatusText('Подготовка данных...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Анализ резюме...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Ошибка: не удалось выполнить анализ');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Анализ завершён, выполняется переход...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Умный анализ резюме для работы мечты</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Загрузите резюме, чтобы получить ATS-оценку и рекомендации по улучшению</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Название компании</label>
                                <input type="text" name="company-name" placeholder="Название компании" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Должность</label>
                                <input type="text" name="job-title" placeholder="Должность" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Описание вакансии</label>
                                <textarea rows={5} name="job-description" placeholder="Описание вакансии" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Загрузить Резюме</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Анализировать Резюме
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
