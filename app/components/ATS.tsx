import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Цвет фона по оценке
  const gradientClass = score > 69
    ? 'from-green-100'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-100';

  // Иконка по оценке
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Подзаголовок по оценке
  const subtitle = score > 69
    ? 'Отличный результат'
    : score > 49
      ? 'Хорошее начало'
      : 'Требует улучшений';

  return (
    <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-6`}>
      {/* Верхняя часть с иконкой */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="Иконка ATS" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">Оценка ATS — {score}/100</h2>
        </div>
      </div>

      {/* Описание */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{subtitle}</h3>
        <p className="text-gray-600 mb-4">
          Эта оценка показывает, насколько хорошо ваше резюме сможет пройти автоматические системы отбора кандидатов (ATS), используемые работодателями.
        </p>

        {/* Список рекомендаций */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type === "good" ? "Плюс" : "Внимание"}
                className="w-5 h-5 mt-1"
              />
              <p className={suggestion.type === "good" ? "text-green-700" : "text-amber-700"}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Финальный текст */}
      <p className="text-gray-700 italic">
        Продолжайте улучшать резюме, чтобы повысить шансы пройти ATS-фильтры и попасть к рекрутерам.
      </p>
    </div>
  )
}

export default ATS
