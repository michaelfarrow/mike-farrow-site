import type { getProject } from '@/lib//sanity/queries/project';
import { MaybeLink } from '@/components/content/maybe-link';

type Project = NonNullable<Awaited<ReturnType<typeof getProject>>>;

export function ProjectAttributions({ project }: { project: Project }) {
  return project.attributions?.map((attribution) => (
    <div key={attribution._key}>
      <h3>{attribution.name}</h3>
      <ul>
        {attribution.contacts?.map((contact) => (
          <li key={contact._key}>
            <MaybeLink {...contact.link} target='_blank'>
              {contact.name}
            </MaybeLink>
          </li>
        ))}
      </ul>
    </div>
  ));
}
