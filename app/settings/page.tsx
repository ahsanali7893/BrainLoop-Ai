import { redirect } from 'next/navigation';
export default function RemovedSettingsPage() {
  redirect('/profile');
  return null;
}
