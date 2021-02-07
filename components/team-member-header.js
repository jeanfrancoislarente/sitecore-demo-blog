import PageTitle from '../components/page-title'

export default function TeamMemberHeader({ name, picture, role, focusAreas }) {
  return (
    <div class="mb-8">
      <PageTitle>{name}</PageTitle>
      <div className="sm:flex sm:flex-row sm:flex-nowrap sm:justify-start sm:items-start">
        <div className="mb-3 sm:mb-0 sm:order-none sm:self-auto sm:flex-none sm:mr-6">
          <img src={picture} width="140" alt={name} />
        </div>
        <div className="sm:order-none sm:self-auto sm:flex-auto">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">{role}</div>
          <h3 className="text-lg md:text-xl lg:text-2xl">Focus Areas:</h3>
          {focusAreas && focusAreas.length > 0 && (
            <ul>
              {focusAreas.map(focusArea => (
                <li key={focusArea}>{focusArea}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
