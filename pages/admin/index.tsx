import type { NextPage } from 'next';
import AdminLayout from 'components/Layouts/AdminLayout';
import withAuth from 'utils/withAuth';

const Admin: NextPage = () => {
  return <AdminLayout title="Admin">Esto es el admin pages</AdminLayout>;
};

export default withAuth(Admin);
