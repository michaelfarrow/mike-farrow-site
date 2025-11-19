import { createPage } from '@/lib/page';
import { getProjects } from '@/lib/sanity/queries/project';

const projects = createPage('home', getProjects, {
  metadata: () => ({
    title: `Home`,
  }),
  render: () => {
    return <div></div>;
  },
});

export const { generateMetadata } = projects;
export default projects.page;
