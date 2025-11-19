import { resolve } from '@mikefarrow/cms';
import Link from 'next/link';

import { hasSlug } from '@/lib/document';
import { createPage } from '@/lib/page';
import { getProjects } from '@/lib/sanity/queries/project';
import { Container } from '@/components/page/container';

const projects = createPage('projects', getProjects, {
  metadata: () => ({
    title: `Projects`,
  }),
  render: (projects) => {
    return (
      <Container>
        <ul>
          {projects.map((project) => {
            if (!hasSlug(project)) return null;
            return (
              <li key={project._id}>
                <Link href={resolve.project.detail(project)}>
                  {project.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    );
  },
});

export const { generateMetadata } = projects;
export default projects.page;
