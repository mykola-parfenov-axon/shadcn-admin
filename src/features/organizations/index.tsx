import { useOrganizationsQueryClient } from '@/domain/organizations/client/use-organizations-query-client'
import { keyWithParam, qk } from '@/domain/queries'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { OrganizationsTable } from './components/organizations-table'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import UsersProvider from './context/users-context'

export default function Organizations() {
  const organizationsQueryClient = useOrganizationsQueryClient()

  const $organizations = organizationsQueryClient.getOrganizations.useQuery(
    ...keyWithParam(qk.organizations.organizationsList, {
      query: {
        sort: 'CREATED_AT',
        direction: 'ASC',
        limit: 25,
        skip: 0,
      },
    })
  )

  return (
    <UsersProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Organizations List
            </h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <OrganizationsTable
            data={$organizations.data?.body ?? []}
            columns={columns}
          />
        </div>
      </Main>
      <UsersDialogs />
    </UsersProvider>
  )
}
