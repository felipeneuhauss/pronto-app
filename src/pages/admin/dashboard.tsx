import AppLayout from 'components/Layouts/AppLayout';
import LgpdSignature from 'components/LgpdSignature';
import WeakPassword from 'components/WeakPassword';

const Dashboard = () => (
  <AppLayout
    className="relative"
    header={(
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
      )}
  >
    <div className="p-4">
      <LgpdSignature />
      <WeakPassword />
    </div>
    <div className="p-4" />
  </AppLayout>
);

export default Dashboard;
