import React, { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
	useGetProjectByIdQuery,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
} from '../../app/store/slice/projectApi'
import { useDispatch, useSelector } from 'react-redux'
import {
	setProjectName,
	setProjectData,
	updateProjectField,
} from '../../app/store/slice/projectSlice'
import classesProject from './Project.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import { confirmAlert } from 'react-confirm-alert' 
import 'react-confirm-alert/src/react-confirm-alert.css' 
import './customConfirmAlert.css'

const Project: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useDispatch()
	const navigate = useNavigate() 
	const { data, error, isLoading } = useGetProjectByIdQuery(id)
	const [updateProject] = useUpdateProjectMutation()
	const [deleteProject] = useDeleteProjectMutation()

	const projectName = useSelector(state => state.project.name)
	const projectData = useSelector(state => state.project.data)

	const textAreasRef = useRef<(HTMLTextAreaElement | null)[]>([])

	useEffect(() => {
		if (data && data.project) {
			dispatch(setProjectName(data.project.name))
			dispatch(setProjectData(data.project.data))
		}
	}, [data])

	const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea.scrollHeight}px`
	}

	useEffect(() => {
		if (textAreasRef.current) {
			textAreasRef.current.forEach(textarea => {
				if (textarea) {
					autoResizeTextarea(textarea)
				}
			})
		}
	}, [projectData]) 

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setProjectName(e.target.value))
	}

	const handleFieldChange = (index: number, value: string) => {
		dispatch(updateProjectField({ index, value }))
		if (textAreasRef.current[index]) {
			autoResizeTextarea(textAreasRef.current[index]) 
		}
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
				console.log('Проект успешно обновлен')
				toast.success('Проект успешно сохранен!', { position: 'bottom-right' }) 
			} catch (error) {
				console.error('Ошибка при обновлении проекта:', error)
				toast.error('Ошибка при сохранении проекта!', {
					position: 'bottom-right',
				}) 
			}
		}
	}

	const handleDeleteProject = () => {
		confirmAlert({
			title: 'Подтверждение даления',
			message: 'Вы уверены, что хотите удалить этот проект?',
			buttons: [
				{
					label: 'Да',
					onClick: async () => {
						try {
							await deleteProject(id).unwrap() 
							console.log('Проект успешно удален')
							toast.success('Проект успешно удален!', {
								position: 'bottom-right',
							})
							navigate('/projects') 
						} catch (error) {
							console.error('Ошибка при удалении проекта:', error)
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

	if (isLoading) return <div>Загрузка...</div>

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
		<div className={classesProject.Project_container}>
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
			<button onClick={handleSaveChanges}>Сохранить изменения</button>
			<button onClick={handleDeleteProject}>Удалить проект</button>
			<h2>Данные проекта:</h2>
			<ul>
				{projectData.map((field, index) => (
					<li key={field._id} className={classesProject.Project_fieldBlock}>
						<strong>{field.fieldName}:</strong>
						<textarea
							ref={el => (textAreasRef.current[index] = el)} 
							rows={1}
							value={field.fieldValue}
							onChange={e => handleFieldChange(index, e.target.value)}
							className={classesProject.Project_fieldInput}
						/>
					</li>
				))}
			</ul>
			<ToastContainer /> 
		</div>
	)
}

export { Project }
