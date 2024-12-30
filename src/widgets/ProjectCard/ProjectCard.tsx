import React from 'react'
import { Link } from 'react-router-dom'
import classesProjectCard from './ProjectCard.module.css'
interface ProjectCardProps {
	id: string
	title: string
	date: string
}
const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, date }) => {
	return (
		<Link
			to={`/project/${id}`}
			className={classesProjectCard.ProjectCard_container}
		>
			<p>{title} </p> <p>{date}</p>
		</Link>
	)
}

export { ProjectCard }
