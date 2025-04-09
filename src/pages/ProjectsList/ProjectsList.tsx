import React, { useEffect, useState } from 'react'
import {
	useGetProjectsByUserIdQuery,
	useCreateProjectMutation,
} from '../../app/store/slice/projectApi'
import { useCheckAuthQuery } from '../../app/store/slice/authApi'
import { ProjectCard } from '../../widgets/authWidgets'
import classesProjectList from './ProjectsList.module.css'
import { Spinner } from '../../shared/authShared'
import { Helmet } from 'react-helmet'

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
	const [userId, setUserId] = useState<string | null>(null)


	const {
		data: userData,
		isLoading: isAuthLoading,
		error: authError,
	} = useCheckAuthQuery()


	const { data: responseData, isLoading: isProjectsLoading } =
		useGetProjectsByUserIdQuery(userId, { skip: !userId }) 

	const projects = responseData?.projects || []
	const [createProject] = useCreateProjectMutation()

	useEffect(() => {
		if (userData?.success) {
			setUserId(userData.user.id) 
		} else if (authError) {
			console.error('Ошибка авторизации:', authError)
			window.location.href = '/authorization' 
		}
	}, [userData, authError])

	const handleCreateProject = async () => {
		if (!userId) return

		const newProject = {
			userId,
			name: 'Новый проект',
			data: [],
		}

		try {
			await createProject(newProject).unwrap()
			console.log('Проект успешно создан')
			location.reload() 
		} catch (error) {
			console.error('Ошибка при создании проекта:', error)
		}
	}

	if (isAuthLoading || isProjectsLoading) return <Spinner />

	return (
		<>
			<Helmet>
				<title>Мои проекты | SRS-Maker</title>
			</Helmet>
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
		</>
	)
}

export { ProjectList }
