import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
	useGetProjectByIdQuery,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
	useGenerateProjectMutation,
} from '../../app/store/slice/projectApi'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
	setProjectName,
	setProjectData,
	updateProjectData,
} from '../../app/store/slice/projectSlice'
import classesProject from './Project.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './customConfirmAlert.css'
import { Spinner } from '../../shared/authShared'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'
import {
	handleExportToPDF,
	handleExportToDOCX,
} from '../../features/authFeatures'
import { MyEditor, Dropdown } from '../../widgets/authWidgets'

const Project: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { data, error, isLoading } = useGetProjectByIdQuery(id)
	const [updateProject] = useUpdateProjectMutation()
	const [deleteProject] = useDeleteProjectMutation()
	const [generateProject] = useGenerateProjectMutation()

	const projectName = useSelector((state: any) => state.project.name)
	const projectData = useSelector((state: any) => state.project.data)

	const [hoveredChapterIndex, setHoveredChapterIndex] = useState<number | null>(
		null
	)

	const [hoveredFieldIndex, setHoveredFieldIndex] = useState<number | null>(
		null
	)

	useEffect(() => {
		if (data && data.project) {
			dispatch(setProjectName(data.project.name))
			dispatch(setProjectData(data.project.data))
		}
	}, [data, dispatch])

	const handleChapterNameChange = (chapterIndex: number, value: string) => {
		const updatedData = projectData.map((chapter, index) =>
			index === chapterIndex ? { ...chapter, chapterName: value } : chapter
		)
		dispatch(updateProjectData(updatedData))
	}

	const handleFieldNameChange = (
		chapterIndex: number,
		fieldIndex: number,
		value: string
	) => {
		const updatedData = projectData.map((chapter, index) =>
			index === chapterIndex
				? {
						...chapter,
						fields: chapter.fields.map((field, i) =>
							i === fieldIndex ? { ...field, fieldName: value } : field
						),
				  }
				: chapter
		)
		dispatch(updateProjectData(updatedData))
	}

	const handleFieldChange = (
		chapterIndex: number,
		fieldIndex: number,
		value: string
	) => {
		console.log('Обновляем данные:', chapterIndex, fieldIndex, value)
		const updatedData = projectData.map((chapter, index) =>
			index === chapterIndex
				? {
						...chapter,
						fields: chapter.fields.map((field, i) =>
							i === fieldIndex ? { ...field, fieldValue: value } : field
						),
				  }
				: chapter
		)
		console.log('Обновленные данные:', updatedData)
		dispatch(updateProjectData(updatedData))
	}

	// Добавление нового поля
	const handleAddField = (chapterIndex: number, fieldIndex: number) => {
		const newField = {
			fieldId: Date.now(),
			fieldName: 'Новое поле',
			fieldValue: '',
		}

		const updatedData = projectData.map((chapter, index) => {
			if (index === chapterIndex) {
				const updatedFields = [...chapter.fields]
				updatedFields.splice(fieldIndex + 1, 0, newField)
				return { ...chapter, fields: updatedFields }
			}
			return chapter
		})

		dispatch(updateProjectData(updatedData))
	}

	// Удаление поля
	const handleRemoveField = (chapterIndex: number, fieldIndex: number) => {
		const updatedData = projectData.map((chapter, index) => {
			if (index === chapterIndex) {
				const updatedFields = [...chapter.fields]
				updatedFields.splice(fieldIndex, 1)
				return { ...chapter, fields: updatedFields }
			}
			return chapter
		})

		dispatch(updateProjectData(updatedData))
	}

	const handleAddChapter = (chapterIndex: number) => {
		const newChapter = {
			chapterId: Date.now(),
			chapterName: 'Новая глава',
			fields: [
				{
					fieldId: Date.now(),
					fieldName: 'Новое поле',
					fieldValue: '',
				},
			],
		}

		const updatedChapters = [...projectData]
		updatedChapters.splice(chapterIndex + 1, 0, newChapter)

		dispatch(updateProjectData(updatedChapters))
	}

	const handleRemoveChapter = (chapterIndex: number) => {
		const updatedChapters = [...projectData]
		updatedChapters.splice(chapterIndex, 1)

		dispatch(updateProjectData(updatedChapters))
	}

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setProjectName(e.target.value))
	}

	const handleSaveChanges = async () => {
		if (data && data.project) {
			const updatedProject = {
				...data.project,
				name: projectName,
				data: projectData,
			}

			try {
				await updateProject(updatedProject).unwrap()
				toast.success('Проект успешно сохранен!', { position: 'bottom-right' })
			} catch (error) {
				console.error('Ошибка при сохранении проекта:', error)
				toast.error('Ошибка при сохранении проекта!', {
					position: 'bottom-right',
				})
			}
		} else {
			console.log('Нет данных для сохранения')
			toast.error('Нет данных для сохранения', {
				position: 'bottom-right',
			})
		}
	}

	const handleDeleteProject = () => {
		confirmAlert({
			title: 'Подтверждение удаления',
			message: 'Вы уверены, что хотите удалить этот проект?',
			buttons: [
				{
					label: 'Да',
					onClick: async () => {
						try {
							await deleteProject(id).unwrap()
							toast.success('Проект успешно удален!', {
								position: 'bottom-right',
							})
							navigate('/projects')
							location.reload()
						} catch (error) {
							toast.error('Ошибка при удалении проекта!', {
								position: 'bottom-right',
							})
						}
					},
				},
				{
					label: 'Нет',
					onClick: () => {},
				},
			],
		})
	}

	const handleDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) {
			return
		}
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return
		}

		const updatedData = projectData.map(chapter => ({
			...chapter,
			fields: [...chapter.fields],
		}))

		const sourceChapterIndex = parseInt(source.droppableId.split('-')[1], 10)
		const destinationChapterIndex = parseInt(
			destination.droppableId.split('-')[1],
			10
		)

		const [movedField] = updatedData[sourceChapterIndex].fields.splice(
			source.index,
			1
		)

		updatedData[destinationChapterIndex].fields.splice(
			destination.index,
			0,
			movedField
		)

		dispatch(updateProjectData(updatedData))
	}

	const handleSavePDF = () => {
		handleExportToPDF(projectName, projectData)
	}

	const handleSaveDOCX = () => {
		handleExportToDOCX(projectName, projectData)
	}

	const handleGenerateContent = async () => {
		toast.info('Начинается генерация контента...', { position: 'bottom-right' })
		const updatedData = await Promise.all(
			projectData.map(async chapter => {
				const updatedFields = await Promise.all(
					chapter.fields.map(async field => {
						if (!field.fieldValue) {
							const prompt = `На русском языке: Напиши ${chapter.chapterName} ${field.fieldName} для проекта ${projectName} используй строгий стиль как для документации и не рассуждай отвечай только то что нужно без лишних высказываний`
							try {
								const response = await generateProject(prompt).unwrap()
								const content = response.choices[0].message.content
								// Удаление мусора
								const cleanContent = content.replace(/[*#]/g, '').trim()
								// Добавление табуляции к переносам строк
								const formattedContent = cleanContent.replace(/\n/g, '\t\n')
								return { ...field, fieldValue: formattedContent }
							} catch (error) {
								console.error('Ошибка при генерации контента:', error)
								toast.error(
									`Ошибка при генерации контента для ${field.fieldName}`,
									{ position: 'bottom-right' }
								)
								return field
							}
						}
						return field
					})
				)
				return { ...chapter, fields: updatedFields }
			})
		)
		dispatch(updateProjectData(updatedData))
		toast.success('Контент успешно сгенерирован!', { position: 'bottom-right' })
	}


	if (isLoading) return <Spinner />

	if (error) {
		let errorMessage
		if ('status' in error) {
			errorMessage = `Ошибка ${error.status}: Не удалось загрузить проект.`
		} else {
			errorMessage = 'Произошла ошибка при загрузке проекта.'
		}
		return <div>Ошибка при загрузке проекта: {errorMessage}</div>
	}

	return (
		<>
			<Helmet>
				<title>{projectName} | SRS-Maker</title>
			</Helmet>
			<div className={classesProject.Project_container}>
				<Link to='/projects' className={classesProject.redirectLink}>
					↼ Мои проекты
				</Link>
				<h1>
					<input
						type='text'
						value={projectName}
						onChange={handleNameChange}
						className={classesProject.Project__heading}
					/>
				</h1>
				<p>
					Дата создания: {new Date(data.project.createdAt).toLocaleDateString()}
				</p>
				<button
					onClick={handleSaveChanges}
					className={classesProject.Project_SaveDeleteBtn}
				>
					Сохранить изменения
				</button>
				<button
					onClick={handleDeleteProject}
					className={classesProject.Project_SaveDeleteBtn}
				>
					Удалить проект
				</button>
				<button
					onClick={handleGenerateContent}
					className={classesProject.Project_SaveDeleteBtn}
				>
					Генерировать контент
				</button>
				<Dropdown
					handleExportPdf={handleSavePDF}
					handleExportWord={handleSaveDOCX}
				/>
				<h2>Данные проекта:</h2>
				{projectData.length === 0 ? (
					<div className={classesProject.emptyProject}>
						<button
							onClick={() => handleAddChapter(-1)}
							className={classesProject.addChapterButton}
						>
							➕ Добавить главу
						</button>
					</div>
				) : (
					<DragDropContext onDragEnd={handleDragEnd}>
						{projectData.map((chapter, chapterIndex) => (
							<div
								key={chapter.chapterId}
								className={classesProject.chapterContainer}
								onMouseEnter={() => setHoveredChapterIndex(chapterIndex)}
								onMouseLeave={() => setHoveredChapterIndex(null)}
							>
								<h3 className={classesProject.chapterTitle}>
									<input
										type='text'
										value={chapter.chapterName}
										onChange={e =>
											handleChapterNameChange(chapterIndex, e.target.value)
										}
										className={classesProject.chapterInput}
									/>
									{hoveredChapterIndex === chapterIndex && (
										<div className={classesProject.miniMenu}>
											<button
												onClick={() => handleAddChapter(chapterIndex)}
												className={classesProject.addChapterButton}
											>
												➕ Добавить главу
											</button>
											<button
												onClick={() => handleRemoveChapter(chapterIndex)}
												className={classesProject.removeChapterButton}
											>
												➖ Удалить главу
											</button>
										</div>
									)}
								</h3>

								<Droppable droppableId={`chapter-${chapterIndex}`}>
									{provided => (
										<ul
											ref={provided.innerRef}
											{...provided.droppableProps}
											className={classesProject.fieldsList}
										>
											{chapter.fields.length === 0 ? (
												<li className={classesProject.emptyChapter}>
													<button
														onClick={() => handleAddField(chapterIndex, -1)}
														className={classesProject.addFieldButton}
													>
														➕ Добавить пункт
													</button>
												</li>
											) : (
												chapter.fields.map((field, fieldIndex) => (
													<Draggable
														key={field.fieldId}
														draggableId={String(field.fieldId)}
														index={fieldIndex}
													>
														{provided => (
															<li
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																className={classesProject.Project_fieldBlock}
																onMouseEnter={() =>
																	setHoveredFieldIndex(fieldIndex)
																}
																onMouseLeave={() => setHoveredFieldIndex(null)}
															>
																<input
																	type='text'
																	value={field.fieldName}
																	onChange={e =>
																		handleFieldNameChange(
																			chapterIndex,
																			fieldIndex,
																			e.target.value
																		)
																	}
																	placeholder='Имя поля'
																	className={classesProject.Project__fieldName}
																/>
																<MyEditor
																	fieldIndex={fieldIndex}
																	chapterIndex={chapterIndex}
																	field={field}
																	handleFieldChange={(
																		chapterIndex: number,
																		fieldIndex: number,
																		newValue: string
																	) =>
																		handleFieldChange(
																			chapterIndex,
																			fieldIndex,
																			newValue
																		)
																	}
																/>

																{hoveredFieldIndex === fieldIndex && (
																	<div className={classesProject.miniMenu}>
																		<button
																			onClick={() =>
																				handleAddField(chapterIndex, fieldIndex)
																			}
																		>
																			➕ Добавить
																		</button>
																		<button
																			onClick={() =>
																				handleRemoveField(
																					chapterIndex,
																					fieldIndex
																				)
																			}
																		>
																			➖ Удалить
																		</button>
																	</div>
																)}
															</li>
														)}
													</Draggable>
												))
											)}
											{provided.placeholder}
										</ul>
									)}
								</Droppable>
							</div>
						))}
					</DragDropContext>
				)}
				<ToastContainer />
			</div>
		</>
	)
}

export { Project }
