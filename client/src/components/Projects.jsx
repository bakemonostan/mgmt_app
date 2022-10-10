import Loading from './Loading';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Loading />;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <div className='row mt-5'>
      {data &&
        data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
};
export default Projects;
