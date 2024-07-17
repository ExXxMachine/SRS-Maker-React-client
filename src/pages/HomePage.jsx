import React from 'react'
import classesHome from '../app/styles/css/HomePage.module.css'

const HomePage = () => {
	return (
		<div className={classesHome.home__container}>
			<h2 className={classesHome.home__title}>Что такое SRS?</h2>
			<p className={classesHome.home__paragraph}>
				SRS (software requirements specification, спецификация требований к
				программному обеспечению) — документ с требованиями к приложению,
				по-нашему — техническое задание. В эсэрэску входят требования и
				ограничения по функциональности и производительности SRS составляют для
				прозрачного взаимодействия заказчика и подрядчика.
			</p>
			<p className={classesHome.home__paragraph}>
				SRS обычно пишут простым «клиентским» языком, потому что и составляется
				он на основе мнения клиента. Чтобы начать сотрудничество, подрядчику
				необходимо узнать, чего хочет заказчик, понять желания и бизнес-цели. На
				основе информации с нескольких созвонов на стороне подрядчика составляют
				SRS документ.
			</p>
			<h2 className={classesHome.home__title}>Структура</h2>
			<p className={classesHome.home__paragraph}>
				<span>
					Выглядит пугающе. С одной стороны, удобно, когда любой проект можно
					поместить в понятный шаблон, с другой — есть риск попасть в жесткие
					рамки, внутри которых пропадет индивидуальность продукта.
				</span>
			</p>
			<p className={classesHome.home__paragraph}>
				<span>
					Структура SRS документа включает в себя детальное описание каждой
					части будущего приложения. Проблема в том, что 90% информации в таком
					документе — вода; настоящую пользу несут разве что картинки — примеры
					дизайна и описания работы сложных алгоритмов. Допустим, если бы у
					Tinder был SRS, то там бы был алгоритм мэтчинга. И еще 37 страниц
					ненужной инфы.
				</span>
			</p>
			<p className={classesHome.home__paragraph}>
				<span>
					Структура спецификации требований к программному обеспечению выглядит
					так:
				</span>
			</p>
			<ul className={classesHome.home__list}>
				<li>Введение</li>
				<ul className={classesHome.home__list}>
					<li>Цели</li>
					<li>Соглашения о терминах</li>
					<li>Предполагаемая аудитория и последовательность восприятия</li>
					<li>Масштаб проекта</li>
					<li>Ссылки на источники</li>
				</ul>
				<li>Общее описание</li>
				<ul className={classesHome.home__list}>
					<li className={classesHome.home__list__noneStyle}>
						Видение продукта
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Функциональность продукта
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Классы и характеристики пользователей
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Среда функционирования продукта (операционная среда)
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Рамки, ограничения, правила и стандарты
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Документация для пользователей
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Допущения и зависимости
					</li>
				</ul>
			</ul>
			<ul className={classesHome.home__list}>
				<li>Функциональность системы</li>
				<ul className={classesHome.home__list}>
					<li className={classesHome.home__list__noneStyle}>
						Функциональный блок X (таких блоков может быть несколько)
					</li>
					<li>Описание и приоритет</li>
					<li>
						Причинно-следственные связи, алгоритмы (движение процессов,
						workflows)
					</li>
					<li>Функциональные требования</li>
				</ul>
			</ul>
			<ul className={classesHome.home__list}>
				<li>Требования к внешним интерфейсам</li>
				<ul className={classesHome.home__list}>
					<li className={classesHome.home__list__noneStyle}>
						Интерфейсы пользователя (UX)
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Программные интерфейсы
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Интерфейсы оборудования
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Интерфейсы связи и коммуникации
					</li>
				</ul>
			</ul>
			<ul className={classesHome.home__list}>
				<li>Нефункциональные требования</li>
				<ul className={classesHome.home__list}>
					<li className={classesHome.home__list__noneStyle}>
						Требования к производительности
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Требования к сохранности (данных)
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Критерии качества программного обеспечения
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Требования к безопасности системы
					</li>
				</ul>
			</ul>
			<ul className={classesHome.home__list}>
				<li>Прочие требования</li>
				<ul className={classesHome.home__list}>
					<li className={classesHome.home__list__noneStyle}>
						Приложение А: Глоссарий
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Приложение Б: Модели процессов предметной области и другие диаграммы
					</li>
					<li className={classesHome.home__list__noneStyle}>
						Приложение В: Список ключевых задач
					</li>
				</ul>
			</ul>
			<h2 className={classesHome.home__title}>Релевантность</h2>
			<p className={classesHome.home__paragraph}>
				<span>
					Как бы ни хотелось рассказать в SRS документе о преимуществах компании
					или идеях, которые пришли в голову уже в процессе разработки, делать
					это запрещено. У документа — четкая цель, а значит, такое же четкое
					содержание. SRS всегда отражает функциональность и технические
					характеристики продукта.
				</span>
			</p>
			<h2 className={classesHome.home__title}>Прозрачность</h2>
			<p className={classesHome.home__paragraph}>
				<span>
					Здесь речь о терминах и языке. Используйте язык клиента, но не
					переборщите с упрощением, эвфемизмами и литературными приемами. Не
					стоит писать о волшебном труде мастеров кода и гениальных выдумках
					повелителей картинок. Лучше быть излишне конкретным, чем
					двусмысленным. Спецификация требований к программному обеспечению — не
					шедевр мировой классики, поэтому даже самые элементарные
					стилистические правила можно игнорировать во имя ясности.
				</span>
			</p>
			<h2 className={classesHome.home__title}>Точность</h2>
			<p className={classesHome.home__paragraph}>
				<span>
					Сокращения, аббревиатуры, названия — в документе они должны не должны
					отличаться. На первый взгляд — мелочь, но поскольку документ носит
					официальный характер, ошибаться в подобных моментах не стоит.
				</span>
			</p>
			<h2 className={classesHome.home__title}>Рейтинг по важности</h2>
			<p className={classesHome.home__paragraph}>
				<span>
					Никаких «два пишу, четыре в уме»! Если на исполнение того или иного
					требования уйдет много времени, стоит поставить для него высокий
					приоритет. В целом ранжирование требований по важности и стабильности
					— хорошая идея. Под стабильностью мы понимаем, насколько точно
					поставили задачу, и придется ли что-то менять в процессе исполнения.
				</span>
			</p>
		</div>
	)
}

export { HomePage }
