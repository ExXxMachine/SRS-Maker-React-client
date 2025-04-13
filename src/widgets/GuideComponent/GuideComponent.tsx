import React from 'react'
import './GuideComponent.css'
import guide1 from '../../app/assets/guide1.png'
import guide2 from '../../app/assets/guide2.png'
import guide3 from '../../app/assets/guide3.jpg'
import guide4 from '../../app/assets/guide4.png'
import guide5 from '../../app/assets/guide5.png'
import guide6 from '../../app/assets/guide6.png'

const GuideComponent = () => {
	const steps = [
		{
			image: guide1,
			title: 'Создай проект',
			text: 'Нажми "Создать проект" и у тебя есть новый проект!',
		},
		{
			image: guide2,
			title: 'Измени название проекта',
			text: 'Просто нажми на него и введи новое.',
		},
		{
			image: guide3,
			title: 'Создай структуру проекта',
			text: 'Нажми «Добавить главу» и «Добавить пункт». Это поможет тебе организовать документ.',
		},
		{
			image: guide4,
			title: 'Нажми "Генерировать через AI"',
			text: 'Подожди немного, пока AI сгенерирует текст для всех пустых полей. Это может занять некоторое время.',
		},
		{
			image: guide5,
			title: 'Просмотри и отредактируй текст',
			text: 'Если нужно, исправь или дополни сгенерированный текст. Ты можешь редактировать его прямо в редакторе.',
		},
		{
			image: guide6,
			title: 'Экспортируй в PDF/DOCX',
			text: 'Готово! Теперь ты можешь экспортировать проект в PDF или DOCX и использовать его как документ.',
		},
	]

	return (
		<>
		<h1>Шаг за шагом: Создание проекта с помощью AI</h1>
			<div className='guide-container'>
				<div className='grid-container'>
					{steps.map((step, index) => (
						<React.Fragment key={index}>
							<div
								className={`image-cell ${index % 2 === 0 ? 'left' : 'right'}`}
							>
								<img src={step.image} alt={`Шаг ${index + 1}`} />
							</div>
							<div
								className={`text-cell ${index % 2 === 0 ? 'right' : 'left'}`}
							>
								<div className='step-number'>{index + 1}</div>
								<h2>{step.title}</h2>
								<p>{step.text}</p>
							</div>
						</React.Fragment>
					))}
				</div>
			</div>
		</>
	)
}

export { GuideComponent }
