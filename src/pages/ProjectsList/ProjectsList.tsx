import React from 'react'
import {
	useGetProjectsByUserIdQuery,
	useCreateProjectMutation,
} from '../../app/store/slice/projectApi'
import { getCookie } from '../../features/cookieUtils'
import { ProjectCard } from '../../widgets/authWidgets'
import classesProjectList from './ProjectsList.module.css'

interface Project {
	_id: string
	name: string
	createdAt: string
	data: Array<{
		fieldName: string
		fieldValue: string
	}>
}

const ProjectList: React.FC = () => {
	const userId = getCookie('userId')

	const {
		data: responseData,
		error,
		isLoading,
	} = useGetProjectsByUserIdQuery(userId)

	const projects = responseData?.projects || []

	const [createProject] = useCreateProjectMutation()

	const handleCreateProject = async () => {
		const newProject = {
			userId: userId,
			name: 'Название нового проекта',
			data: [
				{
					fieldName: 'Описание',
					fieldValue: 'Это описание нового проекта.',
				},
				{
					fieldName: 'Статус',
					fieldValue: 'В процессе',
				},
			],
		}

		try {
			await createProject(newProject).unwrap()
			console.log('Проект успешно создан')
			location.reload() 
		} catch (error) {
			console.error('Ошибка при создании проекта:', error)
		}
	}

	if (isLoading) return <div>Загрузка...</div>

	return (
		<div className={classesProjectList.ProjectList__container}>
			<button
				onClick={handleCreateProject}
				className={classesProjectList.ProjectList__createBtn}
			>
				Создать проект
			</button>
			{projects.length > 0 ? (
				<>
					<div className={classesProjectList.ProjectList_title}>
						<p>Имя проекта</p>
						<p>Дата создания</p>
					</div>
					{projects
						.slice()
						.reverse()
						.map((project: Project) => (
							<ProjectCard
								key={project._id} 
								id={project._id}
								date={new Date(project.createdAt).toLocaleDateString()}
								title={project.name}
							/>
						))}
				</>
			) : (
				<div className={classesProjectList.NoProjects}>
					<p>Нет доступных проектов.</p> 
					<p>Нажмите кнопку "Создать проект", чтобы добавить новый проект.</p>
				</div>
			)}
		</div>
	)
}

export { ProjectList }
