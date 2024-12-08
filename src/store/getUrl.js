export default async function getUrl(user) {
  const uid = (await user) ? user.uid : '';
  const userRole = (await user) ? user.role : '';
  const BACKEND_URL = await `${import.meta.env.VITE_BACKEND_DEV}/${userRole}`;
  return { BACKEND_URL, uid };
}
