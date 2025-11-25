import { createPage } from '@/lib/page';
import { getProjects } from '@/lib/sanity/queries/project';
import { Search } from '@/app/search-test';

const projects = createPage('home', getProjects, {
  // metadata: () => ({
  //   title: `Home`,
  // }),
  render: () => {
    return (
      <div>
        <Search />
      </div>
    );
  },
});

export const { generateMetadata } = projects;
export default projects.page;
