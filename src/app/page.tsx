import { createPage } from '@/lib/page';
import { getProjects } from '@/lib/sanity/queries/project';
import { Container } from '@/components/page/container';

const projects = createPage('home', getProjects, {
  // metadata: () => ({
  //   title: `Home`,
  // }),
  render: () => {
    return <Container>Home</Container>;
  },
});

export const { generateMetadata } = projects;
export default projects.page;
