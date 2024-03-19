// https://tailwindcomponents.com/component/hoverable-table

import { Title } from '@/components';
import { getPaginatedUsers } from '@/actions';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function AdminUsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title='Mantenimientos de usuarios' />

      <div className='mb-10'>
        <UsersTable users={users} />
      </div>
    </>
  );
}
